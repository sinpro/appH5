<template>
    <div class="styleMenu">
        <div class="menu-content">
            <p class="select-p">样式选择</p>
            <div class="style-card">
                <!-- <drag-item  v-for="(item, index) in menuList" :key="index"  class="style-tab" :itemInfo="item"> -->
                    <div v-for="(item, index) in menuList" :key="index" @mouseover="activeIndex = index" @mouseout="activeIndex=-1" class="style-tab" @click="changeStyleMessage(item, index)"  :class="{'background__border': (item.menuType == activeMenuType)}">
                        <img :src="item.menuType == activeMenuType || index == activeIndex ? item.activeIcon : item.icon" alt="" class="style-icon">
                        <p class="style-name" :class="{'color__active': (item.menuType == activeMenuType)}">{{item.menuName}}</p>
                    </div>
                <!-- </drag-item> -->
            </div>
        </div>
    </div>
</template>

<script>
import dragItem from '../../manage/DragItem'
import {getMenuInfo} from '../utils'

export default {
    components: {
        dragItem
    },
    props: {
        menuType: {
            type: String,
            default: ''
        },
        activeMenu: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cardStyleList: [],
            menuList: [],
            menuNumber: '',
            activeMenuType: '',
            activeIndex: -1
        }
    },
    created() {
        this.initStyleList()
    },
    methods: {
        initStyleList () {
            console.dir(this.menuType)
            this.menuNumber = this.menuType
            this.menuInfo = getMenuInfo(this.menuType) || {}
            console.info(this.menuInfo)
            this.menuList = this.menuInfo.menuList || []
            this.activeMenuType = this.activeMenu || this.menuInfo.menuDefault || this.menuInfo.type || this.menuInfo.menuType
            console.log(this.activeMenuType+ '--------------------')
        },

        changeStyleMessage(item, index) {
            this.$confirm('您确定修改样式吗，修改后该楼层之前编辑的属性都会丢失？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                if(res=='confirm'){
                    this.activeMenuType = item.menuType
                    this.$emit('getStyleMessage', Object.assign({}, item))
                }
            })
        }
    },
    watch: {
        menuType (nval) {
            this.initStyleList()
        },

        activeMenu (newval) {
            this.activeMenuType = newval
        }
    }
}
</script>


<style scoped>
    .styleMenu {
        padding: 0 20px;
        background: #ffffff;
    }
    .menu-content {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        box-shadow: inset 0 -1px 0 0 #F5F5FA;
    }
    .no-box-shadow {
        box-shadow: none;
    }
    .select-p {
        font-family: MicrosoftYaHeiUI;
        font-size: 13px;
        color: #323C41;
        letter-spacing: 0;
        width: 67px;
    }
    .style-card {
        width: 288px;
        /* padding-left: 20px; */
        display: flex;
        flex-wrap: wrap;
    }
    .style-tab {
        width: 80px;
        height: 80px;
        cursor: pointer;
        text-align: center;
        background: #FAFAFC;
        border: 1px solid #FAFAFC;
        margin-right: 16px;
        margin-bottom: 16px;
    }
    .style-tab:hover{
        background: #F2F8FF;
        border: 1px solid #3671FF;
    }
    .style-tab:hover p {
        color: #3671FF;
    }

    .background__border {
        background: #F2F8FF;
        border: 1px solid #3671FF;
    }
    .style-name {
        font-family: MicrosoftYaHeiUI;
        font-size: 12px;
        color: #323C41;
        letter-spacing: 0;
        text-align: center;
    }
    .color__active {
        color: #3671FF;
    }

    .style-icon {
        width: 40px;
        height: 40px;
    }
</style>

