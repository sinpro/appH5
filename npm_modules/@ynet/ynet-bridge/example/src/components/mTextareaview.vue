<template>
    <div class="v-textareaview">
        <textarea ref="input" class="v-textareaview_textarea" :placeholder="placeholder" :value="value" @input="emitInput"/>
        <div class="v-textareaview_line"/>
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
.v-textareaview {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .v-textareaview_textarea{
        width: 100%;
        height: 4rem;
        line-height: 0.5rem;
        padding: 0.2rem 0;
        margin: 0;
        font-size: 0.32rem;
        outline: 0;
        border: 0;
    }

    .v-textareaview_line{
        width:  100%;
        height: 1px;
        background: #F6F6F6;
    }

}
</style>
<style>
textarea::-webkit-input-placeholder{
    color: #999999;
}

textarea:-ms-input-placeholderr{
    color: #999999;
}

textarea::-moz-placeholder{
    color: #999999;
}
</style>
