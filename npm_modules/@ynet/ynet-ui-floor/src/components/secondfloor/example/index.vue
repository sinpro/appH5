<template>
    <div>
        <template-list :data="pageData"></template-list>
    </div>
</template>
<script>
    export default {

        label: '二楼',

        data() {

            return {
                pageData: {
                    cards: [{
                        type: 'FSecondFloor',
                        properties: {
                            cueImageUrl: '',
                            displayImageUrl: '',
                        }
                    }]
                }
            }
        }
    }
</script>