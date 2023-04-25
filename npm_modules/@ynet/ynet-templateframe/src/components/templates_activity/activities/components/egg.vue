<template>
  <div class="egg">
    <div class="intact" @click="smash" v-show="!isBroken">
      <img src="../../assets/eggs/egg.png" alt="">
      <img src="../../assets/eggs/hammer.png" alt="" class="hammer" v-show="showHammer">
    </div>
    <div class="broken" v-show="isBroken">
      <img src="../../assets/eggs/egg_broken.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showHammer: false,
      isBroken: false
    }
  },
  props:{
    ready:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    smash() {
      if(this.ready && !this.isBroken){
        this.showHammer = true;
        this.$emit('clickHandler', this.afterReceived);
      }
    },
    afterReceived() {
      this.isBroken = true;
      this.showHammer = false;
    }
  }
}
</script>

<style lang="scss">
@import '../utils/scss/transform.scss';

.egg {
  width: transformRemToPx(1.82);
  padding: 0 transformRemToPx(0.34);
  position: relative;

  img {
    width: 100%;
  }
  .hammer {
    width: transformRemToPx(1);
    position: absolute;
    top: transformRemToPx(-0.4);
    right: transformRemToPx(0.2);
    
  }
  .intact .hammer {
    animation: moving 1s infinite both;
  }
  .broken .hammer {
    transform: rotate(-15deg);
    transform-origin: 70% 100%;
  }
  @keyframes moving {
    0% {
      transform: rotate(15deg);
      transform-origin: 70% 100%;
    }
    50% {
      transform: rotate(-15deg);
      transform-origin: 70% 100%;
    }
    100% {
      transform: rotate(15deg);
      transform-origin: 70% 100%;
    }
  }
}
</style>
