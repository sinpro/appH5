<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '图片广告',

    data () {

        return {
            pageData: {
                cards: [
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '卡片式',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageCard', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                }
                            ],
                            imageSize: '375*188',
                            topMargin: '0',
                            bottomMargin: '0',
                            roundCorner: '0',
                            pointerStyle: '0'
                        }
                    },
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '列表式',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageList', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                }
                            ],
                            imageSize: '375*124',
                            topMargin: '10',
                            bottomMargin: '10',
                            roundCorner: '0'
                        }
                    },
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '层叠式',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageCascade', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                }
                            ],
                            imageSize: '375*164',
                            topMargin: '10',
                            bottomMargin: '10',
                            roundCorner: '0'
                        }
                    },
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '平铺式',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageFlat', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                            ],
                            imageSize: '327*164',
                            topMargin: '10',
                            bottomMargin: '10',
                            roundCorner: '0',
                            pointerStyle: '1'
                        }
                    },
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '侧滑滚动一',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageScrollOne', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                            ],
                            imageSize: '300*120',
                            topMargin: '10',
                            bottomMargin: '10',
                            roundCorner: '0',
                            pointerStyle: '1'
                        }
                    },
                    {
                        type: 'FTitleHorizontal', 
                        properties: {
                            options: {
                                titleContent: '侧滑滚动二',
                                hasLeftImage: '0',
                                hasRightImage: '0'
                            }
                        }
                    },
                    {
                        type: 'FImageScrollTwo', 
                        properties: {
                            images: [
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    imageUrl: require('../../../assets/images/blue.jpg')
                                }
                            ],
                            imageSize: '142*94',
                            topMargin: '10',
                            bottomMargin: '10',
                            roundCorner: '1'
                        }
                    },
                ]
            }
        }
    },
}
</script>