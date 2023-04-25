<template>
    <div></div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FSecondFloor',

    mixins,

    props,

    created () {
        this.doEmit('initFloor', {cueImageUrl: this.cueImageUrl, displayImageUrl: this.displayImageUrl, action: this.action})
    }
}
</script>