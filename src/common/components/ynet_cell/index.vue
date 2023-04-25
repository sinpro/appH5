<!-- cell组件，by liyilei，2018.4.4
    必须用一个外层DIV包住，不然下划线有问题
    可传值 ：
    title： 左边文字；
    value： 右边文字；
    valueColor: 右边文字的颜色，'gray' || 'red'，默认是空，黑色 ；
    rightArrow： 显示向右箭头，默认是真；
    rotate： 把右箭头变成上下可旋转的箭头，默认是假,
    multiRow： 右边的文字开启多行,默认是真，否则多出来变成点点点点点点
    is-link: 默认是false,直接写在属性上可以开启点击背景特效
    可以<ynet-cell :title="'标题'" :valueColor="'gray'">{{ test | formatPhone }}</ynet-cell>写法，value不用绑定，写在大括号里面
 -->
<template>
  <div
    ref="cell"
    class="ynet-cell"
    :class="{ 'pr32': !rightArrow,'is-active': rightArrow || rotate || isLink }"
    :style="multiRow ? 'height:auto' : ''"
    @click="cellClick"
  >
    <span class="ynet-cell__icon">
      <slot name="icon" />
    </span>
    <span
      class="ynet-cell__title"
      :class="{'cancel-max-width': !value}"
    >{{ title }}
      <span class="ynet-cell__icon">
        <slot name="titleTip" />
      </span>
    </span>
    <p
      class="ynet-cell__value"
      :class="[valueColor , {'ynet-cell__value--nowrap': !multiRow,'cancel-min-width': !value }]"
    >
      <!-- <span class="ynet-cell__value" :class="valueColor">{{ value }}</span> -->
      <slot name="value" />
      <span :class="{ 'multi-row': multiRow }">
        <slot>{{ value }}</slot>
      </span>
    </p>
    <span
      v-if="rightArrow && !rotate && !roundIcon"
      class="ynet-cell__arrow"
      :class="arrowType"
    />
    <span
      v-if="rotate && !roundIcon"
      class="ynet-cell__arrow"
      :class="down ? 'down' : 'up'"
    />
    <span
      v-if="roundIcon"
      class="ynet-cell__icon--round"
    />
  </div>
</template>

<script>
    export default {
        name: 'YnetCell',
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: [String,Number],
                default: ''
            },
            rightArrow: {
                type: Boolean,
                default: true
            },
            arrowType: {
                type: String,
                default: 'big'
            },
            valueColor: {
                type: String,
                default: 'color666'
            },
            rotate: {
                type: Boolean,
                default: false
            },
            multiRow: {
                type: Boolean,
                default: true
            },
            roundIcon: {
                type: Boolean,
                default: false
            },
            isLink: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                down: false
            };
        },
        computed: {
            valueClass() {}
        },
        beforeMount() {},
        mounted() {},
        methods: {
            cellClick() {
                // this.isLink = true;
                if (this.rotate) this.changeArrow();
                this.$emit('clickCell');
            },
            changeArrow() {
                this.down = !this.down;
            },
            setArrowDown() {
                this.down = false;
            }
        }
    };
</script>

<style lang="scss">
    @import './index.scss';
</style>
