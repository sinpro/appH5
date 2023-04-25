<!-- 温馨提示组件，by liyilei，2018.4.25
    标题可以通过传进来，默认温馨提示
    只能用div或者p标签
    hasColon:默认有冒号
    hasflags:后面是否要符号，默认是有
     -->

<template>
  <div class="ynet-prompt">
    <h5
      class="ynet-prompt__title"
      :class="titleColor"
      @click="clickTitle"
    >
      <span>{{ title }}</span>
      <span v-if="hasflags">
        <span v-if="!arrow && hasColon">：</span>
        <span
          v-else
          class="ynet-prompt__arrow"
          :class="!isDown ? 'down' : 'up'"
        />
      </span>
    </h5>
    <article
      v-if="!arrow"
      class="ynet-prompt__content"
    >
      <slot v-if="!pactText" />
      <p
        v-for="(item,index) in pactText"
        :key="index"
      >
        {{ item }}
      </p>
    </article>
    <transition
      v-if="arrow"
      name="slide-fade"
    >
      <div
        v-show="!isDown"
        class="ynet-prompt__content"
      >
        <slot v-if="!pactText" />
        <p
          v-for="(item,index) in pactText"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: 'YnetPrompt',
        props: {
            title: {
                type: String,
                default: '温馨提示'
            },
            pactText: null,
            titleColor: {
                type: String,
                default: 'black'
            },
            arrow: {
                type: Boolean,
                default: false
            },
            hasColon: {
                type: Boolean,
                default: true
            },
            hasflags: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isDown: true
            };
        },
        methods: {
            clickTitle() {
                this.$emit('on-title');
                if (this.arrow) this.isDown = !this.isDown;
            }
        }
    };
</script>

<style lang="scss">
    .ynet-prompt {
        margin-top: 0.25rem;
        /*margin-bottom: 0.6rem;*/
        padding: 0 $spacing 0.58rem $spacing;
        font-size: 0;
        .ynet-prompt__title {
            display: flex;
            display: -webkit-flex;
            color: #999999;
            font-size: 0.26rem;
            line-height: 0.56rem;
        }
        .blue {
            color: $ynet-blue;
        }
        .ynet-prompt__arrow {
            // vertical-align: middle;
            position: relative;
            display: inline-block;
            width: 0.7rem;
            height: auto;
            &::after {
                position: absolute;
                left: 0.2rem;
                top: 50%;
                margin-top: -0.14rem;
                display: inline-block;
                width: 0.14rem;
                height: 0.28rem;
                content: '';
                background-size: cover;
                background-image: $big-arrow;
            }
        }
        .up {
            &::after {
                // right: 0.24rem;
                transform: rotate(90deg);
                transition: transform 0.3s;
            }
        }
        .down {
            &::after {
                // right: 0.24rem;
                transform: rotate(-90deg);
                transition: transform 0.3s;
            }
        }
        .ynet-prompt__content {
            p,
            div {
                color: $ynet-subtitle-color;
                // margin-top: 0.14rem;
                font-size: 0.24rem;
                line-height: 0.46rem;
            }
        }
        .is-important {
            color: $ynet-dark-red;
            font-size: 0.24rem;
            line-height: 0.46rem;
        }
    }
</style>
