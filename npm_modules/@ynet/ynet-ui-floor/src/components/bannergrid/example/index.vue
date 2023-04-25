<template>
  <div>
    <template-list :data="pageData"></template-list>
  </div>
</template>
<script>
export default {
  label: '轮播+宫格',

  data() {
    return {
      pageData: {
        cards: [
          {
            type: 'FBannerGridTop',
            properties: {
              bgImage: {
                bgImageUrl: require('../../../assets/images/gray.jpg'),
                bgImageUrl_X: require('../../../assets/images/gray.jpg'),
              },
              content: '0',
              menus: [
                {
                  title: '宫格1',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格3',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格4',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
              ],
              bananerStyle: '1',
              pointerStyle: '0',
              pointerColor: '#FFFFFFFF',
              imageSize: '335*100',
              images: [
                {
                  title: '轮播1',
                  imageUrl: require('../../../assets/images/gray.jpg'),
                },
                {
                  title: '轮播2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
              ],
            },
          },
          {
            type: 'FBannerGridTop',
            properties: {
              bgImage: {
                bgImageUrl: require('../../../assets/images/gray.jpg'),
                bgImageUrl_X: require('../../../assets/images/gray.jpg'),
              },
              content: '0',
              menus: [
                {
                  title: '宫格1',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格3',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格4',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
              ],
              bananerStyle: '0',
              pointerStyle: '0',
              pointerColor: '#FFFFFFFF',
              imageSize: '335*100',
              images: [
                {
                  title: '轮播1',
                  imageUrl: require('../../../assets/images/gray.jpg'),
                },
                {
                  title: '轮播2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
              ],
            },
          },
          {
            type: 'FBannerGridBottom',
            properties: {
              menus: [
                {
                  title: '宫格1',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格3',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '宫格4',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
              ],
              imageSize: '375*192',
              images: [
                {
                  title: '轮播1',
                  imageUrl: require('../../../assets/images/gray.jpg'),
                },
                {
                  title: '轮播2',
                  imageUrl: require('../../../assets/images/blue.jpg'),
                },
                {
                  title: '轮播3',
                  imageUrl: require('../../../assets/images/gray.jpg'),
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
