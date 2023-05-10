<template>
  <!-- 根节点 -->
  <div class="wrap infomation">
    <md-field v-if="dataList&&dataList.length>0">
      <md-cell-item :title="item.title" v-for="(item,index) in dataList" :key="index">
        <div slot="right" v-if="item.descList && item.descList.length > 0">
          <div v-for="(el,ind) in item.descList" :key="ind">
            <p v-if="el.text">{{el.text}}</p>
            <p v-if="el.account">{{el.account}}</p>
            <p v-if="el.onlnbl">{{el.onlnbl}}</p>
            <p v-if="el.time" class="infomation__card-time">{{el.time}}</p>
          </div>
        </div>
      </md-cell-item>
    </md-field>
  </div>
</template>
  
  <script>
import { Field, CellItem } from "mand-mobile";
/**
 *
 */
export default {
  name: "CustomInfoCard", // 组件名（若封装为组件则必填）
  props: {
    dataList: {
      type: Array,
      default: []
    }
  }, // 组件传值所需数据
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem
  },
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
  methods: {}
};
</script>
  
  <style lang="scss" scoped>
.infomation {
  /deep/ .md-field {
    padding: .2rem .3rem;
  }

  /deep/ .md-cell-item-body {
    align-items: flex-start;
    padding-top: .2rem;
    padding-bottom: .1rem;
  }

  /deep/ .md-cell-item-right {
    text-align: right;
    line-height: 1.6;
    color: #333;
    max-width: 80%;
  }

  /deep/ .md-cell-item-content {
    font-size: .28rem;
    color: #999;
  }

  .infomation__card-time {
    font-size: .26rem;
    color: #999;
  }
}
</style>
  