<template>
    <div class="v-listview">
        <div class="v-listview_block" v-for="(item, index) in data" :key="index">
            <div class="v-listview_li_title" :class="{'v-listview_li_open':(index==selectedIndex)}" @click="openToggle(item, index)">
                <div class="v-listview_container">
                    <div class="v-listview_title">{{item.title}}</div>
                    <div class="v-listview_line"/>
                    <div class="v-listview_title_icon">
                        <img class="v-listview_title_img" :src="item.icon"/>
                    </div>
                </div>
            </div>
            <div class="v-listview_li_body" :style="{height: ((index==selectedIndex) ? (item.iItemList || []).length + 'rem' : '0')}">
                <div class="v-listview_li" v-for="(itemObj, itemIndex) in (item.iItemList || [])" :key="itemIndex" @click="jumpLink(itemObj)">
                    <div class="v-listview_container">
                        <div class="v-listview_title">{{itemObj.title}}</div>
                        <div class="v-listview_line"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        }
    },

    data () {
        return {
            selectedIndex: -1
        }
    },

    methods: {

        openToggle (item, index) {
            if(this.selectedIndex == index){
                this.selectedIndex = -1
            } else {
                this.selectedIndex = index
            }
        },

        jumpLink (item) {
            this.$router.push({path: item.url, query: item.data || {}})
        }
    }
}
</script>
<style lang="scss" scoped>
.v-listview {
    margin: 0 auto;
    background: #F7F7F7;
    padding: 0 0.32rem;

    .v-listview_block{
        margin: 0.32rem 0;
        background-color: #FFFFFF;
        box-shadow: 0 0 10px #ece8e8;
    }

    .v-listview_li_title{
        -webkit-tap-highlight-color: transparent;

        &.v-listview_li_open{
            opacity: 0.2;
        }

        .v-listview_container:after{
            display: none;
        }

        .v-listview_title_icon {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            width: 0.4rem;
            height: 0.4rem;
            transform: translateY(-50%);

            .v-listview_title_img{
                width: 0.4rem;
                height: 0.4rem;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }

    .v-listview_li_body{
        height: 0;
        transition: height 0.1s;
        overflow: hidden;
    }

    .v-listview_li{
        cursor: pointer;
        background-color: #FFFFFF;
    }

    .v-listview_container{
        width: 90%;
        height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        position: relative;

        &::after {
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -7px;
            display: block;
            width: 7px;
            height: 14px;
            content: '';
            background-size: cover;
            background-image: url(../assets/arrow.png);
        }

        .v-listview_title{
            width: 100%;
            font-size: 0.3rem;
        }

        .v-listview_line{
            width:  100%;
            height: 1px;
            background: #F6F6F6;
        }
    }

    
}
</style>
