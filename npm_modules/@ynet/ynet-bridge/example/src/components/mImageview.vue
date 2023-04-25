<template>
    <div class="v-imageview" :style="{'height':height}">
        <img class="v-imageview_img"  :style="{'opacity': (!src ? 0 : 1)}" :src="src">
    </div>
</template>
<script>
export default {

    props: {

        src: {
            type: String,
            default: ''
        },

        height: {
            type: String,
            default: '4rem'
        }
    },
    
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.v-imageview {
    width: 100%;
    margin-top: 0.32rem;
    background: #ddd;

    .v-imageview_img{
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
    }
}
</style>
