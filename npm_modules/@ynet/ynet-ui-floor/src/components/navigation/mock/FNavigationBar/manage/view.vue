<template>
    <component 
        class="tfloor_navigation_bar_view" 
        v-if="componentType" 
        :is="componentType" 
        :options="options" 
        v-on="$listeners"/>
</template>
<script>
import components from '../components/index.js'

export default {

    components,

    props: {
        
        type: {
            type: String,
            default: ''
        },

        options: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    computed: {

        componentType () {
            return this.type ? `Nav${this.type}` : ''
        }
    }

}
</script>
<style lang="scss">
.tfloor_navigation_bar_view{
    display: flex;
    height: 100%;
    align-items: center;
}
</style>
