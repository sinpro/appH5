<template>
    <div class="page_main_activity">
        <div class="page_main_activity_container">
            <activity-container title="活动名称" :type="activeType" :options="activityRightView"/>
        </div>
    </div>
</template>
<script>
import {API} from '../../../core/service/api'
import {ActivityContainer} from '../../../../../src/template'

export default {
    
    components: {
        ActivityContainer
    },

    data() {
        return {
            activeType: '03',
            activityRightView: {}
        }
    },

    created () {

    },

    methods: {

    }
}
</script>
<style lang="scss" scoped>
.page_main_activity{
    display: flex;
    justify-content: center;

    .page_main_activity_container{
        width: 320px;
        height: auto;
        min-height: 400px;
        position: relative;
    }
}
</style>