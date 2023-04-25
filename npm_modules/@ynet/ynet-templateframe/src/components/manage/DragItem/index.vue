<template>
    <div class="drag_item" ref="dragItem" draggable="true" @dragstart="dragstart($event)" >
        <slot></slot>        
    </div>
</template>
<script>
import props from './utils/props'

export default {
    
    props: props,

    mounted () {
        
    },

    methods: {
        dragstart (ev) {
            console.log('dragstart')
            let itemInfo = this.itemInfo || {}
            try{
                ev.dataTransfer.setData('text', JSON.stringify(itemInfo));
            }catch(e) {
                console.log('e: ', e)
            }
        }
    }

}
</script>
<style scoped>
    .drag_item{
        cursor: pointer;
    }

    .drag_item.drag_item_disabled{
        cursor: default;
    }
</style>
