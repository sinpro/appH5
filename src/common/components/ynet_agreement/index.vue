<template>
  <div class="ynet-agreement"
@click="checkedTiggle">
    <i
      class="ynet-agreement__icon"
      :class="{ 'ynet-agreement__icon--checked': hasChecked }"
    />
    <p class="ynet-agreement__content"
@click="agreementClick">
      <slot>
        {{ content }}
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'YnetAgreement',
  props: {
    content: '',
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasChecked: false,
    }
  },
  watch: {
    value(newVal) {
      this.hasChecked = newVal
    },
  },
  created() {
    this.hasChecked = this.value
  },
  methods: {
    agreementClick() {
      this.$emit('jump')
    },
    checkedTiggle() {
      this.hasChecked = !this.hasChecked
      this.$emit('input', this.hasChecked)
    },
  },
}
</script>

<style lang="scss">
$iconSize: 0.32rem;
.ynet-agreement {
  display: flex;
  font-size: 0;
  align-items: center;
  padding: 0.16rem 0.32rem;

  .ynet-agreement__icon {
    flex: 0 0 auto;
    display: inline-block;
    width: $iconSize;
    height: $iconSize;
    font-size: $iconSize;
    margin-right: 0.16rem;
    line-height: 0.36rem;
    background: url('./unselect.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .ynet-agreement__icon--checked {
    background: url('./select.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .ynet-agreement__content {
    font-size: 0.26rem;
    line-height: 0.32rem;
    color: $ynet-subtitle-color;
  }

  a {
    color: #6161F2;
  }

  .constitution {
    text-decoration: none;
  }
}
</style>
