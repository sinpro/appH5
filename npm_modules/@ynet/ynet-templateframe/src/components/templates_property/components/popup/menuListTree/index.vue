<template>
    <div class="comp_menutree_contaner">
        <el-table :data="tableListData" class="comp_menutree_init_table" :show-header="false">
            <el-table-column class="comp_menutree_menu" fixed align="left"  show-overflow-tooltip label="菜单名称">
                <template slot-scope="scope">
                    <p @click="scope.row.count=='1' && toggleFoldingStatus(scope.row)" :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
                        <i  
                        class="comp_menutree_permission_toggleFold" :class="toggleFoldingClass(scope.row)"></i>
                        {{scope.row.menuName}}</p>
                </template>
            </el-table-column>
            <el-table-column class="comp_menutree_operate" align="center" width="108" label="操作">
                <template slot-scope="scope">
                    <el-checkbox v-if="scope.row.count == '0'" v-model="scope.row._menuBxoChecked" @change="choseMenu(scope.row, $event)"></el-checkbox>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import props from '../props'
import {getMenuList} from '../../../../../utils/api'

export default {

    props: props,

    data() {
        return {
            tableListData: []
        }
    },
    
    created(){
        window.sssss = this

        this.appVersion = ''
        this.menuList = []
        this.getAllMenu({
            'channel':'01',
            'flag':'0',
            'menuLevel':'',
            'menuId':'',
            'appId':''
        })
    },

    methods: {

        /**
         * @export
         * 获取选择的菜单列表
         */
        getMenuInfo () {
            return {
                appVersion: this.appVersion,
                treeName: this.treeName,
                menuList: this.menuList
            } 
        },

        choseMenu (menuInfo, checked) {
            let index
            if(checked){
                //appId必须保持一致
                if(!this.appVersion || this.appVersion == menuInfo.appId){
                    this.menuList.push(menuInfo)
                    this.appVersion = menuInfo.appId
                }else{
                    menuInfo._menuBxoChecked = false
                    this.$alert('不能选择不同版本内的功能菜单', '提示')
                }
            }else{
                index = this.indexOf(this.menuList, menuInfo)
                index > -1 && (this.menuList.splice(index, 1))
            }
        },

        indexOf (arr, item) {
            for(let i = 0; i < arr.length; i++){
                if(arr[i] === item){
                    return i
                }
            }
            return -1
        },

        updateTreeData(){
            this.tableListData = this.formatConversion([], this.allTableData)
        },

        toggleFoldingStatus(menuInfo){
            console.dir(menuInfo)
            if(!menuInfo.__openstate){
                menuInfo.__openstate = true
                this.addData(menuInfo)
            }else{
                menuInfo.__openstate = false
                this.deleteData(menuInfo.menuId)
                this.updateTreeData()
            }
        },

        toggleFoldingClass({count, child, menuId, __openstate = false}){
            count = parseInt(count, 10)
            return {
                'toggle_right': (count > 0) && !__openstate,
                'toggle_down': (count > 0) && __openstate
                // 'el-icon-caret-right': count == 1 && this.ids.includes(menuId) == false,
                // 'el-icon-caret-bottom': count == 1 && this.ids.includes(menuId) == true
            }
        },

        formatConversion(parent, child = [], index = 0, family = [], elderIdentity = 'x'){
            child.map((x, i) => {
                // 设置 __level 标志位 用于展示区分层级
                this.$set(x, '__level', index)
                // // 设置 __family 为家族关系 为所有父级，包含本身在内
                this.$set(x, '__family', [...family, elderIdentity + '_' + i])
                // // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
                this.$set(x, '__identity', elderIdentity + '_' + i)
                parent.push(x)
                // 如果仍有子集，则进行递归
                if (x.child && x.child.length > 0) this.formatConversion(parent, x.child, index + 1, [...family, elderIdentity + '_' + i], elderIdentity + '_' + i)
            })
            return parent
        },

        addData (menuInfo) {
            let data = menuInfo.appId ? {
                'channel':'01',
                'flag':'2',
                'menuLevel': '1',
                'appId': menuInfo.appId
            } : {
                'channel':'01',
                'flag':'1',
                'menuId':menuInfo.menuId
            }

            this.getAllMenu(data, menuInfo.menuId)
        },

        appendData(id, treeData){
            const findData = s => {
                for(let i = 0; i < s.length; i++){
                    if(s[i].menuId == id){
                        this.$set(s[i], 'count', 1)
                        this.$set(s[i], 'child', treeData)
                        break;
                    }else if(s[i].child && s[i].child.length > 0){
                        findData(s[i].child)
                    }
                }
            }
            findData(this.allTableData)
        },

        deleteData(id){
            const findData = s => {
                for(let i = 0; i < s.length; i++){
                    if(s[i].menuId == id){
                        s[i].child = []
                        break;
                    }else if(s[i].child && s[i].child.length > 0){
                        findData(s[i].child)
                    }
                }
            }
            findData(this.allTableData)
        },

        getAllMenu (data, menuId) {

            getMenuList(data).then(res=>{
                var code = res.data.body.errorCode
                if(code == '0'){
                    var allTableData = res.data.body.menuQueryList || []
                    
                    if(!menuId){
                        //更新总树
                        this.allTableData = allTableData
                        this.updateTreeData()
                    }else{
                        //更新子树
                        this.appendData(menuId, allTableData)
                        this.updateTreeData()
                    }
                }else{
                    this.$alert(res.data.body.errorMessage, '提示')
                }
            })
        }
    }
}
</script>

<style lang="scss">
    // @import '^/tableMenu/iconfont/iconfont.css';
    .comp_menutree_contaner{

        .comp_menutree_permission_toggleFold{
            vertical-align: middle;		
            font-size: 16px;
            color: #A2A4A6;
            cursor: pointer;
            border: 5px solid transparent;
            border-width: 5px 4px;
            width: 0;
            height: 0;
            display: inline-block;
            display: inline-block;
            margin: 0 5px 0 0;

            &.toggle_right{
                border-color: transparent;
                border-left-color:rgb(162,164,166);
                transform: translateX(50%) translateY(-10%);
            }

            &.toggle_down{
                border-color: transparent;
                border-top-color: rgb(162,164,166);
                transform: translateY(0%);
            }
        }

        .comp_menutree_permission_placeholder{
            content: ' ';
            display: inline-block;
            width: 16px;
            font-size: 16px;
        }

        .comp_menutree_init_table{
            width: 100% !important;
            margin: 0 auto !important;
            border: 1px solid #DDE0E4;
            border-bottom: 0;

            td{
                font-family: '宋体';
                font-family: MicrosoftYaHeiUI;
                font-size: 14px;
                color: #323C41;
                background-color: #FAFAFC ;
                letter-spacing: 0;
                line-height: 20px;
                padding: 0 !important;
                height: 48px !important;
                border-bottom: 0;
            }
        }
    }
</style>

