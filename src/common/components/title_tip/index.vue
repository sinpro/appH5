<template>
  <div class="title_tip">
    {{ text }}
  </div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style lang="scss" scoped>
.title_tip {
    height: .8rem;
    line-height: .8rem;
    padding: 0 .32rem;
    color: #999;
    font-size: .28rem;
}
</style>
