<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '辅助线',

    data () {

        return {
            pageData: {
                cards: [
                  {
                        type: 'FTitleHorizontal', 
                        properties: {
                          options: {
                            titleContent: '实线',
                            textContent: '',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 0,
                            hasRightImage: 0,
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
                        type: 'FLine', 
                        properties: {
                            lineStyle: '0',
                            leftMargin: '20',
                            rightMargin: '0',
                            lineColor: '#FF000000'
                        }
                  },
                  {
                        type: 'FTitleHorizontal', 
                        properties: {
                          options: {
                            titleContent: '虚线',
                            textContent: '',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 0,
                            hasRightImage: 0,
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
                        type: 'FLine', 
                        properties: {
                            lineStyle: '1',
                            leftMargin: '12',
                            rightMargin: '27',
                            lineColor: '#FF000AE0'
                        }
                  },
                  {
                        type: 'FTitleHorizontal', 
                        properties: {
                          options: {
                            titleContent: '实线',
                            textContent: '',
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: 0,
                            hasRightImage: 0,
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
                        type: 'FLine', 
                        properties: {
                            lineStyle: '0',
                            leftMargin: '20',
                            rightMargin: '20',
                            lineColor: '#FF00AEE0'
                        }
                  }
                ]
            }
        }
    }
}
</script>