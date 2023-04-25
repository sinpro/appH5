<template>
  <div
    class="device_item_btn"
    @click="$emit('click')"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ['text'],
}
</script>

<style lang="scss" scoped>
.device_item_btn {
  width: 1.44rem;
  height: 0.64rem;
  border: 0.01rem solid #6161f2;
  border-radius: 0.08rem;
  text-align: center;
  line-height: 0.64rem;
  color: #6161f2;
  font-size: 0.28rem;
}
</style>
