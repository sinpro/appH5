<template>
    <div class="v-headerview">
        <div class="v-headerview_logo"></div>
        <div class="v-headerview_title">
            <slot/>
        </div>
        <div class="v-headerview_search">
            <div class="v-headerview_search_container">
                <span class="v-headerview_search_icon"></span>
                <span class="v-headerview_search_input">搜索你想要的API</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.v-headerview {
    display: flex;
    color: #FFFFFF;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.2rem;
    position: relative;
    padding-top: 1rem;
    background: url(../assets/headerbg.png) no-repeat center center;
    background-size: 100%;

    .v-headerview_logo{
        width: 1.12rem;
        height: 1.16rem;
        margin-bottom: 0.32rem;
        background: url(../assets/logo.png) no-repeat center center;
        background-size: 100% 100%;
    }

    .v-headerview_title {
        font-size: 0.4rem;
        margin-bottom: 0.48rem;
    }

    .v-headerview_search{
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: translateY(50%);
        display: flex;

        .v-headerview_search_container{
            background-color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999999;
            width: 100%;
            margin: 0 0.32rem;
            box-shadow: 0 0.08rem 0.2rem #ece8e8;
            border-radius: 0.04rem;
        }

        .v-headerview_search_icon{
            width: 0.32rem;
            height: 0.32rem;
            background: url(../assets/search.png) no-repeat center center;
            background-size: 100% 100%;
            margin-right: 0.16rem;
        }

        .v-headerview_search_input{
            height: 0.96rem;
            line-height: 0.96rem;
            padding: 0;
            border: 0;
            font-size: 0.32rem;
        }
    }
}
</style>
