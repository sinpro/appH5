<template>
  <div
    v-if="visible"
    class="ynet-custom-header"
    :style="{ paddingTop: statusBarHeight + 'px', backgroundColor: barBgColor }"
  >
    <slot name="leftMenu">
      <div class="left-btn" @click="backHandle" />
    </slot>
    <div class="bar-title">
      <slot name="title">
        标题
      </slot>
    </div>
    <slot name="rightMenu">
      <div class="right-btn" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'YnetCustomHeader',

  props: {
    bgColor: {
      type: String,
      default: '0, 0, 0',
    },
    thresholdDistance: {
      type: Number,
      default: 24,
    },
  },

  data() {
    return {
      statusBarHeight: 24,
      visible: true,
      barSize: ~~(parseInt(document.documentElement.style.fontSize) * 0.8),
      barBgColor: '',
    }
  },

  created() {
    this.initBar()
  },

  resume() {
    this.initBar()
  },

  methods: {
    initBar() {
      app.api.getStatusBarHeight().then((h) => {
        this.statusBarHeight = Number(h.statusBarHeight)
        this.visible = true
        app.api.hideTitleBar()
        this.$emit('visibleChange', { statusBarHeight: this.statusBarHeight })
        window.addEventListener('scroll', this.calcOpacity)
      })
    },

    calcOpacity() {
      let move =
        window.pageYOffset > this.thresholdDistance
          ? window.pageYOffset - this.thresholdDistance
          : 0
      let cur = move / (this.statusBarHeight + this.barSize)
      cur > 1 ? (cur = 1) : null
      this.barBgColor = `rgba(${this.bgColor}, ${cur})`
    },

    backHandle() {
      this.$emit('visibleChange', { statusBarHeight: 0 })
      this.visible = false
      this.barBgColor = ''
      window.removeEventListener('scroll', this.calcOpacity)
      app.api.showTitleBar().then(() => {
        app.api.closeToPage(-1)
      })
    },
  },
}
</script>

<style lang="scss">
.ynet-custom-header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  color: #fff;
  height: 0.8rem;
  z-index: 99999;

  .bar-title {
    width: 100%;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.3rem;
  }

  .left-btn,
  .right-btn {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    left: 0.2rem;
    bottom: 0.2rem;

    img {
      width: 100%;
    }
  }

  .left-btn {
    background: url('~@/common/components/custom-header/back.png') no-repeat
      center center;
    background-size: auto 100%;
  }

  .right-btn {
    left: auto;
    right: 0.2rem;
  }
}
</style>
