<template>
    <div class="activity-container">
        <div class="box-left">
            <div class="activity-type">
                <div  
                     v-for="(item,index) in typeList" 
                     :key="index"
                     @click="checktype(item.type)"
                     :class="[checkedId == item.type?'type-item checkedGroup':'type-item']">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="box-right">
            <div class="head-search">
                <div class="search">
                    <el-input placeholder="输入活动名称" 
                        suffix-icon="el-icon-search" 
                        v-model="activeName" 
                        @input="searchActive">
                    </el-input>
                </div>
            </div>
            <div class="table-box" v-if="activeList.length>0">
                <el-table
                :data="activeList"
                border>
                <el-table-column
                label="活动名称"
                align="center"
                >
                <template slot-scope="scope">
                    <span @click="goDetail(scope.row)" style="color:#3671FF;cursor:pointer;">{{scope.row.marketName}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="状态"
                align="center"
                prop="status"
                width="80">
                <template slot-scope="scope">
                    <span>{{getInitChangeState(scope.row.status)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="创建时间"
                prop="creatTime"
                align="center"
                >
                <template slot-scope="scope">
                    <span>{{changeTime(scope.row.creatTime)}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="操作"
                align="center"
                width="70">
                <template slot-scope="scope">
                    <div class="check" @click="choseActivity(scope.row)">
                        <img v-if="checkAcitivityId != scope.row.marketId" src="../../../assets/icon_radio_noChoose.png" alt="">
                        <img v-if="checkAcitivityId == scope.row.marketId" src="../../../assets/icon_radio_choosed.png" alt="">
                    </div>
                </template>
                </el-table-column>
            </el-table>
            </div>
            <div class="blank-page" v-if="activeList.length==0 && !showloading"><span>暂无数据</span></div>
            <div style="position: relative;width:100%;" v-if="showloading">
                <img class="loading" src="../../../assets/loading.png" alt="">
                <p class="loading_text">加载中,请稍后...</p>
            </div>
            <div class="table-page" v-if="activeList.length>0">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @prev-click="handlePreNumber"
                @next-click="handleNexNumber"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, prev, pager, next, jumper, sizes"
                :total="totalPages" :background="true">
            </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { marketActivityList } from '~/config/api'
import { activityTypeUrl } from '../../../../../config/activityConfig.js'
export default {
    data() {
        return {
            showloading:false,
            activeType:'',
            searchFormData:{
                name:'',
                state:''
            },
            activeList:[],
            activeName:'',
            currentPage:1,
            totalPages:1,
            checkAcitivityId:'',
            codeContent:'https://flameapp.cn.1234',
            currentActiveCode:'',
            typeList:[{'name':'砸金蛋',type:'01'},
                      {'name':'大转盘',type:'02'},
                      {'name':'水果机',type:'03'},
                      {'name':'摇一摇',type:'04'},
                      {'name':'有奖问答',type:'05'},
                      {'name':'刮刮卡',type:'06'},
                      {'name':'翻翻乐',type:'07'},
                      {'name':'多次抽奖',type:'08'}
            ],
            marketName:'',
            checkedId:'01'
        }
    },
    created() {
        this.initActiveData(1,10)
        console.log(activityTypeUrl('01'))
    },
    methods:{
        //返回父组件
        backCheckData() {
            let url = activityTypeUrl(this.checkedId).url
            let marketName = this.marketName
            let data = {'name':marketName,'url':url+'?marketId='+this.checkAcitivityId}
            return data
        },
        initActiveData(num,count){
            this.showloading = true
            let data = {
                marketGroup:this.checkedId,
                marketName:this.activeName,
                turnPageBeginPos:num,
                turnPageShowNum:count
            }
            marketActivityList(data).then(res=>{
                this.showloading = false
                if(res.data.body.errorCode == '0'){
                    let data = res.data.body.yxMarketList
                    this.activeList = data
                    this.totalPages = res.data.body.turnPageTotalNum - 0
                    //console.log(res.data.body)
                }
            })
            //this.activeList = list
        },
        //二维码地址格式化
        initCodeData(){
            let type = this.checkedId
            let url = ''
            if(type == '01'){
                url = '/ynet_activity/activities/goldenEggs.html'
            }else if(type == '02'){
                url = '/ynet_activity/activities/turntable.html'
            }else if(type == '03'){
                url = '/ynet_activity/activities/fruitMachine.html'
            }else if(type == '04'){
                url = '/ynet_activity/activities/shake.html'
            }else if(type == '05'){
                url = '/ynet_activity/guess/start.html'
            }else if(type == '06'){
                url = '/ynet_activity/activities/scratch.html'
            }else if(type == '07'){
                url = '/ynet_activity/activities/flipCard.html'
            }else{
                url = '/ynet_activity/activities/redPacket.html'
            }
            return url
        },
        checktype(id) {
            this.checkedId = id
            this.activeList = []
            this.initActiveData(1,10)
        },
        choseActivity(row) {
            this.checkAcitivityId = row.marketId
            this.marketName = row.marketName
        },
        searchActive(){
            this.initActiveData(1,10)
        },
        getInitChangeState(tar){
            let state = tar =='1'?'待审核':tar =='2'?'有效':tar =='3'?'进行中':tar =='4'?'已结束':tar =='5'?'已开奖':'取消'
            return state
        },
        changeTime(time){
            let year = time.slice(0,4)
            let month = time.slice(4,6)
            let day = time.slice(6,8)
            let hh = time.slice(8,10)
            let mm = time.slice(10,12)
            let ss = time.slice(12,14)
            return year +'-'+month+'-'+day+' '+hh+':'+mm+':'+ss
        },
        //****分页开始
        handleSizeChange(val){
            this.initActiveData(1,val)
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.initActiveData(val,10)
        },
        handlePreNumber(val){
            this.currentPage = val
            this.initActiveData(val,10)
        },
        handleNexNumber(val){
            this.currentPage = val
            this.initActiveData(val,10)
        },
        //分页结束****/
    }
}
</script>
<style lang="scss" scoped>
.activity-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .box-left{
        width: 120px;
        padding-top: 48px;
        margin-right: 10px;
        .activity-type{
            width: 120px;
            display: flex;
            justify-content: flex-start;
            padding-top: 24px;
            flex-direction: column;
            .type-item{
                width: 120px;
                height: 40px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .type-item:hover{
                background: #F2F8FF;
            }
            .checkedGroup{
                background:  #F2F8FF;
            }
            .type-item span{
                font-family: MicrosoftYaHeiUI;
                font-size: 12px;
                color: #323C41;
                line-height: 16px;
            }
        }
    }
    .box-right{
        width: 670px;
        .head-search{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .search{
                width: 400px;
                height: 40px;
            }
        }
        .table-box{
            margin-top: 32px;
            .list-handle{
                position: relative;
                z-index:2000;
                img{
                    margin-right: 10px;
                    cursor: pointer;
                }
                img:last-child{
                    margin-right: 0px;
                }
            }
        }
        .table-page{
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
            .el-pagination{
                position: relative;
                right: -5px;
            }
        }
    }
}
.blank-page{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
}
.loading {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px; /* 高度的一半 */
    margin-left: -10px;
    animation: load 1s linear infinite;
}
@keyframes load
{
    from{-webkit-transform:rotate(0deg);}
    to{-webkit-transform:rotate(360deg);}
}
.loading_text {
    font-family: MicrosoftYaHeiUI;
    font-size: 12px;
    color: #666666;
    text-align: center;
    padding-top: 50px;
}
</style>