<template>
  <layer class="share-layer" v-model="visiable" :maskHide="true">
    <img src="../assets/arrow.png" class="arrow">
    <img src="../assets/plane.png" class="plane">
  </layer>
</template>

<script>
import layer from './popLayer'

export default {
  components: {
    layer
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visiable: this.value
    }
  },
  data() {
    return {
      visiable: this.value
    }
  },
  watch: {
    value(val) {
      this.visiable = val;
    },
    visiable(val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style lang="scss">
@import '../activities/utils/scss/transform.scss';

.share-layer {
  .arrow {
    position: absolute;
    top: transformRemToPx(0.64);
    right: transformRemToPx(0.82);
    width: transformRemToPx(1.7);
    height: transformRemToPx(1.64);
  }
  .plane {
    position: absolute;
    top: transformRemToPx(2.82);
    left: transformRemToPx(1.41);
    width: transformRemToPx(4.68);
    height: transformRemToPx(1.82);
  }
}
</style>
