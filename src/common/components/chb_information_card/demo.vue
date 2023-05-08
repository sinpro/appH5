<template>
  <!-- 根节点 -->
  <div class="wrap">
    <div class="chb_information_card">
      <div v-if="testList && testList.length > 0">
        <div v-for="(item,index) in testList" :key="index">
          <chb-information-card :dataform="item">
            <template #icon>
              <p>眼睛</p>
            </template>
            <template #tab>
              <p class="open">开启</p>
            </template>
          </chb-information-card>
        </div>
      </div>
      <div v-if="newDataList && newDataList.length > 0">
        <div v-for="(item,index) in newDataList" :key="index">
          <chb-information-card :dataform="item">
            <template #otherTitle>
              <p class="otherTitle">港币 1,678,980.00</p>
            </template>
            <template #tab>
              <p class="more">...</p>
            </template>
          </chb-information-card>
        </div>
      </div>
      <div v-if="list && list.length > 0">
        <chb-information-card :dataform="list"></chb-information-card>
      </div>
      <div v-if="list && list.length > 0">
        <chb-information-card :dataform="list" compact>
          <chb-button inline>取消</chb-button>
          <chb-button inline>确定</chb-button>
        </chb-information-card>
      </div>
      <div v-if="list && list.length > 0">
        <chb-information-card :dataform="list" compact>
          <template #icon>
            <p class="icon">勾勾</p>
          </template>
        </chb-information-card>
      </div>
    </div>
  </div>
</template>

<script>
import ChbInformationCard from "./index.vue";
import ChbButton from "@/common/components/chb_button";

/**
 *
 */
export default {
  name: "", // 组件名（若封装为组件则必填）
  props: [], // 组件传值所需数据
  components: {
    [ChbInformationCard.name]: ChbInformationCard,
    [ChbButton.name]: ChbButton
  },
  // 页面所需数据
  data() {
    return {
      list: [
        {
          childTitle: "测试左边1",
          childDesc: "测试右边1"
        },
        {
          childTitle: "测试左边2",
          childDesc: "测试右边3"
        },
        {
          childTitle: "测试左边3",
          childDesc: "测试右边3"
        },
        {
          childTitle: "测试左边4",
          childDesc: "测试右边4"
        }
      ],
      newDataList: [
        {
          title: "256-20-3218738 HKD 定期账户",
          list: [
            {
              childTitle: "最后更新时间：2023-04-12",
              childDesc: ""
            }
          ]
        }
      ],
      testList: [
        {
          title: "256-20-3218738",
          list: [
            {
              childTitle: "账户名称",
              childDesc: "Wngyu"
            },
            {
              childTitle: "账户类别",
              childDesc: "债券账户"
            },
            {
              childTitle: "市值",
              childDesc: "港币 4,678,970.00"
            },
            {
              childTitle: "最后更新时间",
              childDesc: "2023-04-12"
            }
          ]
        },
        {
          title: "256-20-3218738",
          list: [
            {
              childTitle: "账户名称",
              childDesc: "Wngyu"
            },
            {
              childTitle: "账户类别",
              childDesc: "债券账户"
            },
            {
              childTitle: "市值",
              childDesc: "港币 4,678,970.00"
            },
            {
              childTitle: "最后更新时间",
              childDesc: "2023-04-12"
            }
          ]
        },
        {
          title: "256-20-3218738",
          list: [
            {
              childTitle: "账户名称",
              childDesc: "Wngyu"
            },
            {
              childTitle: "账户类别",
              childDesc: "债券账户"
            },
            {
              childTitle: "市值",
              childDesc: "港币 4,678,970.00"
            },
            {
              childTitle: "最后更新时间",
              childDesc: "2023-04-12"
            }
          ]
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
    eyeClick() {
      console.log("点击了小眼睛");
    }
  }
};
</script>

<style lang="scss" scoped>
.chb_information_card {
  padding: 0.4rem 0.3rem;
  & > :not(:first-child) {
    margin-top: 0.4rem;
  }

  .open {
    background: #facd91;
    padding: 0.02rem 0.14rem;
    border-top-right-radius: 0.16rem;
  }
  .otherTitle {
    margin-bottom: 0.3rem;
  }
  .more {
    font-size: 0.5rem;
    margin-right: 0.3rem;
  }
  .icon {
    width: 1rem;
    position: absolute;
    top: 50%;
    right: 20%;
  }
}
</style>
