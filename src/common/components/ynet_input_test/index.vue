<template>
  <div class="my_input"
@click.stop>
    <div
      class="my_input_box"
      ref="input-box"
    >
      <slot>
        <input
          type="text"
          fastfocus="true"
          name="ynet-input"
          class="my_input_element"
          :id="uuid"
          :class="isRes"
          :style="
            (leftInput ? 'text-align: left;' : '',
            virtualMask ? 'color: transparent' : 'color: #333')
          "
          ref="input"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="max"
          v-model="currentValue"
          @input="inputFn"
          @onchange="changeFn"
          @focus="fastfocusFn"
          @blur.native="blurFn"
          @keydown="keydownFn"
          @keyup="keyupFn"
        />
        <div
          @click="focusFn"
          v-if="type !== 'text' && type !== 'h5_number'"
          class="my_input_element_mask"
        ></div>
      </slot>
      <div
        class="my_input_mask"
        :style="
          rightIcon
            ? 'padding-right: 0.4rem;'
            : 'padding-right: 0.7rem;'
        "
        @touchstart.prevent
        v-show="virtualMask && type !== 'text'"
      >
        <!-- 当为格式化字符串时不作处理，否则添加属性rtl控制输入方向 -->
        <div
          v-html="maskValue ? maskValue : currentValue"
          class="my_input_mask_value"
        ></div>

        <span
          :class="cursorColor"
          @touchstart.prevent.stop
          v-show="showCursor && leftInput"
        ></span>
      </div>
      <span
        :class="cursorColor"
        @touchstart.prevent.stop
        v-show="showCursor && !leftInput"
      ></span>
      <i
        class="weui-icon-clear"
        @click.stop="clearInput"
        v-show="showClearIcon && !noClearIcon"
      ></i>
    </div>
    <slot name="rightIcon">
      <img
        class="ynet-input__right-icon"
        v-if="rightIcon"
        @click.stop="clickRightIcon"
        :src="rightIcon"
      />
    </slot>
  </div>
</template>

