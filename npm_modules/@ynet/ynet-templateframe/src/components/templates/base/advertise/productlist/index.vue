<template>
    <div class="template_advertise_productlist" ref="templateadvertiseproductlist">
        <div class="template_advertise_productlist_caption" :style="captionStyle">为你推荐</div>
        <component v-if="componentType" :is="componentType" :mode="mode" :properties="properties" :options="options" @mClick="$emit('mClick', $event)"/>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import financeVerticallist from '../../finance/verticallist'
import picturetextVerticalthreetext from '../../picturetext/verticalthreetext'

export default {

    props,
    mixins,

    components: {
        financeVerticallist,
        picturetextVerticalthreetext
    },

    data () {
        return {
            captionStyle: {
                width: 'auto',
                height: 'auto',
                fontSize: '18px'
            },
            componentType: ''
        }
    },

    created () {
        //默认显示分割线
        if(this.properties.contentType == '1'){
            //理财
            this.options.isShowLine = '1'
            this.options.divlineColor = '#F5F5FA'
            this.options.noteType = '2'
            this.componentType = 'financeVerticallist'
        }else{
            //分期购
            this.properties.subTitleColor = '#EE2039'
            this.properties.textAlign = 'center'
            this.componentType = 'picturetextVerticalthreetext'
        }
        
    },

    mounted () {
        this.calcRect()
    },

    methods: {

        calcRect () {
            this.captionStyle.width = this.calcpxbyelem(this.$refs.templateadvertiseproductlist, 375, 343) + 'px'
            this.captionStyle.height = this.calcpxbyelem(this.$refs.templateadvertiseproductlist, 375, 48) + 'px'
            this.captionStyle.fontSize = this.calcpxbyelem(this.$refs.templateadvertiseproductlist, 375, 18) + 'px'
        }
    }

}
</script>
<style scoped>
.template_advertise_productlist{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #FFFFFF;
}

.template_advertise_productlist_caption{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #323C41;
    font-weight: bold;
}
</style>

