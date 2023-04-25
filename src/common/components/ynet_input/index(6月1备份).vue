<!--
    update by liyilei 2018.5.9
    change,foucs,blur等和vux的xinput一样，也有debounce。多了一个input事件，可以忽略输入框的格式化逗号
    暂时只有金钱格式化，详情看demo/new_template_demo/input_demo
-->
 <!--   原生键盘：
       0 加密可切换数字键盘 safety_number
       1 加密不可切换数字键盘 safety_pay
       2 加密英文键盘 小写 safety_text
       3 加密英文键盘 大写 safety_upper_text
       4 加密符号键盘 safety_symbol
       5 普通数字键盘 number
       6 金额数字键盘 带点号 money
       7 身份证数字键盘 带X id_number
        -->
<template>
  <div class="ynet-input"
@click.stop>
    <label for=""
class="ynet-input__title" :class="{ 'red-star': redStar }">{{ title }}</label>
    <div ref="input-box" class="ynet-input__box" :class="{'pr32':!showClearIcon && !rightIcon && !noClearIcon}" @click="focusFn">
      <slot>
        <!-- <input :type="type" class="ynet-input__input" ref="input" :placeholder="placeholder"
                                        :maxlength="max" v-model="currentValue"> -->
        <!--  :class="{ 'color-666': !isRes }" -->
        <input
type="text"
class="ynet-input__box__input " :id="uuid" :style="leftInput ? 'text-align: left;' : ''"
               :class="isRes"
ref="input" :placeholder="placeholder" :disabled="disabled"
               :maxlength="max"
v-model="currentValue" @click.stop @input="inputFn"
               @onchange="changeFn"
@focus.stop="focusFn" @blur="blurFn" @keydown="keydownFn"
               @keyup="keyupFn"
>
      </slot>
      <div class="ynet-input__mask"
@touchstart.prevent v-show="virtualMask && type !=='text'">
        <div class="ynet-input__mask__blank">
{{ currentValue }}
</div>
        <span :class="cursorColor"
@touchstart.prevent.stop v-show="showCursor && leftInput"/>
      </div>
      <span :class="cursorColor"
@touchstart.prevent.stop v-show="showCursor && !leftInput"/>
      <i
class="weui-icon-clear ynet-input__box__clear-icon"
:class="{'pr32': !rightIcon}"
         @click="clearInput"
v-show="showClearIcon && !noClearIcon"
></i>
    </div>
    <slot name="rightIcon">
      <img
