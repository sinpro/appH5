<template>
  <div class="success_result">
    <img :src="require('./successfull.png')">
    <p class="success_result_title">
      {{ title }}
    </p>
    <p class="success_result_text">
      {{ text }}
    </p>
  </div>
</template>

<script>
    export default {
        props: ['title', 'text']
    }
</script>

<style lang="scss" scoped>
.success_result {
    background-color: #fff;
    padding-top: .8rem;
    text-align: center;

    img {
        width: 1.6rem;
        height: 1.6rem;
        margin: auto;
    }

    .success_result_title {
        color: #333;
        font-size: .36rem;
        line-height: .48rem;
        margin-top: .32rem;
    }

    .success_result_text {
        color: #999;
        font-size: .28rem;
        line-height: .32rem;
        margin-top: .16rem;
    }
}
</style>
