<template>
  <div
    class="cardItem"
    :class="color"
    @click="$emit('click')"
  >
    <div class="cardItem_logo">
      <img :src="require('./type1.png')">
    </div>
    <div class="cardItem_info">
      <h3>{{data.bankName}}</h3>
      <p class="cardItem_type">
        {{cardTypeMap[data.cardType]}}
      </p>
      <p class="cardItem_number">
        {{data.accountNo_mask}}
        <span class="cardItem_name">{{data.accountAlias ? `(${data.accountAlias})` : ''}}</span>
      </p>
    </div>
  </div>
</template>

<script>
const cardTypeMap = {
  '00': '储蓄卡',
  '10': '信用卡',
  '20': '准贷记卡',
  '30': '预付费卡',
  '40': '其他',
  '50': '对公借记卡',
  '60': '对公贷记卡',
}

export default {
  data() {
    return {
      cardTypeMap: cardTypeMap,
    }
  },

  props: ['data'],

  computed: {
    color() {
      if (this.data.isOtherBank) {
        return 'blue';
      } else {
        return 'red';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$red: #EA4242;
$blue: #4262EA;
$green: #04AA89;

.cardItem {
  display: flex;
  width: 6.86rem;
  height: 2.12rem;
  border-radius: .08rem;
  margin: auto;
  margin-bottom: .32rem;
  color: #fff;
  padding: 0 .32rem;
  padding-top: .3rem;
  box-sizing: border-box;
  position: relative;

  &.red {
    background: $red;
  }

  &.blue {
    background: #4262EA;
  }

  &.green {
    background: #04AA89;
  }

  .cardItem_logo img {
    width: .72rem;
    height: .72rem;
    margin-right: .16rem;
  }

  .cardItem_info {
    flex: 1;

    h3 {
      font-size: .32rem;
      line-height: .44rem;
    }

    .cardItem_type {
      font-size: .24rem;
      line-height: .32rem;
      margin-top: .08rem;
    }

    .cardItem_number {
      font-size: .32rem;
      line-height: .44rem;
      margin-top: .32rem;

      .cardItem_name {
        opacity: .6;
        font-size: .24rem;
        margin-left: .06rem;
      }
    }
  }

  .cardItem_default {
    position: absolute;
    top: 0.3rem;
    right: 0.28rem;
    width: 1.12rem;
    height: 0.4rem;
    border-radius: 0.04rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    text-align: center;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 4px;
      transform: skewX(-10deg);
    }
  }
}
</style>
