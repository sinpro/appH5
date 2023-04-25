<template>
    <div class="v-toggleview">
       <m-cellview :title="title">
           <div class="v-toggleview_off" :class="{'v-toggleview_on':(!!toggleState)}" @click="toggleClick"></div>
       </m-cellview>
    </div>
</template>
<script>
import mCellview from './mCellview'

export default {

    components: {
        mCellview
    },

    props: {

        value: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: ''
        }

    },

    data () {
        return {
            toggleState: false
        }
    },

    watch: {
        value (val) {
            this.toggleState = val
        }
    },

    methods: {
        toggleClick () {
            this.toggleState = !this.toggleState
            this.$nextTick(() => {
                this.$emit('input', this.toggleState)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.v-toggleview {
    width: 100%;

    .v-toggleview_off{
        width: 0.88rem;
        height: 0.48rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url(../assets/toggle_off.png);
        background-size: 100%;

        &.v-toggleview_on{
            background-image: url(../assets/toggle_on.png);
        }
    }
}
</style>
