<template>
    <div class="v-inputview">
        <input ref="input" type="text" class="v-inputview_input" :placeholder="placeholder" :value="value" @input="emitInput"/>
        <div class="v-inputview_line"/>
    </div>
</template>
<script>
export default {
    
    props: {
        
        value: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String,
            default: ''
        }
    },

    methods: {
        
        emitInput () {
            this.$emit('input', this.$refs.input.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-inputview {
    width: 100%;
    height: 0.96rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    .v-inputview_input{
        width: 100%;
        height: 0.96rem;
        padding: 0;
        margin: 0;
        font-size: 0.32rem;
        outline: 0;
        border: 0;
    }

    .v-inputview_line{
        width:  100%;
        height: 1px;
        background: #F6F6F6;
    }

}
</style>
<style>
input::-webkit-input-placeholder{
    color: #999999;
}

input:-ms-input-placeholderr{
    color: #999999;
}

input::-moz-placeholder{
    color: #999999;
}
</style>
