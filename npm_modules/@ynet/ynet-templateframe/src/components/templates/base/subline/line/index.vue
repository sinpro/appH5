<template>
    <div class="template_subline_line" ref="templatesublineline" :style="lineStyle"></div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {
    mixins,
    props,

    data () {
        return {
            lineStyle: {
                height: '0',
                borderBottom: '1px solid #ddd',
                borderColor: '#ddd',
                marginLeft: 0,
                marginRight: 0
            }
        }
    },

    mounted () {

        //divlineType 01 实线 02 虚线
        if(this.options.divlineType == '02'){
            this.lineStyle.borderBottomStyle = 'dashed'
        }else{
            this.lineStyle.borderBottomStyle = 'solid'
        }
        
        if(this.options.color){
            this.lineStyle.borderColor = this.options.color
        }

        if(this.options.leftMargin){
            this.lineStyle.marginLeft = this.calcpxbyelem(this.$refs.templatesublineline, 375, this.options.leftMargin)  + 'px'
        }

        if(this.options.rightMargin){
            this.lineStyle.marginRight = this.calcpxbyelem(this.$refs.templatesublineline, 375, this.options.rightMargin)  + 'px'
        }
    }
}
</script>
<style scoped>

.template_subline_rect{
    width: 100%;
    margin: 0 auto;
}

</style>
