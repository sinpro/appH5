<template>
    <div class="activity_header">
        <div class="activity_header_head">
            <img src="./assets/statebar.png">
        </div>
        <div class="activity_header_nav">
            <img src="./assets/navleft.png" class="activity_header_nav_arrow"/>
            <span class="activity_header_nav_title">{{title}}</span>
            <img src="./assets/navshare.png" class="activity_header_nav_share"/>
        </div>
    </div>
</template>
<script>
import props from './utils/props'

export default {

    props: props

}
</script>
<style scoped lang="scss">
    .activity_header{
        width: 100%;

        .activity_header_head{
            width: 100%;
            height: 20.1px;
            padding: 3px 5px 0 5px;
        }

        .activity_header_nav{
            width: 100%;
            height: 37.5px;
            display: flex;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0 13.7px;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;

            .activity_header_nav_title{
                font-size: 15.36px;
                color: #333333;
            }
        }
    }
</style>
