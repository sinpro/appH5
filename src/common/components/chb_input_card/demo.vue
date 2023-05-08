<template>
  <!-- 根节点 -->
  <div class="wrap">
    <chb-input-card
      bigTitle="收款人"
      :inputList="inputList1"
      @inputData="inputData"
      @onClick="onClick"
    >
      <template #rightMsg2>
        <p>右边的插槽</p>
      </template>
    </chb-input-card>
    <chb-input-card
      bigTitle="收款人"
      :inputList="inputList2"
      @inputData="inputData"
      @onClick="onClick"
    >
      <template #error1>
        <p>自定义的错误信息</p>
      </template>
    </chb-input-card>
    <chb-input-card
      bigTitle="收款人"
      :inputList="inputList3"
      @inputData="inputData"
      @onClick="onClick"
    >
      <template #brief0>
        <p>自定义的描述信息</p>
      </template>
    </chb-input-card>
    <div v-if="dataInfo&&dataInfo.length >0">
      <p v-for="(item,index) in dataInfo" :key="index">{{item.value}}</p>
    </div>
  </div>
</template>

<script>
import ChbInputCard from "./index.vue";
/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [ChbInputCard.name]: ChbInputCard
  },
  // 页面所需数据
  data() {
    return {
      dataInfo: [],
      inputList1: [
        {
          title: "收款人識別方式",
          value: "FPS ID",
          readonly: true,
          needIcon: true,
          iconName: "arrow-right",
          placeholder: "请输入"
        },
        {
          title: "FPS ID",
          brief: "可用余额",
          placeholder: "请输入"
        },
        {
          title: "收款人户名",
          placeholder: "请输入"
        }
      ],
      inputList2: [
        {
          title: "收款人識別方式",
          value: "FPS ID",
          readonly: true,
          needIcon: true,
          iconName: "arrow-right",
          placeholder: "请输入"
        },
        {
          title: "FPS ID",
          brief: "可用余额",
          placeholder: "请输入",
          customError: false
        },
        {
          title: "收款人户名",
          placeholder: "请输入"
        }
      ],
      inputList3: [
        {
          title: "收款人識別方式",
          value: "FPS ID",
          readonly: true,
          needIcon: true,
          iconName: "arrow-right",
          placeholder: "请输入",
          customBrief: true
        },
        {
          title: "FPS ID",
          brief: "可用余额",
          placeholder: "请输入"
        },
        {
          title: "收款人户名",
          placeholder: "请输入"
        }
      ]
    };
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
    inputData(val) {
      this.dataInfo = val;
    },
    onClick() {
      alert("我被点击了");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  & > :not(:last-child) {
    margin-bottom: 0.4rem;
  }
}
</style>
