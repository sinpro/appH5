<template>
    <div class="flex field" :style="{borderBottom: border ? '0.5px solid #DFDFDF' : ''}">
        <span>{{title}}</span>
        <input type="text" :placeholder="placeholder">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default: ''
        },
        placeholder:{
            type: String,
            default: ''
        },
        border:{
            type: Boolean,
            default: false
        }
    },
    mounted(){
        console.log(11)
    }
}
</script>

<style lang="scss" scoped>
    .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .field{
        background:#fff;
        box-sizing: border-box;
        width: 7.18rem;
        padding:0.26rem 0.32rem  0.26rem 0;
        font-size: 0.32rem;
        color: #333333;
        span{
            width: 1.4rem;
        }
        input{
            text-align: right;
            width: 5rem;
        }
        ::-webkit-input-placeholder{
            color: #BBBBBB;
            text-align: right;
        }
        img{
            width: 0.36rem;
            height: 0.36rem;
        }
    }
</style>