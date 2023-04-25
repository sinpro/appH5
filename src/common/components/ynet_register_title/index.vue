<template>
  <div>
    <div class="ynet_register_title">
      {{ title }}
    </div>
    <div class="ynet_register_title_desc">
      {{ desc }}
    </div>
  </div>
</template>

<script>
    export default {
        name: "Index",
        props: ['title', 'desc'],
    }
</script>

<style lang="scss" scoped>
    .ynet_register_title {
        padding-top: .64rem;
        padding-left: .32rem;
        color: #333;
        font-size: .6rem;
        line-height: .84rem;
        font-weight: 600;
    }

    .ynet_register_title_desc {
        margin-top: .16rem;
        margin-left: .32rem;
        color: #666;
        font-size: .28rem;
        line-height: .4rem;
    }
</style>
