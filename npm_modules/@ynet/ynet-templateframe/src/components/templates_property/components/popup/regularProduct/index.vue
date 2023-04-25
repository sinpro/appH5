<template>
    <!-- 理财产品列表弹出框 -->
    <div class="product-dialog">
        <div slot="title">
            <div class="popup-head">
                <div class="jiantou" @click="backMenu"></div>
                <div class="back-icon" @click="backMenu"></div>
                <span class="back-text" @click="backMenu">返回</span>
                <span class="fenge">|</span>
                <span class="mtSetting"> 定期产品选择</span>
            </div>
        </div>

        <div class="product-choose-body">
            <div class="product-body-top">
                <p>已选择：{{selectedProduct.length}}/{{productTotalNum}}</p>
                <div class="input-box1">
                    <input type="text" placeholder="输入产品名称" v-model="productContent" />
                    <img src="../../../../../assets/icon_search.png" @click="queryProduct" class="search-img" alt="">
                </div>
            </div>
            <div class="table-content">
                <el-table
                    :data="productData"
                    border
                    @selection-change="selectChange"
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    label="选择"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="financialName"
                    label="产品名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="type"
                    label="类型"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="rate"
                    label="收益率"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="term"
                    label="产品期限"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="initialAmt"
                    label="起购金额" 
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="riskLevel"
                    label="风险等级" 
                    width="80">
                    </el-table-column>
                </el-table>
                
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination
                        @size-change="productSizeChange"
                        @current-change="productSizeChange"
                        :current-page.sync="productPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="productSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="parseInt(productTotalNum)" :background="true">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
            
            
</template>

<script>
import { queryProductList, eidtMenuStyleRpc, editFloorStyleAllocation } from '../../../../../utils/api'
export default {
    data() {
        return {
            selectedProduct: [],
            roductContent: '', //理财产品查询
            productPage: 1, //理财产品当前页数
            productSize: 10, //理财产品每页显示条数
            productTotalNum: 10,
            productContent: '',
            productData: []
        }
    },
    created() {
        this.queryList()
    },
    methods: {
        // back() {
        //     this.$emit('backHome')
        // },
        backMenu() {
            this.$emit('backMenu')
        },
        getProductList() {
            return this.selectedProduct
        },
        queryProduct(){
            let data = this.productList;
            let list = [];
            if(this.productContent==''){
                this.productData=data;
            }else{
                data.forEach(content => {
                    if(content.productName.indexOf(this.productContent)!=-1){
                        list.push(content)
                    }
                });
                this.productData=list;
            }
        },
        // 理财产品分页事件
        productSizeChange(){
            this.queryList();
        },
        selectChange(val){
            console.log(val)
            this.selectedProduct=val;
        },
        // 查询理财产品列表
        queryList(){
            let data = {
                productSort:1,
                turnPageBeginPos: this.productPage,
                turnPageShowNum: this.productSize
            }
            queryProductList(data).then(res=>{
                this.productData = res.data.body.financialModelList;
                this.productTotalNum =  res.data.body.turnPageTotalNum;
                // this.productList = this.productData;
                for ( let i in this.productData ){
                    var type = '';
                    var level = '';
                    switch(this.productData[i].type){
                        case '0':
                            type = '开放式';
                            break
                        case '1':
                            type = '半封闭式';
                            break
                        case '2':
                            type = '封闭式';
                            break
                        case '3':
                            type = '半开放式';
                            break
                        default:
                            type = '--';
                            break

                    }
                    switch(this.productData[i].riskLevel){
                        case '1':
                            level = '低风险';
                            break
                        case '2':
                            level = '中风险';
                            break
                        case '3':
                            level = '中高风险';
                            break
                        case '4':
                            level = '高风险';
                            break
                        default:
                            level = '--';
                            break

                    }
                    this.productData[i].type = type;
                    this.productData[i].riskLevel = level;
                    this.productList = this.productData;
                }
            })
        },
    }
}
</script>

<style lang="scss">
    .product-dialog{
        .product-choose-title{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            >p{
                font-family: MicrosoftYaHeiUI;
                font-weight: bold;
                font-size: 16px;
                color: #14001D;
                letter-spacing: 0;
                line-height: 24px;
            }
        }
        .el-dialog__headerbtn{
            display: none;
        }
        .popup-head {
                height: 24px;
                // padding: 0 20px;
                line-height: 24px;
                display: flex;
                align-items: center;
                padding-left: 15px;
                // box-shadow: inset 0 -1px 0 0 #DDE0E4;

                .jiantou {
                    width:0;
                    height:0;
                    border: 6px solid transparent;
                    border-right-color: #3671FF;
                    position:absolute;
                    left: 16;
                    content:'';
                    cursor: pointer;
                }
                
                .back-icon {
                    width: 12px;
                    height: 4px;
                    // transform: rotate(-90deg);
                    background: #3671FF;
                    margin-left: 8px;
                    cursor: pointer;
                }
                .back-text, .mtSetting {
                    font-family: MicrosoftYaHeiUI;
                    font-weight: bold;
                    font-size: 16px;
                    letter-spacing: 0;
                }
                .mtSetting {
                    color: #14001D;
                }
                .fenge {
                    font-family: MicrosoftYaHeiUI;
                    font-weight: bold;
                    font-size: 13px;
                    color: #000000;
                    letter-spacing: 0;
                    margin: 0 4px 0 4px;
                }
                .back-text {
                    color: #3671FF;
                    margin-left: 4px;
                    cursor: pointer;
                }
            }
        .product-choose-body{
            .product-body-top{
                margin-top: 32px;
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                >p{
                    font-family: MicrosoftYaHeiUI;
                    font-weight: bold;
                    font-size: 16px;
                    color: #323C41;
                    letter-spacing: 0;
                    line-height: 24px;
                }
                >.input-box1{
                    margin: 0;
                }


                .input-box1 {
                    width: 400px;
                    height: 40px;
                    background: #FFFFFF;
                    border: 1px solid #DDE0E4;
                    border-radius: 2px;
                    padding-left: 16px;
                    display: flex;
                    align-items: center;
                    // margin-bottom: 40px;

                    input {
                        width: 344px;
                        height: 38px;
                    }
                    .search-img {
                        width: 16px;
                        height: 16px;
                        margin: 0 auto;
                        // margin-left: 12px;
                    }
                    ::placeholder {
                        font-family: MicrosoftYaHeiUI;
                        font-size: 12px;
                        color: #A2A4A6;
                        line-height: 40px;
                    }
                }
            }
            .table-content{
                padding: 40px 19.5px 0;
            }
        }
    }
    .pagination {
            padding: 28px 0 20px;
            text-align: right;
        }

        .el-table .el-table__body-wrapper .el-table__body tbody tr td .cell {
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #666666;
                text-align: center;
        }
</style>


