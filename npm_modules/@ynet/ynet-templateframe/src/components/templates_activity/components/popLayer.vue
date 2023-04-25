<template>
  <div class="mask" v-show="visible" @click="clickMask">
    <div class="wrapp" :class="maskHide ? '' : 'full'" @click="clickWrapp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskHide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    }
  },
  name: 'popLayer',
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    clickMask() {
      this.visible = false;
    },
    clickWrapp(e) {
      e.stopPropagation();
      e.preventDefault();
    },
  },
  mounted() {
    if (this.value) {
      this.visible = true;
    }
  },
  created() {
    window.layerM = this;
  },
}
</script>

<style lang="scss" scoped>
@import '../activities/utils/scss/transform.scss';

.mask {
  position: transformPositionFixed();
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  z-index: 600;

  .wrapp {
    position: relative;
    max-height: 90%;
  }
  .full {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
