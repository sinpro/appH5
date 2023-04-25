<template>
    <div class="template_subline_rect" ref="templatesublinerect" :style="rectStyle"></div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {
    mixins,
    props,

    data () {
        return {
            rectStyle: {
                height: '6px',
                backgroundColor: '#ddd'
            }
        }
    },

    mounted () {
        if(this.options.heightF){
            this.rectStyle.height = this.calcpxbyelem(this.$refs.templatesublinerect, 375, this.options.heightF)  + 'px'
        }

        if(this.options.color){
            this.rectStyle.backgroundColor = this.options.color
        }
    }
}
</script>
<style scoped>

.template_subline_rect{
    width: 100%;
}

</style>
