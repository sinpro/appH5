<template>
<div>
    <div v-for="(item, i) in menuList" :key="i">
        <div class="selectKu-head" @click="showMenuCard(item)">
            <img src="../../../assets/bottomSelect.png" alt="" class="head-icon">
            <span class="head-title">{{item.menuName}}</span>
        </div>
        <transition name="mybox">
            <div class="menu-card" v-if="item.menuType">
                <div  @mouseout="sItem.icon = sItem.icon_out" @mouseover="sItem.icon = sItem.icon_active" class="card-tab"  v-for="(sItem, index) in item.menuList" :key="index" @click="clickCardTab(sItem)">
                    <drag-item :itemInfo="sItem" v-if="sItem.menuOnline=='1'">
                        <img :src="sItem.icon" alt="" class="card-icon">
                        <p class="card-name">{{sItem.menuName}}</p>
                    </drag-item>
                    <div v-else class="template_offline" draggable="true" @dragstart="dragstart($event)">
                        <span class="template_offline_text">即将上线</span>
                        <img :src="sItem.icon" alt="" class="card-icon">
                        <p class="card-name">{{sItem.menuName}}</p>
                    </div>
                </div>
                
                <!-- <div class="card-tab"  v-for="(sItem, index) in item.menuList" :key="index" @click="clickCardTab(sItem)">
                    <img :src="sItem.icon" alt="" class="card-icon">
                    <p class="card-name">{{sItem.menuName}}</p>
                </div> -->
            </div>
        </transition>
    </div>
</div>
    
</template>

<script>
import dragItem from '../../manage/DragItem'
import {menuTreeInfo} from '../../../config/components'
import props from './utils/props'
export default {
    components: {
        dragItem
    },
    props: props,
    data() {
        return {
            closeIndex: '',
            menuList: menuTreeInfo,
            iconImg: ''
        }
    },
    methods: {
        
        dragstart (event) {
            event.preventDefault && event.preventDefault()
            event.returnValue = false
            return false
        },

        showMenuCard(item) {
            // item.flag = !item.flag
            if (item.menuType) {
                item.menuType = ''
            } else {
                item.menuType = 'MT'
            }
        },
        clickCardTab(sItem) {
            // console.log(sItem)
            this.$emit('getMenuManageCard', sItem)
        }
    }
}
</script>

<style scoped>
    .selectKu-head {
        width: 240px;
        height: 38px;
        display: flex;
        align-items: center;
        padding: 11px 0;
        box-shadow: inset 0 -1px 0 0 #F2F2F2;
        cursor: pointer;
    }
    .head-icon {
        width: 16px;
        height: 16px;
        margin-left: 12px;
        margin-right: 8px;
    }

    .head-title {
        font-family: MicrosoftYaHeiUI;
        font-weight: bold;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
    }

    .mybox-leave-active,.mybox-enter-active{
        transition:  all 0.5s ease; 
    }
    .mybox-leave-active,.mybox-enter{
        height:0px !important;
    }
    .mybox-leave,.mybox-enter-active{
        height: 246px;
    }
    .menu-card {
        width: 240px;
        /* height: 328px !important; */
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        box-shadow: inset 0 -1px 0 0 #F2F2F2;
    }

    .card-tab {
        width: 80px;
        height: 82px;
        cursor: pointer;
        text-align: center;
    }
    .card-tab:hover {
        background: #F2F8FF;
    }
    .card-tab:hover p {
        color: #3671FF;
    }

    .card-name {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        letter-spacing: 0;
        text-align: center;
    }

    .template_offline{
        position: relative;
    }

    .template_offline_text{
        position: absolute;
        top: 6px;
        left: 40%;
        background: rgb(54,113,255);
        color: #FFFFFF;
        font-size: 12px;
        padding: 0 2px;
        white-space: nowrap;
    }

</style>