<script>
    import { inputFormat } from './inputFormat'

    export default {
        name: 'YnetInput',
        mixins: [inputFormat],
        props: {
            title: '',
            value: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '请输入',
            },
            max: {
                type: Number,
                default: 99,
            },
            type: {
                type: String,
                default: 'text',
            },
            format: '',
            redStar: false,
            disabled: false,
            rightIcon: null,
            noClearIcon: false,
            debounce: {
                type: Number,
                default: 500,
            },
            leftInput: false,
            isVerify: {
                type: Boolean,
                default: false,
            },
            maskValue: {
                type: String,
            },
            isEncry: {
                type: Boolean,
                default: false,
            },
            randomKey: {
                type: String,
            },
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
                keyBoardHolder: document.createElement('div'),
                maskCurrentValue: '',
                valueObj: {},
            }
        },

        computed: {
            // 是否为调用加密类客户端键盘,在该数组中的类型则为非调用安全类键盘。
            isSafety() {
                return !(
                    ['number', 'money', 'id_number', 'text', 'h5_number'].indexOf(
                        this.$props.type
                    ) > -1
                )
            },
            // 是否为调起客户端键盘
            isShowNativeBoard() {
                return !(
                    [
                        'number',
                        'money',
                        'id_number',
                        'safety_number',
                        'safety_pay',
                        'safety_text',
                        'safety_upper_text',
                        'safety_symbol',
                        'pay_password',
                    ].indexOf(this.$props.type) > -1
                )
            },
            // 光标样式
            cursorColor() {
                return {
                    'cursor-ios': app.device.os == 'ios' ? true : false,
                    'cursor-android': app.device.os == 'ios' ? false : true,
                    'blink-ios': app.device.os == 'ios' ? true : false,
                    'blink-android': app.device.os == 'ios' ? false : true,
                }
            },
        },

        watch: {
            value(newVal) {
                this.currentValue = newVal
            },
            currentValue(newVal) {
                this.temp++
                if (this.temp === 2) this.isRes = ''
                // 如果是有格式化的类型的 则做绑定格式化
                if (this.maskCurrentValue) {
                    this.maskCurrentValue = this._formatBankCardReg(
                        this.currentValue
                    )
                }
                this.$emit('input', newVal)
                // clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.changeFn()
                }, 10)
            },
        },

        created() {
            this.currentValue = this.$props.value
            if (this.$props.type == 'money' && this.$props.max != 99) {
                // this.$props.max = 16;
            }
        },

        methods: {
            // 清除内容方法
            clearInput() {
                this.$emit('clearIcon')
                this.blankTimes = 0
                this.showClearIcon = false
                // 因为原生会记录点击的值 所以当按清空按钮时也应当清除所有的值
                if (this.type != 'text' && !this.isShowNativeBoard) {
                    this.showNativeBoard(1)
                } else {
                    this.password = this.currentValue = ''
                    this.maskCurrentValue = ''
                }
                if (this.type === 'text' || this.type === 'h5_number')
                    this.$refs.input.focus()
            },
            // 键盘按下触发事件
            keydownFn(e) {
                // client.debug('keydown');
                this.noSpacing = e.keyCode == '8' ? 1 : 0
                if (e.keyCode == '13') {
                    document.activeElement.blur()
                }
                this.$emit('on-keydown', this.currentValue)
            },
            // 键盘离开触发事件
            keyupFn() {
                // client.debug('keyup');
                this.$emit('on-keyup', this.currentValue)
            },
            // 输入内容改变事件
            changeFn(e) {
                this.$emit('on-change', this.currentValue)
                this.$emit('on-change-verify', this.password, this.verifyResult)
            },
            // 当元素获得用户输入时运行的脚本。
            inputFn(e) {
                // client.debug('用户输入时运行的脚本');
                if (this.type === 'h5_number' && this.noSpacing == 0) {
                    this.currentValue = this.currentValue.replace(/\D/g, '')
                    this.currentValue = this._formatBankCard(this.currentValue)
                }
                this.showClearIcon = this.currentValue != ''
                // clearTimeout(this.timer2);
                // this.timer2 = setTimeout(() => {
                this.$emit('on-input', this.currentValue)
                // }, this.debounce);
            },

            fastfocusFn() {
                if (this.currentValue) {
                    this.showClearIcon = true
                }

                this.clearKeyboradHolder()

                if (this.type === 'text' || this.type === 'h5_number') {
                    this.$emit('on-focus', this.currentValue)
                }
            },

            focusFn() {
                // 假如禁用的时候不触发入焦事件。
                if (this.$props.disabled) {
                    return
                }
                if (window.currentInputId === this.$refs.input.id) {
                    this.showClearIcon = this.currentValue != ''
                    return
                }
                this.isRes = ''
                if (window.nativeKeyboradCancel) {
                    window.nativeKeyboradCancel()
                }

                this.currentValue = this.currentValue.replace(/(\,)|(\.00)/g, '')
                this.showClearIcon = this.currentValue != ''
                if (this.$props.format == 'bankCard' && this.currentValue) {
                    this.maskCurrentValue = this._formatBankCardReg(
                        this.currentValue,
                        this.noSpacing
                    )
                }
                if (this.type !== 'text' && this.type !== 'h5_number')
                    this.nativeFocus()
                this.$emit('on-focus', this.currentValue)
            },
            // 元素失去焦点时运行的脚本。
            blurFn() {
                this.showClearIcon = false
                this.showCursor = false
                this.virtualMask = false
                this.$emit('on-blur', this.currentValue)
                if (this.type === 'text' || this.type === 'h5_number')
                    this.backResColor()
            },
            // 点击右边插槽图片触发事件
            clickRightIcon() {
                this.$emit('rightIcon')
            },
            justClearInput() {
                //仅清除内容
                this.currentValue = this.password = ''
                this.blankTimes = 0
            },
            backResColor() {
                if (this.temp < 2) this.isRes = 'is-res'
            },

            // 调起原生键盘逻辑
            showNativeBoard(resetVal) {
                if (!window.currentInputId)
                    window.currentInputId = this.$refs['input'].id
                else {
                    window.preInputId = window.currentInputId
                    window.currentInputId = this.$refs['input'].id
                }
                this.virtualMask = true
                let _val
                if (resetVal == 1) {
                    this.password = this.currentValue = _val = ''
                    this.showClearIcon = this.currentValue != ''
                } else _val = this.currentValue

                const keyboardType = this.$props.type === 'number' ? '1' : '0'
                this.currentValue = ''
                this.$emit('on-password-change', {})
                app.api.showKeyboard({
                    max: this.$props.max,
                    isEncry: this.$props.isEncry,
                    randomKey: this.$props.randomKey,
                    keyboardType,
                }, res => {
                    if (res.action !== 'hide') {
                        this.currentValue = res.value
                        this.valueObj = res
                        this.$emit('on-password-change', res)
                    } else {
                        this.showClearIcon = false;
                        this.showCursor = false;
                        document.documentElement.click();
                    }
                })
                this.showCursor = true
            },
            nativeFocus() {
                if (!window.nativeKeyboradCancel) {
                    window.nativeKeyboradCancel = () => {
                        this.nativeBlur()
                    }
                }

                // 阻止弹出默认键盘，但输入光标会消失。
                document.activeElement.blur()

                // 监听点击空白区域失焦事件
                document.addEventListener('click', this.clearKeyboradHolder, false)

                // 监听原生键盘输入事件
                this.$emit('on-native-focus', this.currentValue)

                app.on('inputMsg', this.nativeUpdateValue)

                if (this.currentValue != '') this.showClearIcon = true
                this.showNativeBoard()
                this.scrollWindow(this.$refs['input-box'])
            },

            nativeBlur(isSubmit) {
                // client.debug('失焦');
                this.showClearIcon = false
                this.showCursor = false
                window.currentInputId = ''
                window.nativeKeyboradCancel = ''
                // this.keyBoardHolder.parentNode && this.keyBoardHolder.parentNode.removeChild(this.keyBoardHolder);
                this.virtualMask = false
                app.api.hideKeyboard()
                document.removeEventListener('click', this.nativeBlur)
                app.off('inputMsg', this.nativeUpdateValue)
                // this.doBlur(isSubmit);
                if (this.format === 'money' && this.currentValue) {
                    this.currentValue = this._formatMoney(this.currentValue)
                }

                if (this.$props.isVerify) {
                    this.$emit('on-verify', this.verifyResult)
                }
                this.$emit('on-native-blur', this.currentValue, isSubmit)
                this.$emit('on-password-blur', this.valueObj)
                this.valueObj = {}
                this.backResColor()
            },
            scrollWindow(element) {
                // 元素距离浏览器窗口顶部的高度 =  元素底部距离body顶部的高度 - 浏览器卷上去的高度
                let eleHeight = element.offsetHeight + this.getElementTop(element)
                let eleOffsetWindowScreenTop = eleHeight - window.pageYOffset

                // 如果 元素距离浏览器窗口顶部的高度 > 浏览器可视的高度 * 30%，
                let scrollHeight =
                    eleOffsetWindowScreenTop - window.screen.availHeight * 0.4
                if (scrollHeight > 0) {
                    // 如果 页面的总高度 - (浏览器卷上去的高度 + 浏览器可视的高度)
                    // 即底部可滚动的距离 < 需要滚动的距离
                    // 则需要在底部添加区域块
                    let canScrollHeight =
                        document.body.scrollHeight -
                        (window.pageYOffset + window.screen.availHeight)
                    let holderBlockHeiht = scrollHeight - canScrollHeight
                    let isDOM = document.getElementsByClassName('holderBlockHeiht')
                        .length
                    if (holderBlockHeiht > 0 && !isDOM) {
                        // this.keyBoardHolder = document.createElement('div');
                        this.keyBoardHolder.classList.add('holderBlockHeiht')
                        this.keyBoardHolder.style.height =
                            window.screen.availHeight * 0.4 + 'px'
                        document.body.appendChild(this.keyBoardHolder)
                    }

                    // 则滚动到 浏览器可视的高度 * 50% 的位置

                    // window.scrollTo(0, eleHeight - scrollHeight);

                    // 目标高度
                    let targetHeight = window.pageYOffset + scrollHeight
                    let currentHeight = window.pageYOffset
                    // 每次偏移高度
                    let scrollPiece = scrollHeight / (200 / 16.7)

                    // 循环滚动，实现动画效果
                    let timer = setInterval(function() {
                        currentHeight = currentHeight + scrollPiece
                        window.scrollTo(0, currentHeight)

                        // 如果已经超过目标高度，则停止循环
                        if (currentHeight > targetHeight) {
                            clearInterval(timer)
                        }
                    }, 0)
                }
            },
            repeat(ch, len) {
                let ret = ''
                for (let i = 0; i < len; i++) {
                    ret += ch
                }
                return ret
            },
            updateVal__Input(data) {
                if (this.isSafety) {
                    this.password = {
                        apin: data.apin,
                        epin: data.epin,
                        randomStr: data.randomStr,
                    }
                    this.currentValue = this.repeat('●', data.len)
                } else {
                    // ===/\.(\S{0,})\./.test(this.currentValue)===
                    if (
                        this.$props.type === 'money' &&
                        this.currentValue.indexOf('.') > -1 &&
                        data.curText === '.'
                    )
                        return
                    // let this.noSpacing;
                    this.blankTimes =
                        this.currentValue.split(/\s|-/).length - 1 + this.$props.max

                    if (data.curText === 'DEL') {
                        if (this.currentValue.length > 0)
                            this.currentValue = this.currentValue.slice(0, -1)
                        if (this.format === 'safetyShow')
                            this.password = this.password.slice(0, -1)
                        this.blankTimes -= 1
                        this.noSpacing = 1
                    } else {
                        this.noSpacing = 0
                        if (
                            !(this.currentValue.length >= this.blankTimes) ||
                            this.currentValue == ''
                        ) {
                            if (this.format === 'safetyShow') {
                                this.password += data.curText
                                this.currentValue = this.repeat(
                                    '●',
                                    this.password.length
                                )
                            } else this.currentValue += data.curText
                        }
                    }
                    if (this.format === 'MMYY')
                        this.currentValue = this.limitMMYY(
                            this.currentValue,
                            this.noSpacing
                        )
                    if (this.format === 'phoneNum') {
                        this.currentValue = this._formatPhone(
                            this.currentValue,
                            this.noSpacing
                        )
                    }
                    if (this.format === 'bankCard') {
                        this.maskCurrentValue = this._formatBankCardReg(
                            this.currentValue,
                            this.noSpacing
                        )
                        this.currentValue = this._formatBankCard(
                            this.currentValue,
                            this.noSpacing
                        )
                    }
                    // this.currentValue = data.curText;
                }
                if (this.isVerify) this.verifyResult = data.complexFlag

                this.showClearIcon = this.currentValue != ''
            },
            nativeUpdateValue(e) {
                let data = e.data
                switch (data.action) {
                    case 'input':
                        this.updateVal__Input(data)
                        break
                    case 'hide':
                        // doneDispose();
                        this.clearKeyboradHolder()
                        break
                    case 'finish':
                        // doneDispose();
                        this.clearKeyboradHolder(true)
                        break
                }
            },
            // 主动失焦操作，以及删除滚动距离不够而创建的div元素
            clearKeyboradHolder() {
                let holderBlockHeihtDOM = document.getElementsByClassName(
                    'holderBlockHeiht'
                )
                let isDOM = holderBlockHeihtDOM.length
                if (isDOM) document.body.removeChild(holderBlockHeihtDOM[0])
                //this.keyBoardHolder.parentNode && this.keyBoardHolder.parentNode.removeChild(this.keyBoardHolder);
                if (window.nativeKeyboradCancel) {
                    window.nativeKeyboradCancel()
                }
            },
            getElementTop(element) {
                let actualTop = element.offsetTop
                let current = element.offsetParent
                while (current !== null) {
                    actualTop += current.offsetTop
                    current = current.offsetParent
                }
                return actualTop
            },
            // 父组件触发原生键盘方法
            parentShowkeyboard() {
                setTimeout(() => {
                    this.focusFn()
                }, 100)
            },
        },

        pause() {
            this.clearKeyboradHolder()
        },
    }
