<template>
    <div class="m-menuview">
        <aside>
            <el-menu :unique-opened="true" class="main-menu" text-color="#fff" active-text-color="#fff">
                <template>
                    <el-submenu v-for="(menuInfo, index) in iMenuList" :key="index" :index="'' + index" class="">
                        <template slot="title" class="title-hover">
                            <img class="iconfont" src="../../assets/images/main/phone.png">
                            <span slot="title" class="aside-font">{{menuInfo.menuName}}</span>
                        </template>
                        <el-menu-item-group class="m-menuview-menu-group">
                            <el-tree v-if="menuInfo.children && menuInfo.children.length>0" :data="menuInfo.children" :props="{label:'menuName', children: 'children'}"
                                @node-click="handleNodeClick">
                            </el-tree>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </aside>
    </div>
</template>
<script>
export default {
    
    props: {
        iMenuList: {
            type: Array,
            default () {
                return []
            }
        }
    },

    methods: {

        handleNodeClick (event) {
            this.$emit('node-click', event)
        }
    }
}
</script>
<style lang="scss" scoped>
.m-menuview{

    .el-menu{
        background: #323c41;
    }

    .el-tree{
        background: #24292c;
    }
    
}
</style>
<style lang="scss">
.m-menuview{
    .el-menu-item-group .el-menu-item-group__title{
        height: 0;
        padding: 0;
    }

    .el-tree-node__content{
        height: 40px;
        color: #FFFFFF;
    }

    .el-submenu__title:hover {
        background-color: #323c41;
    }

    .el-submenu__icon-arrow{
        display: none;
    }

    .el-tree-node__content:hover,
    .el-tree-node:focus>.el-tree-node__content, 
    .is-current>.el-tree-node__content{
        background-color: #fff;
        color: #3671ff;
    }
}
</style>