class="ynet-input__right-icon"
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
            title: ,
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            max: {
                type: Number,
                default: 99
            },
            type: {
                type: String,
                default: 'text'
            },
            format: ,
            redStar: false,
            disabled: false,
            rightIcon: null,
            noClearIcon: false,
            debounce: {
                type: Number,
                default: 500
            },
            leftInput: false,
            isVerify: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                uuid: Math.random()
                    .toString(36)
                    .substring(3, 8),
                currentValue: '',
                isRes: 'is-res',
                temp: 0,
                showClearIcon: false,
                showCursor: false,
                timer: null,
                timer2: null,
                blankTimes: 0,
                //用来控制格式化启动否，因为最后一位是空格不进行格式化
                noSpacing: 0,
                // 原生键盘功能
                virtualMask: false,
                password: '',
                verifyResult: null,
                isNativeKeyBoard: false,
                keyBoardHolder: document.createElement('div')
            };
        },
        computed: {
            isSafety() {
                return !['number', 'money', 'id_number', 'text', 'h5_number'].includes(this.$props.type);
            },
            cursorColor() {
                return {
                    'cursor-ios': client.device.os == 'ios' ? true : false,
                    'cursor-android': client.device.os == 'ios' ? false : true,
                    'blink-ios': client.device.os == 'ios' ? true : false,
                    'blink-android': client.device.os == 'ios' ? false : true
                };
            }
        },
        watch: {
            value(newVal) {
                this.currentValue = newVal;
            },
            currentValue(newVal) {
                this.temp++;
                if (this.temp === 2) this.isRes = '';
                this.$emit('input', newVal);
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
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
                this.$emit('clearIcon');
                this.blankTimes = 0;
                this.showClearIcon = false;
                if (this.type != 'text' && this.isSafety) this.showNativeBoard(1);
                else this.password = this.currentValue = '';
                if (this.type === 'text' || this.type === 'h5_number') this.$refs.input.focus();
            },
            keydownFn(e) {
                // if (this.format === 'bankCard') this.limitBankCard(e);
                // alert(JSON.stringify(e.keyCod));
                this.noSpacing = e.keyCode == '8' ? 1 : 0;
                this.$emit('on-keydown', this.currentValue);
            },
            keyupFn() {
                this.$emit('on-keyup', this.currentValue);
            },
            changeFn() {
                this.$emit('on-password-change', this.password);
                this.$emit('on-change', this.currentValue);
            },
            inputFn(e) {
                // this.currentValue = this.currentValue.replace(/\s+/g, '');
                if (this.type === 'h5_number' && this.noSpacing == 0) {
                    this.currentValue = this.currentValue.replace(/\D/g, '');
                    this.currentValue = this._formatBankCard(this.currentValue);
                }
                this.showClearIcon = this.currentValue != '';
                clearTimeout(this.timer2);
                this.timer2 = setTimeout(() => {
                    this.$emit('on-input', this.currentValue);
                }, this.debounce);
                // if (this.format === 'bankCard') {
                //     this.currentValue = this._formatBankCard(this.currentValue.replace(/\s+/g, ''));
                // }
            },
            focusFn() {
                if (window.currentInputId === this.$refs.input.id) {
                    // document.activeElement.blur();
                    this.$refs.input.blur();
                    this.showClearIcon = this.currentValue != '';
                    return;
                }
                this.isRes = '';
                if (window.nativeKeyboradCancel) {
                    window.nativeKeyboradCancel();
                }

                this.currentValue = this.currentValue.replace(/(\,)|(\.00)/g, '');
                this.showClearIcon = this.currentValue != '';
                if (this.type !== 'text' && this.type !== 'h5_number') this.nativeFocus();
                this.$emit('on-focus', this.currentValue);
            },
            blurFn() {
                this.showClearIcon = false;
                this.$emit('on-blur', this.currentValue);
                if (this.type === 'text' || this.type === 'h5_number') this.backResColor();
            },
            clickRightIcon() {
                this.$emit('rightIcon');
            },
            justClearInput() {
                //仅清除内容
                this.currentValue = this.password = '';
                this.blankTimes = 0;
            },
            backResColor() {
                if (this.temp < 2) this.isRes = 'is-res';
            },
            //-----------------------------------------------------------
            showNativeBoard(resetVal) {
                if (!window.currentInputId) window.currentInputId = this.$refs['input'].id;
                else {
                    window.preInputId = window.currentInputId;
                    window.currentInputId = this.$refs['input'].id;
                }
                this.virtualMask = true;
                let _val;
                if (resetVal == 1 || this.isSafety) {
                    this.currentValue = _val = '';
                    this.showClearIcon = this.currentValue != '';
                } else _val = this.currentValue;

                client.showKeyboard({
                    maxSize: this.$props.max,
                    type: this.$props.type,
                    curText: _val,
                    isVerify: this.$props.isVerify
                });
                this.showCursor = true;
            },
            nativeFocus() {
                // window.nativeKeyboradCancel = () => {
                // window.currentInputId = window.currentInputId ? window.currentInputId : this.uuid
                //     this.nativeBlur();
                // };
                if (!window.nativeKeyboradCancel)
                {window.nativeKeyboradCancel = () => {
                    this.nativeBlur();
                };}

                // this.$refs.input.focus();
                // 阻止弹出默认键盘，但输入光标会消失。
                document.activeElement.blur();

                // 监听点击空白区域失焦事件
                document.addEventListener('click', this.nativeBlur, false);
                // 监听原生键盘输入事件
                this.$emit('on-native-focus', this.currentValue);
                client.on('inputMsg', this.nativeUpdateValue);
                if (this.currentValue != '') this.showClearIcon = true;
                // this.showCursor = true;
                // window.showNativeBoard = () => {
                //     this.showNativeBoard();
                // };
                // setTimeout(() => {
                this.showNativeBoard();
                this.scrollWindow(this.$refs['input-box']);
                // }, 300);
            },
            nativeBlur(isSubmit) {
                this.showClearIcon = false;
                this.showCursor = false;
                window.currentInputId = '';
                window.nativeKeyboradCancel = '';
                this.keyBoardHolder.parentNode && this.keyBoardHolder.parentNode.removeChild(this.keyBoardHolder);
                client.hideKeyboard();
                this.virtualMask = false;
                document.removeEventListener('click', this.nativeBlur);
                client.off('inputMsg', this.nativeUpdateValue);
                // this.doBlur(isSubmit);
                if (this.format === 'money' && this.currentValue) this.currentValue = this._formatMoney(this.currentValue);

                if (this.$props.isVerify) {
                    this.$emit('on-verify', this.verifyResult);
                }
                this.$emit('on-native-blur', this.currentValue, isSubmit);
                this.backResColor();
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
            updateVal__Input(data) {
                if (this.isSafety) {
                    this.password = { apin: data.apin, epin: data.epin, randomStr: data.randomStr };
                    this.currentValue = '●'.repeat(data.len);
                } else {
                    // ===/\.(\S{0,})\./.test(this.currentValue)===
                    if (this.$props.type === 'money' && this.currentValue.indexOf('.') > -1 && data.curText === '.') return;
                    // let this.noSpacing;
                    this.blankTimes = this.currentValue.split(/\s|-/).length - 1 + this.$props.max;
                    if (data.curText === 'DEL') {
                        if (this.currentValue.length > 0) this.currentValue = this.currentValue.slice(0, -1);
                        if (this.format === 'safetyShow') this.password = this.password.slice(0, -1);
                        this.blankTimes -= 1;
                        this.noSpacing = 1;
                    } else {
                        this.noSpacing = 0;
                        if (!(this.currentValue.length >= this.blankTimes) || this.currentValue == '') {
                            if (this.format === 'safetyShow') {
                                this.password += data.curText;
                                this.currentValue = '●'.repeat(this.password.length);
                            } else this.currentValue += data.curText;
                        }
                    }
                    if (this.format === 'MMYY') this.currentValue = this.limitMMYY(this.currentValue, this.noSpacing);
                    if (this.format === 'phoneNum')
                    {this.currentValue = this._formatPhone(this.currentValue, this.noSpacing);}
                    if (this.format === 'bankCard')
                    {this.currentValue = this._formatBankCard(this.currentValue, this.noSpacing);}
                    // this.currentValue = data.curText;
                }
                if (this.isVerify) this.verifyResult = data.complexFlag;

                this.showClearIcon = this.currentValue != '';
            },
            nativeUpdateValue(e) {
                let data = e.data;
                // const doneDispose = () => {
                //     this.showClearIcon = false;
                //     this.showCursor = false;
                //     window.currentInputId = '';
                // };
                switch (data.action) {
                    case 'input':
                        this.updateVal__Input(data);
                        break;
                    case 'hide':
                        // doneDispose();
                        this.nativeBlur();
                        break;
                    case 'finish':
                        // doneDispose();
                        this.nativeBlur(true);
                        break;
                }
            },
            //这个函数没用了
            // doBlur(isSubmit) {
            //     if (this.format === 'money' && this.currentValue) this.currentValue = this._formatMoney(this.currentValue);

            //     if (this.format === 'phoneNum') this.currentValue = this._formatPhone(this.currentValue);

            //     // if (this.format == 'bankCard') {
            //     //     this.currentValue = this._formatBankCard(this.currentValue);
            //     // }
            //     if (this.$props.isVerify) this.$emit('on-verify', this.verifyResult);

            //     this.backResColor();
            //     this.showClearIcon = false;
            //     this.$emit('on-native-blur', this.currentValue, isSubmit);
            // },
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
