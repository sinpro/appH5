<template>
  <div>
    <template-list :data="pageData"></template-list>
  </div>
</template>
<script>
export default {
  label: '双宫格',

  data() {
    return {
      pageData: {
        cards: [
          {
            type: 'FDoubleGrid',
            properties: {
              bgImage: {
                bgImageUrl: require('../../../assets/images/gray.jpg'),
                bgImageUrl_X: require('../../../assets/images/gray.jpg'),
              },
              menus1: [
                {
                  title: '宫格1',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格2',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格3',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格4',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
              ],
              menus1titleColor: '#000000',
              menus2: [
                {
                  title: '宫格-1',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格-2',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格-3',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格-4',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
                {
                  title: '宫格-5',
                  imageUrl: require('../../../../static/blue.jpg'),
                },
              ],
              menus2titleColor: '#000000',
              noticeBgImgeUrl: require('../../../assets/images/gray.jpg'),
              noticeImageUrl: require('../../../assets/images/blue.jpg'),
              noticeTextColor: '#000000',
              noticeList: [
                {
                  title: '通知请详细阅读一下事项1',
                },
                {
                  title: '通知请详细阅读一下事项2',
                },
                {
                  title: '通知请详细阅读一下事项3',
                },
                {
                  title: '通知请详细阅读一下事项4',
                },
              ],
            },
          },
        ],
      },
    }
  },
}
</script>
