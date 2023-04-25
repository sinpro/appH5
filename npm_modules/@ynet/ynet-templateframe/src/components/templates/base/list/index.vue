<template>
    <div class="template-list-container" ref="list">
        <div class="center-box" :style="{width:boxWidth,
        borderBottom:options.isShowLine =='1' ? '1px solid '+options.divlineColor:'none',
        padding:options.topMargin +'px 0'}">
            <div class="box-content" :style="listBoxStyle" v-if="options.styleType == '01'">
                <div class="left">
                    <div class="icon" v-if="leftList.picUrl" :style="iconSize">
                        <imageview :src="leftList.picUrl" alt="" :style="{width:iconSize.width}"></imageview>
                    </div>
                    <span :style="fontNameSize">{{leftList.title}}</span>
                </div>
                <div class="right">
                    <span :style="fontDelSize">{{rightList.title}}</span>
                    <div class="icon" v-if="rightList.picUrl" :style="icon2Size">
                        <imageview :style="{width:iconSize.width}" :src="rightList.picUrl" alt=""></imageview>
                    </div>
                </div>
            </div>
            <div class="box-content" :style="listBoxStyle2" v-if="options.styleType == '02'">
                <div class="left">
                    <div class="icon" v-if="leftList.picUrl" :style="iconSize">
                        <imageview :src="leftList.picUrl" alt=""></imageview>
                    </div>
                    <div class="item">
                        <span :style="fontNameSize">{{leftList.title}}</span>
                        <span :style="fontDelSize2">{{leftList.subTitle}}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="icon" v-if="rightList.picUrl" :style="icon2Size">
                        <imageview :src="rightList.picUrl" alt=""></imageview>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
import mixins from '../../mixins'
import props from '../../props'
export default {
    mixins,
    props,
    data(){
        return {
            listBoxHeight:'',
            listBoxHeight2:'',
            listBoxStyle:{},
            listBoxStyle2:{},
            iconSize:{},
            icon2Size:{},
            fontNameSize:{},
            fontDelSize:{},
            fontDelSize2:{},
            leftList:'',
            rightList:'',
            boxWidth:''
        }
    },
    created(){
        console.info(111)
        console.info(this.options)
        this.initPageData()
    },
    mounted(){
        this.initStyle()
    },
    methods:{
        initPageData(){
            let data = this.options
            if(data.styleInfoList.length>0){
                let flag = data.styleInfoList[0].picPositionType
                if(flag == '3'){
                    this.leftList = data.styleInfoList[0]
                    this.rightList = data.styleInfoList[1]
                }
                else{
                    this.leftList = data.styleInfoList[1]
                    this.rightList = data.styleInfoList[0]
                }
            }else{
                this.leftList = {title:'名称',picUrl:''}
                this.rightList = {title:'说明文字',picUrl:''}
            }
        },
        calc(len){
            return this.calcpxbyelem(this.$refs.list, 375, len)+'px';
        },
        initStyle(){
            this.listBoxHeight = this.calc(24)
            this.listBoxHeight2 = this.calc(44)

            this.boxWidth = this.calc(343);

            this.listBoxStyle.height = this.calc(24)
            
            this.listBoxStyle2.height = this.calc(44)

            this.iconSize.height = this.calc(24)
            this.iconSize.width = this.calc(24)
            this.iconSize.marginRight = this.calc(8)

            this.icon2Size.height = this.calc(24)
            this.icon2Size.width = this.calc(24)
            this.icon2Size.marginLeft = this.calc(4)

            this.fontNameSize.fontSize = this.calc(14)

            this.fontDelSize.fontSize = this.calc(14)
            this.fontDelSize2.fontSize = this.calc(12)

            console.log(this.listBoxStyle)
        }
    }
}
</script>
<style lang="scss">
.template-list-container{
    box-sizing: content-box;
    width: 100%;
    .center-box{
        margin: 0 auto;
    }
    .box-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background: #F5F5FA;
        .left{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .icon{
                // background: #F1DCE3;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
            >span{
                font-family: PingFangSC;
                font-weight: 600;
                color: #333333;
            }
            .item{
                display: flex;
                justify-content: center;
                align-items: flex-start;
                flex-direction: column;
                >span:first-child{
                    font-family: PingFangSC;
                    font-weight: 600;
                    color: #333333;
                }
                >span:last-child{
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: #999999;
                }
            }
        }
        .right{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >span{
                font-family: PingFangSC;
                font-weight: 400px;
                color: #999999;
            }
            .icon{
                // background: #F1DCE3;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>