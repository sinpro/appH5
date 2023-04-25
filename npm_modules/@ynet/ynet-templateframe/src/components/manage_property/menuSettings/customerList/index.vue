<template>
    <div class="customer-dialog">
        <ul>
            <li>
                <span>全选</span>
                <el-checkbox :indeterminate="isCheckedAll" v-model="checkedAll" @change="checkedAllCustomerChange"></el-checkbox>
            </li>
            <li v-for="(item,index) in getCustomerList" :key="index">
                <span>{{item.label}}</span>
                <el-checkbox v-model="item.checked" @change="customerChange(item,$event)" :key="index"></el-checkbox>
            </li>
        </ul>
        <div class="pagination" v-if="getCustomerList.length != 0">
            <el-pagination
                @size-change="getAdertLaunchStrategy"
                @current-change="getAdertLaunchStrategy"
                :current-page.sync="turnPageBeginPos"
                :page-sizes="[10, 20]"
                :page-size="turnPageShowNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(turnPageTotalNum)" :background="true">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getAdertLaunchStrategy,removeLaunchStrategy,getTagList, allCityList,getPositionList,getAuthreSource, getAdertList, getCityList,SeachLaunchList,addLaunchStrategy, getLaunchStrategy, getCustomerList} from '~/config/api'
import { typeofTypeAnnotation } from 'babel-types';
export default {
    data(){
        return {
            getCustomerList:[],
            tagList:[],
            turnPageBeginPos:1,
            turnPageShowNum:10,
            turnPageTotalNum:1,
            checkedAll:false,
            len:0,
            getCustomerListAll:[],
            isCheckedAll:false,
        }
    },
    props:{
        form:{
            type: Array,
            default: []
        },
        type:{
            type: String,
            default: '1'
        }
    },
    watch:{
        tagList(val){
            console.info(111)
            console.info(val)
            if(val.length == this.getCustomerListAll.length){
                this.checkedAll = true;
                this.isCheckedAll = false;
            }else{
                this.checkedAll = false;
                this.isCheckedAll = false;
                if(val.length>0){
                    this.isCheckedAll = true;
                }
            }
        }
    },
    created() {
        this.getAdertList();
    },
    methods: {
        returnCustomer(){
            let data = {
                tagList:this.tagList,
                tagType:this.tagList.length==this.getCustomerListAll.length?'0':'1'
            }
            return data
        },
        getAdertList() {
            getCustomerList().then(res =>{
                this.len = res.data.body.tagList.length;
                res.data.body.tagList.forEach(item => {
                    this.getCustomerListAll.push({
                        tagId: item.tagId,
                        tagName: item.tagName     
                    })
                    this.getCustomerList.push({
                        checked:false,
                        value: item.tagId,
                        label: item.tagName     
                    })
                })
                if(this.type == '1'){
                    this.getCustomerList.forEach(item => {
                        this.form.forEach(list=>{
                            if(item.value == list.tagId){
                                item.checked = true;
                                this.tagList.push({
                                    tagId:item.value,
                                    tagName:item.label
                                })                    
                            }
                        })
                    });
                }else{
                    this.getCustomerList.forEach(item => {
                        item.checked = true;
                        this.tagList.push({
                            tagId:item.value,
                            tagName:item.label
                        })                    
                    });
                }
                
                console.info(this.tagList)
            })
        },
        checkedAllCustomerChange(val){
            console.info(val);
            if(val){
                this.tagList = [];
                this.getCustomerList.forEach(item=>{
                    item.checked = true;
                })
                this.getCustomerListAll.forEach(item=>{
                    this.tagList.push(item);
                })
            }else{
                this.getCustomerList.forEach(item=>{
                    item.checked = false;
                })
                this.tagList = []
            }
            
        },
        customerChange(item,val){
            // console.info(val)
            // console.info(item)
            console.info(this.tagList)
            if(val){
                this.tagList.push({
                    tagId:item.value,
                    tagName:item.label
                })
            }else{
                this.tagList.splice({
                    tagId:item.value,
                    tagName:item.label
                },1)
            }
            console.info(this.tagList)
        },
        getAdertLaunchStrategy(type) {
            let strategyData = {
                turnPageBeginPos: this.turnPageBeginPos,
                turnPageShowNum: this.turnPageShowNum,
            }
            this.showLoaing = true
            getTagList(strategyData).then(res => {
                console.info(res)
                // this.showLoaing = false
                this.turnPageTotalNum = res.data.body.turnPageTotalNum;
                this.getCustomerList = [];
                res.data.body.tagList.forEach(item => {
                    this.getCustomerList.push({
                        checked:false,
                        value: item.tagId,
                        label: item.tagName     
                    })
                    this.getCustomerList.forEach(item => {
                        this.tagList.forEach(list=>{
                            if(item.value == list.tagId){
                                item.checked = true;   
                            }
                        })
                    });
                })
                // res.data.body.strategyList.forEach(item => {
                //     item.cityType = item.cityType == '1' ? '部分' : '全部'
                // })
                // if(this.tableData.length == 0) {
                //     this.tableData.push(...res.data.body.strategyList)
                // } else {
                //     this.tableData = []
                //     this.tableData.push(...res.data.body.strategyList)
                // }
            }).catch(res => {
                this.showLoaing = false
            })
        },
    }
}
</script>

<style lang="scss">
.customer-dialog{
    >ul{
        width: 736px;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
            height: 48px;
            font-family: MicrosoftYaHeiUI;
            font-size: 12px;
            color: #323C41;
            line-height: 16px;
            background: #FFFFFF;
            box-shadow: inset -1px 1px 0 0 #DDE0E4, inset 1px 0 0 0 #DDE0E4;
            &:last-child{
                border-bottom: 1px solid #DDE0E4;
            }
            // .el-checkbox__inner{
            //     width: 16px;
            //     height: 16px;
            // }
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                background-color: #3671FF;
                border-color:  #3671FF;
            }
        }
    }
    .pagination {
        padding: 20px 0 20px;
        text-align: right;
    }
}
</style>
