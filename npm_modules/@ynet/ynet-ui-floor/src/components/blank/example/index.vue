<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '辅助空白',

    data () {

        return {
            pageData: {
                cards: [
                  {
                    type: 'FTitleHorizontal', 
                    properties: {
                        options: {
                        titleContent: '辅助空白',
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
                        type: 'FBlank', 
                        properties: {
                            height: '20',
                            color: '#FF333AE3'
                        }
                  },
                  {
                    type: 'FTitleHorizontal', 
                    properties: {
                        options: {
                        titleContent: '辅助空白',
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
                        type: 'FBlank', 
                        properties: {
                            height: '20',
                            color: '#FFBC3333'
                        }
                  },
                  {
                    type: 'FTitleHorizontal', 
                    properties: {
                        options: {
                        titleContent: '辅助空白',
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
                        type: 'FBlank', 
                        properties: {
                            height: '100',
                            color: '#FF3ED333'
                        }
                  },
                ]
            }
        }
    }
}
</script>