<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '图文',

    data () {

        return {
            pageData: {
                cards: [
                  {
                        type: 'FImageTextLeftRight', 
                        properties: {
                            imageOption: '0',
                            titleTextSize: '16',
                            titleIsBold: '1',
                            titleColor: '#FF333333',
                            desTextSize: '14',
                            desIsBlod: '0',
                            desColor: '#FF333333',
                            isBottomLine: '0',
                            imageTextList: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg'),
                                    title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                    titleDes: '测试描述哈哈哈哈1'
                                }
                            ]
                        }
                  },
                  {
                        type: 'FImageTextLeftRight', 
                        properties: {
                            imageWidth: '48',
                            imageHeight: '48',
                            isRightBtn: '1',
                            btnImageUrl: require('../../../assets/images/gray.jpg'),
                            imageOption: '0',
                            titleTextSize: '16',
                            titleIsBold: '1',
                            titleColor: '#FF333333',
                            desTextSize: '14',
                            desIsBlod: '0',
                            desColor: '#FF333333',
                            isBottomLine: '0',
                            imageTextList: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg'),
                                    title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                    titleDes: '测试描述哈哈哈哈1'
                                }
                            ]
                        }
                  },
                  {
                        type: 'FImageTextLeftRight', 
                        properties: {
                            imageOption: '1',
                            titleTextSize: '16',
                            titleIsBold: '1',
                            titleColor: '#FF333333',
                            desTextSize: '14',
                            desIsBlod: '0',
                            desColor: '#FF333333',
                            isBottomLine: '1',
                            imageTextList: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg'),
                                    title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                    titleDes: '测试描述哈哈哈哈1'
                                }
                            ]
                        }
                  },
                  {
                    type: 'FImageTextTopBottom', 
                    properties: {
                        imageOption: '1',
                        titleDes: '测试描述哈哈哈哈',
                        textOption: '1',
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                titleDes: '测试描述哈哈哈哈1'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextTopBottomTwo', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextTopBottomThree', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈3',
                                titleDes: '测试描述哈哈哈哈3'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextLeftRightSlideOne', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: 'FImageTextLeftRightSlideOne',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈3',
                                titleDes: '测试描述哈哈哈哈3'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextTopBottomSlideOne', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: 'FImageTextTopBottomSlideOne',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈3',
                                titleDes: '测试描述哈哈哈哈3'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextTopBottomSlideTwo', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈3',
                                titleDes: '测试描述哈哈哈哈3'
                            }
                        ]
                    }
                      
                  },
                  {
                    type: 'FImageTextTopBottomSlideThree', 
                    properties: {
                        titleTextSize: '16',
                        titleIsBold: '1',
                        titleColor: '#FF333333',
                        desTextSize: '14',
                        desIsBlod: '0',
                        desColor: '#FF333333',
                        isBottomLine: '1',
                        imageTextList: [
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈1',
                                titleDes: '测试描述哈哈哈哈1'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈2',
                                titleDes: '测试描述哈哈哈哈2'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测试哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈3',
                                titleDes: '测试描述哈哈哈哈3'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题测',
                                titleDes: '测试描述哈哈哈哈3'
                            },
                            {
                                imageUrl: require('../../../assets/images/gray.jpg'),
                                title: '标题',
                                titleDes: '测试描述哈哈哈哈3'
                            }
                        ]
                    }
                      
                  }
                ]
            }
        }
    }
}
</script>