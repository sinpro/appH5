<template>
	<el-table
		:data="tableListData"
		class="init_table">
		<el-table-column
			fixed
			align="left"
			width="150"
			show-overflow-tooltip
			label="菜单名称">
				<template slot-scope="scope">
					<p :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
						<i  @click="toggleFoldingStatus(scope.row)" 
						class="permission_toggleFold" :class="toggleFoldingClass(scope.row)"></i>
						{{scope.row.menuName}}</p>
				</template>
		</el-table-column>
        <el-table-column></el-table-column>
        <el-table-column
          align="center"
          width="80"
          label="操作">
              <template slot-scope="scope">
                    <el-checkbox v-if="scope.row.count == '0'" @click="choseMenu(scope.row, $event)"></el-checkbox>
                <!-- <el-button type="text" @click="action(0, scope.row)">新建</el-button> -->
              </template>
        </el-table-column>
	</el-table>
</template>

<script>
export default {
    data() {
        return {
            tableListData: []
        }
    },
    props: {
        ids: {
            type: Array,
            default(){
                return []
            }
        },
        treeData: {
            type: Array,
            default(){
                return []
            }
        },
        updateFlag: {
            type: Number,
            default :1
        }
    },
    created(){
        this.updateTreeData()
        this.menuList = []
    },
    computed: {
        foldAllList(){
            return this.tableListData.map(x => x.__identity)
        }
    },
    watch: {
        updateFlag(){
            this.updateTreeData()
        }
    },
    methods: {
        action(params,checked){
            this.$emit('action', params)
        },
        getMenuList () {
            return this.menuList
        },
        choseMenu (menuInfo, checked) {
            console.log(checked)
            let index
            if(checked){
                this.menuList.push(menuInfo)
            }else{
                index = this.indexOf(this.menuList, menuInfo)
                index > -1 && (this.menuList.splice(index, 1))
            }
        },
        updateTreeData(){
            this.tableListData = this.formatConversion([], this.treeData)
        },
        toggleFoldingStatus(params){
            let emitName = this.ids.includes(params.menuId) ? 'delData' : 'addData'
            this.$emit(emitName, params)
            //console.log(emitName)
        },
        toggleFoldingClass({count, child, menuId}){
            return {
                'permission_placeholder': count == 0,
                'el-icon-caret-right': count == 1 && this.ids.includes(menuId) == false,
                'el-icon-caret-bottom': count == 1 && this.ids.includes(menuId) == true
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
        }
    }
}
</script>

<style lang="scss">
	// @import '^/tableMenu/iconfont/iconfont.css';
	.permission_toggleFold{
		vertical-align: middle;		
		padding-right: 5px;
		font-size: 16px;
		color: #A2A4A6;
		cursor: pointer;
	}
	.permission_placeholder{
		content: ' ';
		display: inline-block;
		width: 16px;
		font-size: 16px;
	}
	.init_table{
		width: 94% !important;
		margin: 0 auto !important;
		th{
			background-color: #FAFAFC ;
			text-align: center !important;
			color: #066cd4;
			font-weight: bold;
			.cell{
				padding: 0 !important
			}
		}
		td,th{
			font-family: '宋体';
			font-family: MicrosoftYaHeiUI;
			font-size: 14px;
			color: #323C41;
			letter-spacing: 0;
			line-height: 20px;
			padding: 0 !important;
			height: 48px !important;
			width: 250px;
		}
		.el-table--border, .el-table--group{
			border: 1px solid #dde2ef
		}
		td, th.is-leaf{
			border-bottom: 1px solid #dde2ef
		}
		.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
			border-right: 1px solid #dde2ef;
		}
		.el-table__fixed-right::before, .el-table__fixed::before{
			height: 0px;
		}
		.el-table__fixed{
			border-bottom-width: 0px;
			bottom: 15px;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped td{
			background-color: #f7f9fa
		}
	}
</style>

