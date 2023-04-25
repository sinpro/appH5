<!--
import { request } from 'http';
    by liyilei 2018.4.11
    change,foucs,blur等和vux的xinput一样，也有debounce。多了一个input事件，可以忽略输入框的格式化逗号
    暂时只有金钱格式化，详情看demo/new_template_demo/input_demo
-->
<template>
  <div class="ynet-input"
@click>
    <label for=""
class="ynet-input__title" :class="{ 'red-star': redStar }">{{ title }}</label>
    <div ref="input-box" class="ynet-input__box" :class="{'pr32':!showClearIcon && !rightIcon && !noClearIcon}" @click="focusFn">
      <slot>
        <!-- <input :type="type" class="ynet-input__input" ref="input" :placeholder="placeholder"
                    :maxlength="max" v-model="currentValue"> -->
        <!--  :class="{ 'color-666': !isRes }" -->
        <input
type="text"
class="ynet-input__box__input" ref="input" :placeholder="placeholder"
               :disabled="disabled"
:maxlength="max" v-model="currentValue" @click.stop
               @input="inputFn"
@onchange="changeFn" @focus="focusFn" @blur="blurFn"
               @keydown="keydownFn"
>
      </slot>
      <i
class="weui-icon-clear ynet-input__box__clear-icon"
:class="{'pr32': !rightIcon}"
         v-show="showClearIcon && !noClearIcon"
@click.stop="clearInput"
></i>
    </div>
    <slot name="rightIcon">
      <img
class="ynet-input__box__right-icon"
v-if="rightIcon" :src="rightIcon"
                @click.stop='clickRightIcon' >
    </slot>
  </div>
</template>

