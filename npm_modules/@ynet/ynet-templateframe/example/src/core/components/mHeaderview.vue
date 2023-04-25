<template>
    <div class="m-headerview">
        <div class="m-headerview_logo"></div>
        <div class="m-headerview_title">
            {{title}}
            <slot/>
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
    }
}
</script>
<style lang="scss" scoped>
.m-headerview {
    display: flex;
    color: #FFFFFF;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 50px;
    position: relative;
    background: #323c41;

    .m-headerview_logo{
        width: 1.12rem;
        height: 1.16rem;
        margin-bottom: 0.32rem;
        // background: url(../assets/logo.png) no-repeat center center;
        background-size: 100% 100%;
    }

    .m-headerview_title {
        font-size: 16px;
    }

}
</style>
