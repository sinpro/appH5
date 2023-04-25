<template>
  <div class="tfloor_product_roundslide">
    <div class="tfloor_product_roundslide_rect">
      <div class="tfloor_product_roundslide_header">
        <div class="tfloor_common_roundheader">
          <div :style="titleStyle">
            <span>{{ header.title }}</span>
            <slot name="postTitle" />
          </div>
          <div class="tfloor_common_roundheader_right" @click="fireClick">
            <slot name="preIcon" />
            <img
              v-if="header.headerIcon"
              :src="header.headerIcon"
              class="tfloor_common_roundheader_img"
            />
          </div>
        </div>
      </div>
      <div class="tfloor_product_roundslide_body" ref="wrapper">
        <div class="tfloor_product_roundslide_list">
          <div
            v-for="(productInfo, index) in productList"
            :key="index"
            class="tfloor_product_roundslide_item"
          >
            <div
              class="tfloor_product_roundslide_view01"
              @click="productClick(productInfo)"
            >
              <div class="tfloor_product_roundslide_view01_title">
                {{ productInfo.productName }}
              </div>
              <div class="tfloor_product_roundslide_view01_rate">
                {{ productInfo.earningRate }}
              </div>
              <div class="tfloor_product_roundslide_view01_ratedesc">
                {{ productInfo.earningRateDesc }}
              </div>
              <div
                class="tfloor_product_roundslide_view01_label"
                v-if="productInfo.riskRatingDesc"
                :style="labelStyle"
              >
                {{ productInfo.riskRatingDesc || '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { doRequestClick } from '@ynet/ynet-components/src/components/ynetFloor/floorEvent'
export default {
  props: {
    // 标题头
    header: {
      type: Object,
      default() {
        return {}
      },
    },

    // 产品列表
    productList: {
      type: Array,
      default() {
        return []
      },
    },

    // 按钮文字颜色
    btnTitleColor: {
      type: String,
      default: '#FFFFFFFF',
    },
    // 按钮背景颜色
    btnBgColor: {
      type: String,
      default: '#FF1765CA',
    },
  },
  data() {
    return {
      productTypeMap: {
        '0000': {
          name: '理财',
          url:
            '/ynet_new_financial_products/financial_products/financial_products_detail.html?productCategory=${productCategory}&productId=${productId}',
        },
        '0001': {
          name: '基金',
          url:
            '/ynet_fund/index/fund_detail_index.html?productCategory=${productCategory}&productId=${productId}',
        },
        '0002': {
          name: '存款',
          url:
            '/ynet_deposit/certificate_deposit/detail.html?productCategory=${productCategory}&productId=${productId}',
        },
      },
    }
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    //点击去为您推荐页面
    fireClick() {
      app.api.pushWindow('/shanghai_prea/heaveyUser/recommend.html')
    },
    //点击去详情页面
    productClick(productInfo = {}) {
      console.log(productInfo, 111111)
      let url = (this.productTypeMap[productInfo.productCategory] || {}).url
      let action = {
        linkType: '2',
        isLogin: '1',
        linkAddress:
          url ||
          '/ynet_new_financial_products/financial_products/financial_products_detail.html?productId=GYASJG0021',
      }

      doRequestClick({
        data: {
          action: action,
          actionContext: productInfo,
        },
      })
    },
    initScroll() {
      this.$nextTick(() => {
        new BetterScroll(this.$refs.wrapper, {
          scrollX: true,
          click: true,
        })
      })
    },
  },
  computed: {
    labelStyle() {
      return {
        color: '#1765CA',
        backgroundColor: '#fff',
      }
    },
    titleStyle() {
      return {
        fontSize: '14px',
        color: '#8A8A8E',
        fontWeight: 'normal',
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tfloor_product_roundslide_view01 {
  overflow: hidden;
  width: 360px;
  padding: 32px;
  background: #f2f2f7;
  border-radius: 16px;

  .tfloor_product_roundslide_view01_title {
    font-size: 28px;
    color: #000000;
    line-height: 40px;
    font-weight: bold;
  }

  .tfloor_product_roundslide_view01_rate {
    font-weight: bold;
    font-size: 48px;
    color: #ff3a30;
    line-height: 48px;
    margin-top: 24px;
  }

  .tfloor_product_roundslide_view01_ratedesc {
    margin-top: 12px;
    font-size: 24px;
    color: #8a8a8e;
    line-height: 24px;
  }

  .tfloor_product_roundslide_view01_label {
    background: #ffffff;
    border-radius: 10px;
    font-size: 24px;
    color: #1765ca;
    text-align: center;
    line-height: 32px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }
}
.tfloor_common_roundheader {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tfloor_common_roundheader_right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24px;
    color: #000000;
  }

  .tfloor_common_roundheader_img {
    width: 32px;
    height: 32px;
  }
}
.tfloor_product_roundslide {
  .tfloor_product_roundslide_rect {
    background: #ffffff;
    border-radius: 20px;
  }

  .tfloor_product_roundslide_header {
    padding: 32px 32px 0 32px;
  }

  .tfloor_product_roundslide_body {
    padding: 32px 0;
    overflow: hidden;
  }

  .tfloor_product_roundslide_list {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    padding: 0px 32px;
    box-sizing: border-box;
  }

  .tfloor_product_roundslide_item {
    & + .tfloor_product_roundslide_item {
      margin-left: 16px;
    }
  }
}
</style>
