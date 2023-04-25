<template>
  <md-scroll-view
      ref="scrollView"
      :scrolling-y="false"
      :touch-angle="80"
      :is-prevent="false"
  ></md-scroll-view>
</template>

<script>
import { ScrollView } from 'mand-mobile'

export default {
  name: 'ynet-button',
  components: {
    mdScrollView: ScrollView,
  },
  props: {
  }
}
</script>

<style>

</style>  