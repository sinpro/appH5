<template>
    <img :src="imgSrc" v-on="$listeners"/>
</template>
<script>
import mixins from '../../../mixins'

export default {
    mixins,

    props: {
        src: {
            type: String,
            default () {
                return ''
            }
        }
    },

    computed: {
        imgSrc () {
            return this.concatImageUrl(this.src)
        }
    }
}
</script>
