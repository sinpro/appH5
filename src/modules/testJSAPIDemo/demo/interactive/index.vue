<template>
  <!-- 根节点 -->
  <div class="wrap">
    <md-button @click="handleAlert">提示框</md-button>
    <md-button @click="handleConfirm">确认框</md-button>
    <md-button @click="handleShowInputAlert">输入提示框</md-button>
    <md-button @click="handleShowLoading">显示加载中</md-button>
    <md-button @click="handleHideLoading">隐藏加载中</md-button>
    <md-button @click="handleShowToast">显示弱提示</md-button>
    <md-button @click="handleShowDatePicker">时间日期选择器</md-button>
    <md-button @click="handleShowActionSheet">显示选项卡</md-button>
    <md-button @click="handleShowPickerView">选择框视图</md-button>
    <md-button @click="handleShowMask">显示导航栏遮罩</md-button>
    <md-button @click="handleHideMask">隐藏导航栏遮罩</md-button>
    <md-button @click="handleSetLeftMenu">设置导航栏左侧按钮</md-button>
    <md-button @click="handleShowLeftMenu">显示导航栏左侧按钮</md-button>
    <md-button @click="handleSetMiddleTitle">设置导航栏标题/图片</md-button>
    <md-button @click="handleSetRightMenu">设置导航栏右侧按钮</md-button>
    <md-button @click="handleSetBarBottomLineColor">设置导航栏底部分隔线颜色</md-button>
    <md-button @click="handleShowTitleBar">显示导航栏</md-button>
    <md-button @click="handleHideTitleBar">隐藏导航栏</md-button>
    <md-button @click="handleSetTitleBarColor">设置导航栏背景色</md-button>
    <md-button @click="handleGetStatusBarHeight">获取状态栏高度</md-button>
    <md-button @click="handleGetTitleBarHeight">获取导航栏高度</md-button>
    <md-button @click="handleSetStatusBarStyle">设置状态栏风格</md-button>
    <md-button @click="handleStartPullDownRefresh">开始下拉刷新</md-button>
    <md-button @click="handleStopPullDownRefresh">结束下拉刷新</md-button>
    <md-button>到底部啦~</md-button>
    <md-button>底部</md-button>
  </div>
</template>
  
  <script>
import { Button } from "mand-mobile";
/**
 *
 */
