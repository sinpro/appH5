<template>
    <div class="page_template_edit">
        <div class="page_template_edit_left" AUTOHEIGHT>
            <menu-manage/>
        </div>
        <div class="page_template_edit_middle" AUTOHEIGHT>
            <drag-container class="page_template_edit_drag_container" :list="dragList" mode="edit"></drag-container>
        </div>
        <div class="page_template_edit_right" AUTOHEIGHT>

        </div>
    </div>
</template>
<script>
import {DragContainer, menuManage} from '../../../../../src/template'

export default {
    
    components: {
        DragContainer,
        menuManage
    },

    data () {
        return {
            dragList: []
        }
    },

    mounted () {
        this.adjustSize()
    },

    methods: {
        
        /**
         * 调整模板视图高度
         */
        adjustSize () {
            let evt = document.createEvent("Events");
            evt.initEvent('resize', false, true);
            window.dispatchEvent(evt)
        }

    }
}
</script>
<style lang="scss" scoped>
.page_template_edit{
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    position: relative;
    overflow: hidden;

    .page_template_edit_left{
        background: #FFFFFF;
        overflow-x: hidden;
        overflow-y: auto;
        width: 260px;
    }

    .page_template_edit_middle{
        overflow-x: hidden;
        overflow-y: auto;
        flex: 1;
        display: flex;
        justify-content: center;

        .page_template_edit_drag_container{
            margin: 40px 0;
        }
    }

    .page_template_edit_right{
        width: 410px;
        height: 100%;
        background: #FFFFFF;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>