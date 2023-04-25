<template>
    <div class="tfloor_secondfloor_fsecondfloor">
        <div class="arrow">
            <span>></span>
        </div>
    </div>
</template>
<script>
    import mixins from '../../../../assets/mixins/mixins'
    import props from './props'

    export default {

        name: 'FSecondFloor',

        mixins,

        props,

        created () {
            this.emitFloatEvent()
        },

        methods: {

            emitFloatEvent () {
                let styleConfig = {
                    position: 'absolute',
                    zIndex: 1001
                }

                this.$emit('config', {
                    type: 'style',
                    config: styleConfig
                })
            },
        }
    }
</script>
<style lang="scss">
    .tfloor_secondfloor_fsecondfloor {
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        .arrow{
            background: #CACCD2;
            border-radius: 0 0 100px 100px;
            height: 0.16rem;
            width: 1.08rem;
            margin: auto;
            line-height: 0.16rem;
            text-align: center;
            span{
                color: #fff;
                transform: rotate(90deg);
                display: block;
            }
        }
    }
</style>