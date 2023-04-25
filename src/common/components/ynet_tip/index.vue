
<template>
  <div class="ynet-tip">
    <article class="ynet-tip__content">
      <slot v-if="!tipText" />
      <p
        v-for="(item,index) in tipText"
        :key="index"
      >
        {{ item }}
      </p>
    </article>
  </div>
</template>

<script>
    export default {
        name: 'YnetTip',
        props: {
            tipText: null
        }
    };
</script>

<style lang="scss">
    .ynet-tip {
        margin-top: 0.31rem;
        margin-bottom: 0.37rem;
        padding: 0 $spacing;
        .ynet-tip__content {
            p,
            div {
                color: $ynet-subtitle-color;
                margin-top: 0.16rem;
                font-size: 0.26rem;
                line-height: 0.36rem;
            }
        }
    }
</style>