</script>

<style lang="scss">
.my_input {
    margin: 0 .32rem;
    height: .97rem;
    border-bottom: .01rem solid #dfdfdf;
    display: flex;

    .my_input_box {
        flex: 1;
        overflow: hidden;
        line-height: .96rem;
        position: relative;
        display: flex;

        .my_input_element {
            flex: 1;
            height: .96rem;
            color: #333;
            font-size: .32rem;
            line-height: .48rem;
            &::-webkit-input-placeholder {
                color: #bbb;
                font-size: .32rem;
            }
        }

        .my_input_element_mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: .96rem;
        }
    }

    .weui-icon-clear {
        float: right;
        vertical-align: top;
        font-size: .36rem;
        color: #bbb;
        position: relative;
        z-index: 20;
    }

    .my_input_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: .96rem;
        align-items: center;
        z-index: 10;
        box-sizing: border-box;
        color: #333;
        font-size: .32rem;
        display: flex;

        .cursor-android {
            height: 0.38rem;
            width: 1px;
            z-index: 12;
            flex-grow: 0;
            -webkit-flex-grow: 0;
            padding-right: 1px;
            align-items: center;
            box-sizing: border-box;
        }

        .cursor-ios {
            height: 0.46rem;
            width: 2px;
            z-index: 12;
            flex-grow: 0;
            padding-right: 1px;
            -webkit-flex-grow: 0;
            align-items: center;
            box-sizing: border-box;
        }

        .cursor-blink-android {
            animation-name: cursor-blink-android;
        }

        .blink-android {
            animation: cursor-blink-android 1s steps(1, start) infinite ;
            -webkit-animation: cursor-blink-android steps(1, start) 1s infinite ;
            -o-animation: cursor-blink-android 1s steps(1, start) infinite ;
            -moz-animation: cursor-blink-android 1s steps(1, start) infinite ;
            border: none;
            margin: 0;

            @include keyframes (cursor-blink-android) {
                0% {
                    color: transparent;
                    background: transparent;
                }
                50% {
                    color: #000;
                    background: #000;
                }
                100% {
                    color: transparent;
                    background: transparent;
                }
            }

        }

        .cursor-blink-ios {
            animation-name: cursor-blink-ios;
        }

        .blink-ios {
            animation: cursor-blink-ios 1s steps(1, start) infinite ;
            -webkit-animation: cursor-blink-ios steps(1, start) 1s infinite ;
            -o-animation: cursor-blink-ios 1s steps(1, start) infinite ;
            -moz-animation: cursor-blink-ios 1s steps(1, start) infinite ;
            border: none;
            margin: 0;

            @include keyframes (cursor-blink-ios) {
                0% {
                    color: transparent;
                    background: transparent;
                }
                50% {
                    color:#4169E1;
                    background: #4169E1;
                }
                100% {
                    color: transparent;
                    background: transparent;
                }
            }
        }
    }

    .my_input_mask_value {
        line-height: .96rem;
    }
}
</style>
