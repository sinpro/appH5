<template>
  <div class="reset_password_banklist">
    <m-header />
    <title-tip text="为保护您的账户安全，请选择一张银行卡进行验证" />
    <div class="card_area">
      <card-item
        v-for="(item, index) in cardList"
        :key="index"
        :data="item"
        @click="handleCardItemClick(item)"
      />
    </div>
  </div>
</template>

<script>
import mHeader from '@/common/components/header';
import titleTip from '@/common/components/title_tip';
import cardItem from './cardItem.vue';

export default {
  components: {
    mHeader,
    titleTip,
    cardItem,
  },

  data() {
    return {
      cardList: [],
    }
  },

  created() {
    this.getCardList();
  },

  methods: {
    handleCardItemClick(data) {
      app.api.pushWindow('/ynet_account/login_management/reset_password_mobile_and_card_info.html', data);
    },

    getCardList() {
      app.api.getUserInfo().then(res => {
        const { iAccInfoList, oAccInfoList } = res.userInfo.body;
        const info =
          Object.keys(oAccInfoList || [])
            .map(e => ({ ...oAccInfoList[e], isOtherBank: true, }))
            .concat(
              Object.keys(iAccInfoList || [])
                .map(e => ({ ...iAccInfoList[e], isOtherBank: false, }))
            );

        this.cardList = info.filter(card => card.accountSort !== '002');
        console.log(this.cardList);
      });
    },
  },
}
</script>

<style lang="scss">
.reset_password_banklist {
  position: relative;
}
</style>
