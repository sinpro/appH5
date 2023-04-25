<template>
    <div class="v-titleview">
        <div class="v-titleview_info">
            <div class="v-titleview_nav">
                <div class="v-titleview_back" @click="back">
                    <div class="v-titleview_icon"></div>
                </div>
            </div>
            <div class="v-titleview_container">
                <div class="v-titleview_title" v-show="title">
                    {{title}}
                </div>
                <div class="v-titleview_desc">
                    <slot/>    
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    
    props: {
        title: {
            type: String,
            default: ''
        }
    },

    methods: {

        back () {
            if(history.length <= 1){
                this.$router.push({path: '/'})
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-titleview {
    text-align: center;
    margin-bottom: 0.48rem;

    .v-titleview_info {
        font-size: 0.4rem;

        .v-titleview_nav{
            position: relative;
            width: 100%;
            background-image: linear-gradient(90deg, #2A2E49 0%, #1A1F40 100%);
            height: 1rem;
            display: flex;
            align-items: center;

            .v-titleview_back{
                padding-left: 0.32rem;
                width: 0.68rem;
                height: 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .v-titleview_icon{
                width: 0.48rem;
                height: 0.48rem;
                background: url(../assets/arrow_left_white.png) no-repeat left center;
                background-size: 80%;
            }
        }

        .v-titleview_container{
            margin-top: 0.48rem;

            .v-titleview_title{
                font-size: 0.4rem;
                color: #333333;
                letter-spacing: 0;
                text-align: left;
                padding: 0 0.32rem;
                line-height: 0.48rem;
            }

            .v-titleview_desc{
                font-size: 0.28rem;
                color: #999999;
                letter-spacing: 0;
                text-align: left;
                padding: 0 0.32rem;
                line-height: 0.4rem;
                margin-top: 0.2rem;
            }

        }
    }
}
</style>
