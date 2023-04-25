<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '标题',

    data () {

        return {
            pageData: {
                cards: [
                  {
                        type: 'FTitleHorizontal', 
                        properties: {
                          options: {
                            titleContent: '标题一',
                            textContent: '副标题',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 1,
                            hasRightImage: 1,
                            titleSize: '16',
                            titleBold: '1',
                            titleColor: '#FF333333',
                            textAlignment: '1',
                            textSize: '12',
                            textBold: '0',
                            textColor: '#FF666666',
                            bottomLine: 0
                          }
                        }
                  },
                  {
                        type: 'FTitleHorizontal', 
                        properties: {
                          options: {
                            titleContent: '标题一',
                            textContent: '副标题',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 1,
                            hasRightImage: 1,
                            titleSize: '16',
                            titleBold: '1',
                            titleColor: '#FF333333',
                            textAlignment: '0',
                            textSize: '12',
                            textBold: '0',
                            textColor: '#FF666666',
                            bottomLine: 1
                          }
                        }
                  },
                  {
                        type: 'FTitleVertical',
                        properties: {
                          options: {
                            titleContent: '标题一',
                            textContent: '副标题',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 1,
                            hasRightImage: 1,
                            titleSize: '16',
                            titleBold: '1',
                            titleColor: '#FF333333',
                            textSize: '12',
                            textBold: '0',
                            textColor: '#FF666666',
                            bottomLine: 1
                          }
                        }
                  }
                ]
            }
        }
    }
}
</script>