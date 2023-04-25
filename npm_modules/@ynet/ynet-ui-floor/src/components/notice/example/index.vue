<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '头条',

    data () {

        return {
            pageData: {
                cards: [
                  {
                    type: 'FTitleHorizontal', 
                    properties: {
                        options: {
                        titleContent: '单行头条',
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
                        type: 'FNoticeOne', 
                        properties: {
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: '1',
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasRightImage: '1',
                            newsList: [
                                {
                                    title: '测试第一条数据测试xxxxxxxasdfasdfasfsafasfsadasfasdfasfafafasa',
                                },
                                {
                                    title: '测试第二条数据测试',
                                },
                                {
                                    title: '测试第三条数据测试',
                                }
                            ],
                            titleColor: '#FF6AE666',
                            bgColor: '#FFFFFFFF'
                        }
                  },
                  {
                    type: 'FTitleHorizontal', 
                    properties: {
                        options: {
                        titleContent: '两行头条',
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
                        type: 'FNoticeTwo', 
                        properties: {
                            leftImageUrl: require('../../../assets/images/gray.jpg'),
                            hasLeftImage: '1',
                            rightImageUrl: require('../../../assets/images/gray.jpg'),
                            hasRightImage: '0',
                            newsList: [
                                {
                                    title: '测试第一条数据测试xxxxxxxasdfasdfasfsafasfsadasfasdfasfafafasa',
                                },
                                {
                                    title: '测试第二条数据测试',
                                },
                                {
                                    title: '测试第三条数据测试',
                                }
                            ],
                            titleColor: '#FF6AE666',
                            bgColor: '#FFFFFFFF'
                        }
                  }
                ]
            }
        }
    }
}
</script>