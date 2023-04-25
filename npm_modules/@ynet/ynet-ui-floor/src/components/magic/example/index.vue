<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
export default {
    
    label: '魔方',

    data () {

        return {
            pageData: {
                cards: [
                    {
                        type: 'FMagicCube', 
                        properties: {
                            data: {
                                density: '4x4',
                                itemList: [
                                    {
                                        x: 0,
                                        y: 0,
                                        width: 1,
                                        height: 1,
                                        content: require('../../../assets/images/blue.jpg')
                                    },
                                    {
                                        x: 1,
                                        y: 0,
                                        width: 2,
                                        height: 2,
                                        content: require('../../../assets/images/gray.jpg')
                                    },
                                    {
                                        x: 3,
                                        y: 0,
                                        width: 1,
                                        height: 1,
                                        content: require('../../../assets/images/blue.jpg')
                                    },
                                    {
                                        x: 0,
                                        y: 1,
                                        width: 1,
                                        height: 1,
                                        content: require('../../../assets/images/gray.jpg')
                                    },
                                    {
                                        x: 3,
                                        y: 1,
                                        width: 1,
                                        height: 1,
                                        content: require('../../../assets/images/gray.jpg')
                                    },
                                ]
                            },
                            itemMargin: '0',
                            pageTopBottomMargin: '0',
                            pageLeftRightMargin: '16'
                        }
                    }
                ]
            }
        }
    },
}
</script>