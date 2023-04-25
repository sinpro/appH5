<template>
  <div>
    <template-list :data="pageData"></template-list>
  </div>
</template>
<script>
export default {
  label: '轮播+待办提醒',

  data() {
    return {
      pageData: {
        cards: [
          {
            type: 'FBannerReminder',
            properties: {
              images: [
                {
                  title: '测试哈哈哈',
                  imageUrl: require('../../../../static/bannerreminder/reminder1.png'),
                  imageUrl_X: require('../../../../static/bannerreminder/reminder1.png'),
                },
                {
                  title: '测试哈哈哈1',
                  imageUrl: require('../../../../static/bannerreminder/reminder2.png'),
                  imageUrl_X: require('../../../../static/bannerreminder/reminder2.png'),
                },
              ],
              rightImageUrl: require('../../../assets/images/gray.jpg'),
              leftImageUrl: require('../../../assets/images/gray.jpg'),
              reminderTitle: '小豹提醒你：',
              reminderDes: {
                notLoginReminder: '登录后可查看待办事项',
              },
              reminderTextColor: '#FFA16535',
              reminderbgImageUrl: require('../../../../static/bannerreminder/reminderbg.png'),
              buttonColor: '#FFF4DAC5',
              businessData: {
                reminderList: [
                  { reminderMsg: '今天有2张信用卡待还款' },
                  { reminderMsg: '今天有3张信用卡待还款' },
                ],
                eventList: [
                  {
                    eventName: '信用卡还款',
                    eventAmt: '-￥5632.47',
                    dateMsg: '还款日',
                    date: '12-03',
                    buttonMsg: '去还款',
                  },
                  {
                    eventName: '贷款还款',
                    eventAmt: '-￥15632.47',
                    dateMsg: '还款日',
                    date: '12-04',
                    buttonMsg: '去还款',
                  },
                  {
                    eventName: '贷款还款',
                    eventAmt: '-￥15632.47',
                    dateMsg: '还款日',
                    date: '12-04',
                    buttonMsg: '去还款',
                  },
                ],
              },
              actionName: '进入金融日历查看更多计划',
            },
          },
        ],
      },
    }
  },
}
</script>
