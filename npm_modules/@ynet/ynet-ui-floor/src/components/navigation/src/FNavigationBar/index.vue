<template>
    <div></div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FNavigationBar',

    mixins,

    props,

    created () {
        this.doEmit('initNav', this.options)
    }
}
</script>