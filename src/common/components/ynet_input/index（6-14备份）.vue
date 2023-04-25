<!--
    update by liyilei 2018.6.4
    设有debounce，默认500ms。
    rightIcon用来显示最右边icon，必须传入:rightIcon="requrie('...')"，监听rightIcon获取点击事件，或利用rightIcon写入ICON，样式自己写
    :leftInput="true",左边起输入。
    只有金钱、手机电话号、身份证或卡号、日期格式化，format为 money、phoneNum、bankCard、MMYY，进入焦点自动取消格式化
    format="safetyShow"，密文显示，并没加密，监听on-password-change获取password。
    小功能自己查看props。
    监听值的变化：on-change,on-input，无效就用另一个；
    原生键盘的监听失去和进入焦点：on-native-blur，on-native-focus;
    H5键盘能监听：on-focus,on-blur,on-keyup，on-keydown。
    详情看demo/new_template_demo/input_demo

      原生键盘，type传入：
       0 加密可切换数字键盘 safety_number
       1 加密不可切换数字键盘 safety_pay
       2 加密英文键盘 小写 safety_text
       3 加密英文键盘 大写 safety_upper_text
       4 加密符号键盘 safety_symbol
       5 普通数字键盘 number
       6 金额数字键盘 带点号 money
       7 身份证数字键盘 带X id_number
       输入卡号太长会被隐藏，只能用H5键盘，传 h5_number，简直非数字输入
        -->
<template>
  <div class="ynet-input"
@click.stop>
    <label for=""
class="ynet-input__title" :class="{ 'red-star': redStar }">{{ title }}
      <span class="ynet-cell__icon">
        <slot name="titleTip"/>
      </span>
    </label>
    <div ref="input-box" class="ynet-input__box" :class="{'pr32':!showClearIcon && !rightIcon && !noClearIcon}">
      <slot>
        <input
type="text"
fastfocus="true" name="ynet-input" :id="uuid"
                    class="ynet-input__box__input " :style="leftInput ? 'text-align: left;' : ''" ref="input"
                    :class="isRes" :placeholder="placeholder" :disabled="disabled" v-model="currentValue"
                    :maxlength="max" @input="inputFn" @onchange="changeFn" @focus="fastfocusFn"
               @blur="blurFn"
@keydown="keydownFn" @keyup="keyupFn"
>
        <div
@click="focusFn"
v-if="this.type !== 'text' && this.type !== 'h5_number'"
             class="ynet-input__box__mask"
