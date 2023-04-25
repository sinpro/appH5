<template>
  <div class="button" :class="type">
    <span class="right-button">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: 'string',
      default: 'button--primary'
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  width: 278px;
  height: 84px;
  text-align: center;
  border-radius: 20px;
  font-size: 32px;
  line-height: 84px;
}
.button--primary {
  color: #fff;
  text-align: center;
  background: #419AFF;
}
.button--white {
  border: 1px solid #419AFF;
  color: #419AFF;
  background: #fff;

}
</style>