export default {
  components: {
    [Button.name]: Button
  },
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  // 页面所需数据
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {},
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {
    /**
     * 提示框
     * @param message String 提示文字内容
     * @param title String 标题
     * @param options Object 可选配置项
     */
    handleAlert() {
      app.api.alert("hello world!", "我是标题");
    },
    /**
     * 确认框
     * @param message String 提示文字内容
     * @param title String 标题
     * @param options Object 可选配置项
     */
    handleConfirm() {
      app.api.confirm("hello world!", "我是标题").then(result => {
        console.log("是否点击确认：" + result.ok);
      });
    },

    /**
     * 输入提示框
     * @param options Object 可选配置项
     */
    handleShowInputAlert() {
      app.api
        .showInputAlert({
          title: "备注",
          message: "请输入备注",
          presetInputContent: "000",
          placeholder: "请输入备注",
          okButton: "确定",
          cancelButton: "取消",
          wordsNumLimit: "10",
          keyboardType: "DefaultPad",
          clickBgToHide: false
        })
        .then(result => {
          if (result.ok) {
            console.log("确定文本内容：" + result.inputContent);
          } else {
            console.log("点击了取消");
          }
        });
    },

    /**
     * 显示加载中
     * @param message String 加载时文本
     * @param duration Number 交互持久时间(s)
     */
    handleShowLoading() {
      app.api.showLoading();
    },

    /**
     * 隐藏加载中
     */
    handleHideLoading() {
      app.api.hideLoading();
    },
    /**
     * 显示弱提示
     * @param message String 提示文本
     * @param showIcon String 提示图标
     */
    handleShowToast() {
      app.api.showToast("提示信息");
    },
    /**
     * 时间日期选择器
     * @param options Object 可选配置项
     */
    handleShowDatePicker() {
      // 选择日期
      // app.api
      //   .showDatePicker({
      //     type: "0",
      //     title: "选择日期",
      //     minimumDate: "2019-01-01",
      //     maximumDate: "2020-01-01",
      //     currentDate: "2019-07-14",
      //     dateFormat: "YYYY-MM-DD"
      //   })
      //   .then(result => {
      //     if (result.actionType == "0") {
      //       console.log("您已取消");
      //     } else {
      //       console.log(`选择日期：${result.currentDate}`);
      //     }
      //   });

      // 选择时间
      // app.api
      //   .showDatePicker({
      //     type: "1",
      //     title: "选择时间",
      //     minimumDate: "05:00",
      //     maximumDate: "12:00",
      //     currentDate: "10:18",
      //     dateFormat: "HH:mm"
      //   })
      //   .then(result => {
      //     if (result.actionType == "0") {
      //       console.log("您已取消");
      //     } else {
      //       console.log(`选择时间：${result.currentDate}`);
      //     }
      //   });

      // 选择日期时间
      app.api
        .showDatePicker({
          type: "2",
          title: "选择日期时间",
          minimumDate: "2019-01-01 00:00",
          maximumDate: "2020-01-01 00:00",
          currentDate: "2019-07-14 18:18",
          dateFormat: "YYYY-MM-DD HH:mm"
        })
        .then(result => {
          if (result.actionType == "0") {
            console.log("您已取消");
          } else {
            console.log(`选择日期时间：${result.currentDate}`);
          }
        });
    },
    /**
     * 显示选项卡
     * @param options Object 可选配置项
     */
    handleShowActionSheet() {
      app.api
        .showActionSheet({
          title: "选项卡标题",
          items: ["选项卡1", "选项卡2"],
          selectedIndex: 1
        })
        .then(
          result => {
            console.log("您选中的是：" + result.selectItem);
          },
          result => {
            console.log(result.errorMessage);
          }
        );
    },
    /**
     * 选择框视图
     * @param options Object 可选配置项
     */
    handleShowPickerView() {
      app.api
        .showPickerView({
          defaultValue: [
            { name: "浙江省", value: "001" },
            { name: "杭州市", value: "001001" },
            { name: "拱墅区", value: "001001001" }
          ],

          dataSource: [
            {
              name: "浙江省",
              value: "001",
              children: [
                {
                  name: "杭州市",
                  value: "001001",
                  children: [
                    { name: "拱墅区", value: "001001001", children: [] },
                    { name: "西湖区", value: "001001002", children: [] }
                  ]
                },
                {
                  name: "湖州市",
                  value: "001002",
                  children: [
                    { name: "南浔区", value: "001002001", children: [] },
                    { name: "吴兴区", value: "001002002", children: [] }
                  ]
                }
              ]
            }
          ]
        })
        .then(result => {
          if (result.actionType == "0") {
            console.log("您已取消");
          } else {
            console.log("您选择了：" + result.result);
          }
        });

      // 选中后返回参数格式，如：

      // result: [
      //     { name: '浙江省', value: '001' },
      //     { name: '杭州市', value: '001001' },
      //     { name: '拱墅区', value: '001001001' },
      //   ]
    },

    /**
     * 显示导航栏遮罩
     * @param options Object 可选配置项
     */
    handleShowMask() {
      app.api.showMask({ maskColor: "#88000000" });
    },

    /**
     * 隐藏导航栏遮罩
     * @param options Object 可选配置项
     */
    handleHideMask() {
      app.api.hideMask();
    },

    /**
     * 设置导航栏左侧按钮
     * @param options Object 可选配置项
     * @param keepCallback Function 按钮点击回调函数
     */
    handleSetLeftMenu() {
      app.api.setLeftMenu(
        {
          menus: [
            {
              icontype: "close_black",
              text: "关闭",
              color: "#FF000000",
              overrideClick: false
            },
            {
              icontype: "more_black",
              text: "更多",
              color: "#FF000000",
              overrideClick: false
            }
          ]
        },
        result => {
          console.log(`点击了第${result.index}个按钮`);
        }
      );
    },
    /**
     * 显示导航栏左侧按钮
     * @param show Boolean 不设置默认显示
     */
    handleShowLeftMenu() {
      // 显示
      // app.api.showLeftMenu(true);

      // 隐藏
      app.api.showLeftMenu(false);
    },
    /**
     * 设置导航栏标题/图片
     * @param options Object 可选配置项
     */
    handleSetMiddleTitle() {
      app.api.setMiddleTitle({ title: "测试标题", color: "#FF0000FF" });
    },
    /**
     * 设置导航栏右侧按钮
     * @param options Object 可选配置项
     * @param keepCallback Function 按钮点击回调函数
     */
    handleSetRightMenu() {
      app.api.setRightMenu(
        {
          menus: [
            { icontype: "", text: "按钮", color: "#FF000000" },
            { icontype: "more_black", text: "更多", color: "#FF000000" }
          ]
        },
        result => {
          console.log(`点击了第${result.index}个按钮`);
        }
      );
    },
    /**
     * 设置导航栏底部分隔线颜色
     * @param options Object 可选配置项
     */
    handleSetBarBottomLineColor() {
      app.api.setBarBottomLineColor({ color: "#0000FF" });
    },
    /**
     * 显示导航栏
     */
    handleShowTitleBar() {
      app.api.showTitleBar();
    },
    /**
     * 隐藏导航栏
     */
    handleHideTitleBar() {
      app.api.hideTitleBar();
    },
    /**
     * 设置导航栏背景色
     * @param options Object 可选配置项
     */
    handleSetTitleBarColor() {
      app.api.setTitleBarColor({ color: "#FF00FF00" });
    },
    /**
     * 获取状态栏高度
     */
    handleGetStatusBarHeight() {
      app.api.getStatusBarHeight().then(res => {
        console.log(`状态栏高度：${res.statusBarHeight}`);
      });
    },
    /**
     * 获取导航栏高度
     */
    handleGetTitleBarHeight() {
      app.api.getTitleBarHeight().then(res => {
        console.log(`导航栏高度：${res.titleBarHeight}`);
      });
    },
    /**
     * 设置状态栏风格
     * @param options Object 可选配置项
     */
    handleSetStatusBarStyle() {
      app.api.setTitleBarColor({ color: "#FF00FF00" });
    },
    /**
     * 开始下拉刷新
     */
    handleStartPullDownRefresh() {
      app.api.startPullDownRefresh();
    },
    /**
     * 结束下拉刷新
     */
    handleStopPullDownRefresh() {
      app.api.stopPullDownRefresh();
    }
  }
};
</script>
  
  <style lang="scss">
</style>