></div>
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
    import { inputFormat } from './inputFormat';
    export default {
        name: 'YnetInput',
        mixins: [inputFormat],
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
                //判断是不是反显，用来改变颜色
                isRes: 'is-res',
                //记录第几次改变输入值
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
            // 是否为调用客户端键盘
            isSafety() {
                return !['number', 'money', 'id_number', 'text', 'h5_number'].includes(this.$props.type);
            },
            // 光标样式
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
                // clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.changeFn();
                }, 10);
            }
        },
        created() {
            this.currentValue = this.$props.value;
        },
        methods: {
            // 清除内容方法
            clearInput() {
                this.$emit('clearIcon');
                this.blankTimes = 0;
                this.showClearIcon = false;
                if (this.type != 'text' && this.isSafety) this.showNativeBoard(1);
                else this.password = this.currentValue = '';
                if (this.type === 'text' || this.type === 'h5_number') this.$refs.input.focus();
            },
            // 键盘按下触发事件
            keydownFn(e) {
                // client.debug('keydown');
                this.noSpacing = e.keyCode == '8' ? 1 : 0;
                this.$emit('on-keydown', this.currentValue);
            },
            // 键盘离开触发事件
            keyupFn() {
                // client.debug('keyup');
                this.$emit('on-keyup', this.currentValue);
            },
            // 输入内容改变事件
            changeFn() {
                this.$emit('on-password-change', this.password);
                this.$emit('on-change', this.currentValue);
            },
            // 当元素获得用户输入时运行的脚本。
            inputFn(e) {
                // client.debug('用户输入时运行的脚本');
                if (this.type === 'h5_number' && this.noSpacing == 0) {
                    this.currentValue = this.currentValue.replace(/\D/g, '');
                    this.currentValue = this._formatBankCard(this.currentValue);
                }
                this.showClearIcon = this.currentValue != '';
                // clearTimeout(this.timer2);
                // this.timer2 = setTimeout(() => {
                this.$emit('on-input', this.currentValue);
                // }, this.debounce);
            },
            fastfocusFn() {
                this.hideKeyBoardHolder();
                //this.$refs.input.focus();
            },
            // 当元素获得焦点时运行的脚本。
            focusFn() {
                // this.$refs.input.focus(); // 用click事件触发入焦事件
                if (window.currentInputId === this.$refs.input.id) {
                    // document.activeElement.blur();
                    // this.$refs.input.blur();
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
            // 元素失去焦点时运行的脚本。
            blurFn() {
                this.showClearIcon = false;
                this.showCursor = false;
                this.virtualMask = false;
                this.$emit('on-blur', this.currentValue);
                if (this.type === 'text' || this.type === 'h5_number') this.backResColor();
            },
            // 点击右边插槽图片触发事件
            clickRightIcon() {
                if (window.nativeKeyboradCancel) window.nativeKeyboradCancel(); // 当点击右边插槽图标时会跳转或者触发其他方法，需要执行此方法主动去失焦
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
            // 调起原生键盘逻辑
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
            // 系统键盘调起阻止
            nativeFocus() {
                if (!window.nativeKeyboradCancel)
                {window.nativeKeyboradCancel = () => {
                    this.nativeBlur();
                };}
                // 阻止弹出默认键盘，但输入光标会消失。
                document.activeElement.blur();

                // 监听点击空白区域失焦事件
                document.addEventListener('click', this.hideKeyBoardHolder, false);
                // 监听原生键盘输入事件
                this.$emit('on-native-focus', this.currentValue);
                client.on('inputMsg', this.nativeUpdateValue);
                if (this.currentValue != '') this.showClearIcon = true;
                this.showNativeBoard();
                this.scrollWindow(this.$refs['input-box']);
            },
            hideKeyBoardHolder(isSubmit) {
                let holderBlockHeihtDOM = document.getElementsByClassName('holderBlockHeiht');
                let isDOM = holderBlockHeihtDOM.length;
                if (isDOM) document.body.removeChild(holderBlockHeihtDOM[0]);
                //this.keyBoardHolder.parentNode && this.keyBoardHolder.parentNode.removeChild(this.keyBoardHolder);
                // this.nativeBlur(isSubmit);
                if (window.nativeKeyboradCancel) {
                    window.nativeKeyboradCancel();
                }
            },
            nativeBlur(isSubmit) {
                // client.debug('失焦');
                this.showClearIcon = false;
                this.showCursor = false;
                window.currentInputId = '';
                window.nativeKeyboradCancel = '';

                this.virtualMask = false;
                client.hideKeyboard();
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
                let scrollHeight = eleOffsetWindowScreenTop - window.screen.availHeight * 0.4;
                if (scrollHeight > 0) {
                    // 如果 页面的总高度 - (浏览器卷上去的高度 + 浏览器可视的高度)
                    // 即底部可滚动的距离 < 需要滚动的距离
                    // 则需要在底部添加区域块
                    let canScrollHeight = document.body.scrollHeight - (window.pageYOffset + window.screen.availHeight);
                    let holderBlockHeiht = scrollHeight - canScrollHeight;
                    let isDOM = document.getElementsByClassName('holderBlockHeiht').length;
                    if (holderBlockHeiht > 0 && !isDOM) {
                        // this.keyBoardHolder = document.createElement('div');
                        this.keyBoardHolder.classList.add('holderBlockHeiht');
                        this.keyBoardHolder.style.height = window.screen.availHeight * 0.4 + 'px';
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
                switch (data.action) {
                    case 'input':
                        this.updateVal__Input(data);
                        break;
                    case 'hide':
                        // doneDispose();
                        this.hideKeyBoardHolder();
                        break;
                    case 'finish':
                        // doneDispose();
                        this.hideKeyBoardHolder(true);
                        break;
                }
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
        },
        pause() {
            this.hideKeyBoardHolder();
        }
    };
</script>

<style lang="scss">
    @import './index.scss';
</style>
