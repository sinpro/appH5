<template>
  <div
    class="ynet-slide-delete"
    :style="{ height: calcHeight, width: contentWidth + 'px' }"
    @touchstart.capture="touchstartHandler"
    @mousedown.capture="touchstartHandler"
    @touchmove.capture="touchmoveHandler"
    @mousemove.capture="touchmoveHandler"
    @touchend.capture="touchendHandler"
    @mouseup.capture="touchendHandler"
  >
    <div class="ynet-control" @click.stop="deleteHandler">
      <slot name="control"></slot>
    </div>
    <div
      class="ynet-content"
      ref="content"
      :style="{ transform: finalOffset, transition: trans }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ynet-slide-delete',
  data() {
    return {
      calcHeight: 'auto',
      contentWidth: 0,
      startX: 0,
      currentX: 0,
      offset: 0,
      currentOffset: 0,
      threshold: 40,
      couldTouch: ('ontouchstart' in window),
      isPress: false,
    }
  },

  props: {
    thresholdDistance: {
      type: Number,
      default: 0.2,
    },
    thresholdTrigger: {
      type: String,
      default: 15,
    },
    duration: {
      type: Number,
      default: 100,
    },
    data: {
      type: Object,
      default: {},
    }
  },

  computed: {
    moveDistance() {
      return `translate3d(${this.currentOffset}px, 0, 0)`;
    },

    trans() {
      return this.isPress ? 'none' : `transform ${this.$props.duration}ms ease 0s`;
    },

    isTrigger() {
      return this.currentOffset + this.threshold < 0;
    },

    releaseMove() {
      return this.isTrigger ? `translate3d(-${this.threshold}px, 0, 0)` : 'translate3d(0, 0, 0)';
    },

    finalOffset() {
      return this.isPress ? this.moveDistance : this.releaseMove;
    }
  },

  mounted() {
    const { content } = this.$refs;
    this.calcHeight = content.offsetHeight + 'px';
    this.contentWidth = content.offsetWidth;
    this.threshold = this.$props.thresholdDistance * this.contentWidth;
  },

  methods: {
    getPoz(e) {
      return this.couldTouch ? e.touches[0].clientX : e.clientX;
    },

    touchstartHandler(e) {
      if (this.isPress) {
        return;
      }
      this.startX = 0;
      this.currentX = 0;
      this.currentOffset = this.offset;
      this.isPress = true;
      this.startX = this.getPoz(e);
    },

    touchmoveHandler(e) {
      if (!this.isPress) {
        return;
      }
      this.currentX = this.getPoz(e);
      const move = this.currentX - this.startX;
      if (Math.abs(move) < this.$props.thresholdTrigger) {
        return;
      }
      this.currentOffset = this.offset + move;
    },

    touchendHandler(e) {
      this.offset = this.isTrigger ? this.threshold * -1 : 0;
      setTimeout(() => {
        this.isPress = false;
      }, this.$props.duration);
    },

    deleteHandler() {
      this.$emit('delete', this.$props.data);
    }
  }
}

</script>

<style lang="scss">
.ynet-slide-delete {
  position: relative;
  overflow: hidden;

  .ynet-content {
    position: absolute;
    left: 0;
    top: 0;
  }

  .ynet-control {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
}
</style>
