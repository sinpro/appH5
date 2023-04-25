<template>
    <div class="tfloor_menu_grid" :style="floorStyle">
        <div class="tfloor_menu_grid_container" :style="containerStyle">
            <component
                v-if="menuStyle"
                :is="'view' + menuStyle" 
                :itemList="itemList"
                :columnsNum="columnsNum"
                :titleColor="titleColor"
                class="tfloor_menu_grid_view"
                v-on="$listeners"/>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import components from './components/index.js'

export default {
    
    name: 'FMenuGrid',

    mixins,

    props,

    components,

    computed: {

        columnsNum () {
            return parseInt(this.columns, 10)
        },

        itemList () {
            let menus = this.menus || []

            return menus.reduce((retList, item, index) => {
                if(index%this.columnsNum == 0){
                    retList[retList.length] = []
                }
                retList[retList.length - 1].push(item)
                return retList
            }, [])
        },

        floorStyle () {
            return {
                backgroundColor: this.doParseColor(this.bgColor),
                boxShadow: this.shadow == '1' ? `0 1px ${this.doCalcSize('6')} 0 rgba(21,30,121,0.10)` : 'none',
                margin: '0 auto',
                width: this.shadow == '1' ? this.doCalcSize('343') : '100%',
                borderRadius: this.shadow == '1' ? this.doCalcSize('8') : '0'
            }
        },

        containerStyle () {
            return {
                marginTop: this.doCalcSize(this.topMargin),
                marginBottom: this.doCalcSize(this.bottomMargin)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_menu_grid{
    width: 100%;
    display: flex;
}

.tfloor_menu_grid_container{
    width: 100%;
}
</style>