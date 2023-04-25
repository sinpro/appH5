<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '宫格',

    data () {

        return {
            pageData: {
                cards: [

                    {
                        type: 'FMenuGrid', 
                        properties: {
                            menuStyle: '01',
                            menus: [
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                }
                            ],
                            columns: '2',
                            topMargin: '10',
                            bottomMargin: '10'
                        }
                    },

                    {
                        type: 'FMenuGrid', 
                        properties: {
                            menuStyle: '01',
                            menus: [
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                }
                            ],
                            columns: '3',
                            topMargin: '10',
                            bottomMargin: '10'
                        }
                    },

                    {
                        type: 'FMenuGrid', 
                        properties: {
                            menuStyle: '01',
                            menus: [
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                }
                            ],
                            columns: '5',
                            topMargin: '10',
                            bottomMargin: '10'
                        }
                    },

                    {
                        type: 'FMenuGrid', 
                        properties: {
                            menuStyle: '02',
                            menus: [
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                },
                                {
                                    title: '转账汇款',
                                    imageUrl: require('../../../assets/images/gray.jpg')
                                }
                            ],
                            columns: '4',
                            topMargin: '10',
                            bottomMargin: '10',
                            bgColor: '#00FFFFFF'
                        }
                    }
                ]
            }
        }
    },
}
</script>