<script>
    import { keydownTest } from './keydownTest';
    import { inputFormat } from './inputFormat';
    export default {
        name: 'YnetInput',
        mixins: [keydownTest, inputFormat],
        props: {
            title: '',
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入金额'
            },
            max: {
                type: Number,
                default: 99
            },
            type: {
                type: String,
                default: 'text'
            },
            format: '',
            redStar: false,
            disabled: false,
            rightIcon: null,
            noClearIcon: false,
            debounce: {
                type: Number,
                default: 500
            },
            minAmount: {
                type: Number,
                default: 0
            },
            maxAmount: {
                type: Number,
                default: 9999999999
            }
        },
        data() {
            return {
                currentValue: '',
                showClearIcon: false,
                timer: null,
                timer2: null,
                // 原生键盘功能
                password: '',
                isNativeKeyBoard: false,
                keyBoardHolder: document.createElement('div')
            };
        },
        computed: {
            isSafety() {
                let isSafety = true;
                if (['number', 'money', 'id_number'].includes(this.$props.type)) {
                    isSafety = false;
                }
                return isSafety;
            },
            isRes() {
                //不是请输入开头就是反显，用666颜色
                return this.placeholder != '请输入' ? false : true;
            }
        },
        watch: {
            value(newVal) {
                this.currentValue = newVal;
            },
            currentValue(newVal) {
                this.$emit('input', newVal);
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    console.log('timer');
                    this.changeFn();
                }, this.debounce);
            }
        },
        created() {
            // this.isNativeKeyBoard = this.$props.type === 'pay_password' ? true : false;
            this.currentValue = this.$props.value;
        },
        methods: {
            clearInput() {
                this.currentValue = '';
                this.$emit('clearIcon');
                this.$refs.input.focus();
            },
            keydownFn(e) {
                // e.returnValue = true;
                this.$emit('on-keydown', this.currentValue);
                // if (this.type == 'int') {
                // this.currentValue = this.currentValue.replace(/[^\d]/g, '');
                // return e.returnValue = false;
                // let pa = new RegExp(/[^0-9]/g);
                // if (pa.test(this.currentValue)) {
                //     return (e.returnValue = false);
                // }
                // }
                // if (this.type == 'money') {
                //     // return keydownFn(e);
                //     this.limitRate(e);
                // }
            },
            changeFn() {
                this.$emit('on-password-change', this.password);
                this.$emit('on-change', this.currentValue);
            },
            inputFn() {
                this.currentValue = this.currentValue.replace(/\s+/g, '');
                console.log(this.currentValue);
                // if (this.currentValue) this.showClearIcon = true;
                this.showClearIcon = this.currentValue != '';
                // this.value = this.currentValue = this.currentValue.replace(/\s+/g, '');
                clearTimeout(this.timer2);
                this.timer2 = setTimeout(() => {
                    this.$emit('on-input', this.currentValue);
                }, this.debounce);
            },
            focusFn() {
                // if (this.disabled) return;
                this.currentValue = this.currentValue.replace(/(\,)|(\s+)/g, '');
                this.showClearIcon = this.currentValue != '';
                if (this.type != 'text') this.nativeFocus();
                // this.$refs.input.focus();
                // if (this.isNativeKeyBoard) {
                //     this.nativeFocus();
                //     // return;
                // } else {
                //     this.currentValue = this.currentValue.replace(/(\,)|(\s+)/g, '');
                //     this.$refs.input.focus();
                // }
                this.$emit('on-focus', this.currentValue);
                // if (this.currentValue) this.showClearIcon = true;
            },
            blurFn(v) {
                this.showClearIcon = false;
                this.$emit('on-blur', this.currentValue);
            },
            clickRightIcon() {
                this.$emit('rightIcon');
            },
            //-----------------------------------------------------------
            nativeFocus() {
                // this.$refs.input.focus();
                // 阻止弹出默认键盘，但输入光标会消失。
                document.activeElement.blur();
                // 监听点击空白区域失焦事件
                document.body.addEventListener('click', this.nativeBlur, false);
                // 监听原生键盘输入事件
                this.$emit('on-native-focus', this.currentValue);
                client.on('inputMsg', this.nativeUpdateValue);

                this.scrollWindow(this.$refs['input-box']);
                if (this.currentValue != '') this.showClearIcon = true;
                client.showKeyboard({
                    maxSize: this.$props.max,
                    type: this.$props.type,
                    curText: this.currentValue
                });
            },
            nativeBlur(isSubmit) {
                document.body.removeEventListener('click', this.nativeBlur);
                client.off('inputMsg', this.nativeUpdateValue);
                this.keyBoardHolder.parentNode && this.keyBoardHolder.parentNode.removeChild(this.keyBoardHolder);
                client.hideKeyboard();
                this.doBlur(isSubmit);
            },
            scrollWindow(element) {
                // 元素距离浏览器窗口顶部的高度 =  元素底部距离body顶部的高度 - 浏览器卷上去的高度
                let eleHeight = element.offsetHeight + this.getElementTop(element);
                let eleOffsetWindowScreenTop = eleHeight - window.pageYOffset;

                // 如果 元素距离浏览器窗口顶部的高度 > 浏览器可视的高度 * 30%，
                let scrollHeight = eleOffsetWindowScreenTop - window.screen.availHeight * 0.48;
                if (scrollHeight > 0) {
                    // 如果 页面的总高度 - (浏览器卷上去的高度 + 浏览器可视的高度)
                    // 即底部可滚动的距离 < 需要滚动的距离
                    // 则需要在底部添加区域块
                    let canScrollHeight = document.body.scrollHeight - (window.pageYOffset + window.screen.availHeight);
                    let holderBlockHeiht = scrollHeight - canScrollHeight;
                    if (holderBlockHeiht > 0) {
                        // this.keyBoardHolder = document.createElement('div');
                        this.keyBoardHolder.style.height = holderBlockHeiht + 'px';
                        document.body.appendChild(this.keyBoardHolder);
                    }

                    // 则滚动到 浏览器可视的高度 * 50% 的位置

                    // window.scrollTo(0, eleHeight - scrollHeight);

                    // 目标高度
                    let targetHeight = window.pageYOffset + scrollHeight;
                    let currentHeight = window.pageYOffset;
                    // 每次偏移高度
                    let scrollPiece = scrollHeight / (200 / 16.7);

                    // 循环滚动，实现动画效果
                    let timer = setInterval(function() {
                        currentHeight = currentHeight + scrollPiece;
                        window.scrollTo(0, currentHeight);

                        // 如果已经超过目标高度，则停止循环
                        if (currentHeight > targetHeight) {
                            clearInterval(timer);
                        }
                    }, 0);
                }
            },
            nativeUpdateValue(e) {
                let data = e.data;
                switch (data.action) {
                    case 'input':
                        this.password = { apin: data.apin, epin: data.epin };
                        if (this.isSafety) {
                            this.currentValue = '●'.repeat(data.len);
                        } else {
                            this.currentValue = data.curText;
                        }
                        this.showClearIcon = this.currentValue != '';
                        break;
                    case 'hide':
                        this.showClearIcon = false;
                        this.nativeBlur();
                        break;
                    case 'finish':
                        this.showClearIcon = false;
                        this.nativeBlur(true);
                        break;
                }
            },
            doBlur(isSubmit) {
                if (this.format == 'money' && this.currentValue) {
                    this.currentValue = this._formatMoney(this.currentValue);
                }
                if (this.format == 'phoneNum') {
                    this.currentValue = this._formatPhone(this.currentValue);
                }
                if (this.format == 'bankCard') {
                    this.currentValue = this._formatBankCard(this.currentValue);
                }
                // alert(JSON.stringify(isSubmit))
                this.showClearIcon = false;
                this.$emit('on-native-blur', this.currentValue, isSubmit);
            },
            getElementTop(element) {
                let actualTop = element.offsetTop;
                let current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            }
        }
    };
</script>

<style lang="scss">
    @import './index.scss';
</style>
