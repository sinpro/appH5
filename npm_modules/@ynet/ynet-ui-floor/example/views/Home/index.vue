<template>
    <div class="tfloor_page_home">
        <div class="tfloor_page_home_body">
            <div v-if="!isBack" class="tfloor_page_home_body_list">
                <div class="tfloor_page_home_header">
                    <div class="tfloor_page_home_header_headerview">
                        <div class="tfloor_page_home_header_headerview_logo"></div>
                        <div class="tfloor_page_home_header_headerview_title">
                            {{titleName}}
                        </div>
                        <div class="tfloor_page_home_header_headerview_search">
                            <div class="tfloor_page_home_header_headerview_search_container">
                                <span class="tfloor_page_home_header_headerview_search_icon"></span>
                                <span class="tfloor_page_home_header_headerview_search_input">搜索你想要的组件</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tfloor_page_home_linklist">
                    <div class="tfloor_page_home_linkli" v-for="routeInfo in iList" :key="routeInfo.name" @click="routeTo(routeInfo)">
                        <div class="tfloor_page_home_linkliitem">
                            <div>{{ routeInfo.name }}</div>
                            <div>
                                <img src="../../assets/images/arrow.png" class="tfloor_page_home_arrow"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template v-else>
                <transition :name="transitionName">
                    <div class="tfloor_page_home_body_route">
                        <div class="tfloor_page_home_body_routecontainer">
                            <div class="tfloor_page_home_header tfloor_page_home_header_component">
                                <span class="tfloor_page_home_header_back" @click="routeBack()">
                                    <img src="../../assets/images/arrow_left_white.png" class="tfloor_page_home_arrow_back"/>
                                </span>
                                <span>{{ titleName }}</span>
                            </div>
                            <router-view class="tfloor_page_home_routeview"/>
                        </div>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>
<script>
import routes from "../../router/home.js";

export default {

    created() {
        window.ssssss = this
    },

    data () {
        return {
            transitionName: ''
        }
    },

    methods: {

        routeTo (routeInfo) {
            this.$router.push(routeInfo.path)
        },

        routeBack() {
            this.$router.back()
        }
    },

    computed: {

        isBack () {
            return this.$route.name != 'Home'
        },

        titleName () {
            if(this.$route.name == 'Home'){
                return '猎豹金融楼层组件测试'
            }
            return this.$route.name
        },

        iList () {
            let routeLen = routes.length

            for(let i = 0; i < routeLen; i++){
                let routeInfo = routes[i]
                if(routeInfo.name == 'Home'){
                    return routeInfo.children
                }
            }

            return []
        }
    },

    watch: {

        '$route' (to, from) {
            if(to.path == '/Home' && from.path != '/Home'){
                this.transitionName = 'tfloor_page_home-slide-left'
            }else if(from.path == '/Home' && to.path != '/Home'){
                this.transitionName = 'tfloor_page_home-slide-right'
            }
            window.scrollTo(0, 0)
        }
    }
};
</script>

<style lang="scss">
.tfloor_page_home {
    width: 100%;
    height: 100%;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;


    .tfloor_page_home_header{
        width: 100%;
        text-align: center;
        background-color: #FFFFFF;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        position: relative;
    }

    .tfloor_page_home_header_component{
        height: 50px;
        line-height: 50px;
        background-image: linear-gradient(90deg,#2a2e49,#1a1f40);
        color: #FFFFFF;
    }

    .tfloor_page_home_header_back{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        padding: 0 8px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding-left: 10px;
    }


    .tfloor_page_home_header_headerview {
        display: flex;
        color: #FFFFFF;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 230px;
        margin-bottom: 30px;
        position: relative;
        background: url(../../assets/images/headerbg.png) no-repeat center center;
        background-size: 100%;

        .tfloor_page_home_header_headerview_logo{
            width: 56px;
            height: 58px;
            margin-bottom: 16px;
            background: url(../../assets/images/logo.png) no-repeat center center;
            background-size: 100% 100%;
        }

        .tfloor_page_home_header_headerview_title {
            font-size: 20px;
            margin-bottom: 24px;
        }

        .tfloor_page_home_header_headerview_search{
            position: absolute;
            bottom: 0;
            width: 100%;
            transform: translateY(50%);
            display: flex;

            .tfloor_page_home_header_headerview_search_container{
                background-color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #999999;
                width: 100%;
                margin: 0 16px;
                box-shadow: 0 4px 10px #ece8e8;
                border-radius: 4px;
            }

            .tfloor_page_home_header_headerview_search_icon{
                width: 16px;
                height: 16px;
                background: url(../../assets/images/search.png) no-repeat center center;
                background-size: 100% 100%;
                margin-right: 8px;
            }

            .tfloor_page_home_header_headerview_search_input{
                height: 48px;
                line-height: 48px;
                padding: 0;
                border: 0;
                font-size: 16px;
            }
        }
    }

    .tfloor_page_home_body{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .tfloor_page_home_body_list{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #F7F7F7;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .tfloor_page_home_arrow_back{
        width: 24px; 
        height: 24px;
    }

    .tfloor_page_home_arrow{
        width: 15px; 
        height: 15px;
        transform: rotate(180deg);
    }

    .tfloor_page_home_linklist{
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
    }

    .tfloor_page_home_linkli{
        width: 90%;
        height: 40px;
        line-height: 40px;
        margin: 8px 0;
        text-align: center;
        background: #FFFFFF;
        box-shadow: 0 0 10px #ECE8E8;
        cursor: pointer;
    }

    .tfloor_page_home_linkliitem{
        width: 90%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .tfloor_page_home_body_route{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        overflow-x: hidden;
        overflow-y: auto;
        transition: all .4s ease;
        background-color: #F7F7F7;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .tfloor_page_home_body_routecontainer{
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
    }

    .tfloor_page_home-slide-left-enter,
    .tfloor_page_home-slide-right-leave-active{
        opacity: 1;
        transform: translate(100%, 0);
    }

    .tfloor_page_home-slide-left-leave-active,
    .tfloor_page_home-slide-right-enter{
        opacity: 1;
        transform: translate(-100%, 0);
    }
}
</style>
