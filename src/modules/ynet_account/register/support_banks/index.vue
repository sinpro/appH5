<template>
  <div class="support_banks">
    <m-header
      :left-menu="[{ icontype: 'back_black' }]"
      bar-bottom-line-color="#333333"
    />
    <!-- <div class="nav">
      <div
        class="nav_item"
        :class="{active: activeNav == 0}"
        @click="handleNavItemClick('00')"
      >
        借记卡
      </div>
      <div
        class="nav_item"
        :class="{active: activeNav == 1}"
        @click="handleNavItemClick('10')"
      >
        信用卡
      </div>
    </div> -->
    <div class="list">
      <div
        v-for="(item, index) in bankList"
        :key="index"
        class="list_item"
      >
        <img :src="item.logo">
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header'

export default {
  components: {
    mHeader,
  },

  data() {
    return {
      activeNav: 0,
      bankList: [],
      placeImg: require('@/common/cssBundle/assets/registered/bank_eg.png'),
    }
  },

  created() {
    this.getBankList({
      page: '1',
      type: '00',
    })
  },

  methods: {
    handleNavItemClick(index) {
      this.activeNav = index

      const data = {
        page: '1',
        type: index + '',
      }

      this.getBankList(data)
    },

    getBankList({ page, type }) {
      const data = {
        pageSize: '15',
        pageNo: page,
        // cardType: type,
      }

      app.api.rpc('UR0027', data).then(response => {
        const { bankInfoList } = response

        this.bankList = bankInfoList.map(item => {
          const o = {}

          o.text = item.bankName
          // todo: 替换银行 logo
          o.logo = item.bankIcon || this.placeImg

          return o
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .support_banks {
    background-color: #fff;
    // padding-top: .96rem;

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: #fff;
      height: .96rem;
      line-height: .96rem;
      border-bottom: .01rem solid #dfdfdf;
      display: flex;
      padding: 0 .32rem;
      text-align: center;
      font-size: .32rem;
      color: #999;

      .nav_item {
        flex: 1;
        position: relative;

        &.active {
          color: #333;

          &:after {
            content: '';
            position: absolute;
            bottom: -.01rem;
            left: 50%;
            width: .92rem;
            height: .08rem;
            background: #6161F2;
            margin-left: -.46rem;
          }
        }
      }
    }

    .list_item {
      height: .96rem;
      line-height: .96rem;
      border-bottom: .01rem solid #dfdfdf;
      display: flex;
      align-items: center;
      background-color: #fff;

      img {
        width: .48rem;
        height: .48rem;
        margin-left: .32rem;
        margin-right: .16rem;
        vertical-align: top;
      }
    }
  }
</style>
