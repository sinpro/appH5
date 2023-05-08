<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="chb_input_main">
      <md-field :title="bigTitle" v-if="inputData&&inputData.length > 0">
        <div v-for="(item,index) in inputData" :key="index">
          <p class="chb_input_title" v-if="item.title">{{item.title}}</p>
          <slot :name="`title${index}`"></slot>
          <md-input-item
            ref="name1"
            :value="item.value"
            :placeholder="item.placeholder"
            @input="inputChange(item)"
            v-model="item.value"
            @change="inputChange(item)"
            :readonly="item.readonly"
            @click.native="handleClick(item)"
          >
            <div slot="right">
              <p v-if="item.needIcon">
                <md-icon name="arrow-right"></md-icon>
              </p>
              <slot :name="`rightMsg${index}`"></slot>
            </div>
            <div slot="error" v-if="item.error || item.customError">
              <p v-if="item.error">{{ item.error }}</p>
              <slot v-else :name="`error${index}`"></slot>
            </div>
            <div slot="brief" v-if="item.brief || item.customBrief">
              <p v-if="item.brief">{{item.brief}}</p>
              <slot v-else :name="`brief${index}`"></slot>
            </div>
          </md-input-item>
          <p>
            <slot name="bottom"></slot>
          </p>
        </div>
      </md-field>
    </div>
  </div>
</template>
  
  <script>
import { InputItem, Field, Icon } from "mand-mobile";
/**
 *
 */
export default {
  name: "chb-input-card", // 组件名（若封装为组件则必填）
  props: {
    bigTitle: {
      type: String,
      default: ""
    },
    inputList: {
      type: Array,
      default() {
        return []
      },
    }
  }, // 组件传值所需数据
  components: {
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon
  },
  // 页面所需数据
  data() {
    return {
      inputData: []
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  // 过滤器集合
  filters: {},
  // 页面初始化执行
  created() {
    this.inputData = JSON.parse(JSON.stringify(this.inputList));
  },
  // DOM加载完毕执行
  mounted() {},
  // 页面用到的方法
  methods: {
    inputChange(item) {
      item.error = ''
      this.$emit("inputData", this.inputData);
    },
    handleClick(item) {
      item.readonly && this.$emit("onClick");
    }
  }
};
</script>
  
  <style lang="scss" scoped>
.wrap {
  .chb_input_main {
    .chb_input_title {
      color: #999;
    }
    /deep/ .md-field {
      background-color: transparent !important;
    }
    /deep/ .md-field-content>:not(:last-child) {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
  