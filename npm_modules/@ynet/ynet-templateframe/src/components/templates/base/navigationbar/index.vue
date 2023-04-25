<template>
    <div class="template-navigationbar-box" ref="navigationbar" :style="{
        borderBottom:options.isShowLine =='1' ? '1px solid '+options.divlineColor:'0',
        height:navigationbarHeight,
        background:options.isCustomized == '1' ? options.color : '#ffffff'}">
        <div class="status" :style="statusBarHeight">
            <imageview class="template_navigationbar_img" :style="statusBarImgHeight" :src="options.noteType=='2' ? titleBarImgWhite : titleBarImgBlack " alt=""></imageview>
        </div>
        <div class="title-box" :style="titleBarHeight">
            <div class="title-left" :style="leftStyle">
                <!-- <imageview v-if="showLeftIcon" :src="redIcon" alt="" :style="titleIcon"> -->
                <div v-for="(item,index) in options.styleInfoList" v-if="item.picPositionType=='3' && item.isShow=='1'" :key="index" :style="leftMargin">
                    <imageview v-if="item.contentType=='3' && !item.picUrl && index=='0'" :src="redIcon" alt="" :style="titleIcon"></imageview>
                    <imageview v-if="item.contentType=='3' && item.picUrl" :src="item.picUrl" alt="" :style="titleIcon"></imageview>
                    <div v-if="item.contentType=='5'" class="city">
                        <span :style="{fontSize:font.font14}">城市</span>
                        <imageview :style="titleIcon" :src="downIconGray" alt=""></imageview>
                    </div>
                    <imageview v-if="item.contentType == '6' || item.contentType == '8'" :style="titleIcon" 
                    :src="options.noteType=='1' ? backIconBlack : backIconWhite" alt=""></imageview>
                    <imageview v-if="item.contentType == '7' || item.contentType == '8'" :style="titleIcon" 
                    :src="options.noteType=='1' ? closeIconBlack : closeIconWhite" alt=""></imageview>
                    <span :style="{fontSize:font.font17,color:options.noteType=='1'?'#333333':'#ffffff'}">{{item.title}}</span>
                </div>
                <span v-if="options.styleType=='03'" class="title" :style="{fontSize:font.font18,color:options.noteType=='1'?'#333333':'#ffffff'}">{{options.title}}</span>
            </div>
            <span v-if="options.styleType=='01'" class="title-center" :style="{fontSize:font.font18,color:options.noteType=='1'?'#333333':'#ffffff'}">{{options.title}}</span>
            <div v-if="options.styleType=='02'" class="search" :style="{height:searchStyle.height,padding:'0 '+searchStyle.padding,borderRadius:searchStyle.radius,
            background:options.noteType=='1'?'#F7F7F7':'#333333',opacity: options.noteType=='1' ? 1 : 0.1}">
                <div>
                    <imageview :src="options.noteType=='1'?searchGray:searchWhite" :style="{width:searchStyle.picWidth,height:searchStyle.picWidth}" alt=""></imageview>
                    <span :style="{fontSize:font.font14,color:options.noteType == '1'?'#999999':'#ffffff',marginLeft:searchStyle.padding}">搜索词配置</span>
                </div>
                <imageview :src="item.picUrl" v-for="(item,index) in options.styleInfoList" :key="index" v-if="item.picPositionType=='5'" :style="{width:searchStyle.picWidth,height:searchStyle.picWidth}" alt=""></imageview>
            </div>
            <div class="title-right" :style="rightStyle">
                <div v-for="(item,index) in options.styleInfoList" v-if="item.picPositionType=='4' && item.isShow=='1' && !item.picNum" :key="index" :style="rightMargin">
                    <imageview @click="showMenu(item.ordernNum)" v-if="item.contentType=='3' && !item.picNum" :style="titleIcon" :src="item.picUrl?item.picUrl:redIcon" alt=""></imageview>
                    <span v-if="item.contentType=='4' && item.subTitle" :style="{fontSize:font.font16,color:options.noteType=='1'?'#333333':'#ffffff'}">{{item.subTitle}}</span>
                </div>
            </div>
        </div>
        <div class="menu-item" v-if="isShowMenu" :style="{menuStyle}">
            <ul :style="{paddingLeft:font.font16}">
                <li v-for="(item,index) in menuList" :style="menuStyle" :key="index">
                    <imageview :style="titleIcon" :src="item.picUrl || redIcon" alt=""></imageview>
                    <p :style="{marginLeft:searchStyle.padding,fontSize:font.font14}">{{item.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import mixins from '../../mixins';
import props from '../../props'
export default {
    mixins,
    props,
    data() {
        return {
            titleBarImgBlack:require('../../../../assets/bar-black.png'),
            titleBarImgWhite:require('../../../../assets/bar-white.png'),
            backIconWhite:require('../../../../assets/back_white.png'),
            backIconBlack:require('../../../../assets/back_black.png'),
            closeIconWhite:require('../../../../assets/close_white.png'),
            closeIconBlack:require('../../../../assets/close_black.png'),
            redIcon:require('../../../../assets/red.png'),
            downIconGray:require('../../../../assets/down-gray.png'),
            searchWhite:require('../../../../assets/search_white.png'),
            searchGray:require('../../../../assets/search_gray.png'),
            titleIcon:{},
            font:{},
            isShowMenu:false,
            navigationbarHeight:'',
            statusBarHeight:{},
            statusBarImgHeight:{},
            titleBarHeight:{},
            leftMargin:{},
            rightMargin:{},
            leftStyle:{},
            leftIcon:[
                {
                    icon:require('../../../../assets/red.png'),
                    text:'',
                },
                {
                    icon:'',
                    text:''
                }
            ],
            rightStyle:{},
            rightIcon:[
                {
                    icon:require('../../../../assets/red.png'),
                    text:'',
                },
                {
                    icon:require('../../../../assets/red.png'),
                    text:'',
                }
            ],
            menuList:[],
            showLeftIcon:false,
            searchStyle:{},
            menuStyle:{}
        }
    },
    watch:{
        
    },
    created(){
        console.info(333333)
        console.info(this.options)
    },
    mounted(){
        this.initStyle();
    },
    methods:{
        showMenu(index){
            console.info(index)
            let num = 0;
            this.menuList = [];
            console.info(this.options.styleInfoList)
            this.options.styleInfoList.forEach(item => {
                if(item.picPositionType == '4'){
                    if(item.picNum == index){
                        num++;
                        this.menuList.push(item)
                    }
                }
            });
            console.info(num)
            if(num>0){
                this.isShowMenu = !this.isShowMenu
            }
        },
        calc(len){
            return this.calcpxbyelem(this.$refs.navigationbar, 375, len)+'px';
        },
        initStyle(){
            this.navigationbarHeight = this.calc(64);
            this.statusBarHeight.height = this.calc(20);
            this.statusBarImgHeight.height = this.calc(12)
            this.titleBarHeight.height = this.calc(44);
            this.titleBarHeight.padding="0 "+this.calc(16);
            this.leftStyle.height = this.calc(44);
            this.rightStyle.height = this.calc(44);
            this.menuStyle={
                width:this.calc(134),
                height:this.calc(44),
                top:this.calc(64)
            }
            this.searchStyle = {
                height:this.calc(30),
                padding:this.calc(8),
                radius:this.calc(4),
                picWidth:this.calc(20)
            }
            this.font = {
                font14:this.calc(14),
                font16:this.calc(16),
                font17:this.calc(17),
                font18:this.calc(18),
            }
            let len = this.calc(24);
            this.titleIcon = {
                width:len,
                height:len
            }
            this.leftMargin = {
                marginRight:this.calc(8),
                height:len
            };
            this.rightMargin = {
                marginLeft:this.calc(16),
                height:len
            }
        },
    }
}
</script>

<style lang="scss">
    .template-navigationbar-box{
        background: #FFFFFF;
        position: relative;
        width: 100%;
        // z-index: 1000000;
        .status{
            display: flex;
            align-items: center;
            width: 100%;
            .template_navigationbar_img{
                width: 100%;
            }
        }
        .title-box{
            // text-align: center;
            display: flex;
            position: relative;
            justify-content: space-between;
            align-items: center;
            .title-left{
                top: 0;
                overflow: hidden;
                // position: absolute;
                display: flex;
                align-items: center;
                span{
                    font-family: PingFangSC-Medium;
                    color: #333333;
                    letter-spacing: 0;
                }
                .title{
                    font-family: PingFangSC;
                    font-weight: bold;
                    letter-spacing: 0;
                }
                .city{
                    display: flex;
                    align-items: center;
                }
            }
            .title-center{
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                font-family: PingFangSC;
                font-weight: bold;
                letter-spacing: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .search {
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                    font-family: PingFangSC-Regular;
                    letter-spacing: 0;
                }
                div{
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                }
            }
            >.title-right{
                // position: absolute;
                // top: 0;
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                span{
                    font-family: PingFangSC;
                    font-weight: 400;
                    letter-spacing: 0;
                }
            }
        }
        .menu-item{
            position: absolute;
            background: #FFFFFF;
            z-index: 10000000;
            right: 0;
            border: 1px solid #F2F2F2;
            border-top: 1px solid #F5F5FA;
            ul{
                li{
                    display: flex;
                    align-items: center;
                    border-top: 1px solid #F5F5FA; 
                    &:nth-child(1){
                        border: 0;
                    }
                    p{
                        overflow: hidden;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: #333333;
                        letter-spacing: 0;
                    }
                }
            }
        }
    }
</style>
