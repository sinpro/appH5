<template>
  <div class="popup template-set" style="padding-bottom: 150px">
    <div class="popup-head">
      <div class="jiantou" @click="backMenu"></div>
      <div class="back-icon"  @click="backMenu"></div>
      <span class="back-text"  @click="backMenu">返回</span>
      <span class="fenge">|</span>
      <span class="mtSetting">宫格设置</span>
    </div>
    <div class="palace__setting">
      <el-form>
        <el-form-item label="宫格名称">
            <el-input v-model="palaceName" @change="nameChange"></el-input>
        </el-form-item>
        <el-form-item label="宫格图标">
            <div class="palace__icon">
                <div class="palace__icon__body" v-for="(item, i) in palaceList" :key="i" style="margin-top:40px;position:relative"
                    @mouseenter="item.showbottomSilde = true" @mouseleave="item.showbottomSilde = false">
                    <div class="icon__block" @click="handleClick(i)">
                        <img :src="concatImageUrl(item.icon)" alt="" class="icon" >
                    </div>
                    <div class="showbottomSilde" v-if="item.showbottomSilde">
                      <img src="../../../assets/del1.png" alt="" @click="item.showbottomSilde = false;item.icon= ''">
                    </div>
                </div>
            </div>
            
        </el-form-item>
        <el-form-item label="跳转链接" class="link">
            <div @click="linkType.title = '2';isSplitBtn = true" :style="[linkType.title === '2' ? linkStyle : '']" class="tab_block app">APP内部</div>
            <div @click="linkType.title = '4';isSplitBtn = true" :style="[linkType.title === '4' ? linkStyle : '']" class="tab_block app">Native</div>
            <div @click="linkType.title = '5';isSplitBtn = true" :style="[linkType.title == '5' ? linkStyle : '']" class="tab_block app">小程序</div>
            <div @click="linkType.title = '1';isSplitBtn = true" :style="[linkType.title == '1' ? linkStyle : '']" class="tab_block third">第三方</div>
            <div @click="openLink" class="splitBtn tab_splitBtn" :class="[isSplitBtn ? 'splitBtn__active' : '']">
              <div class="splitRadio" :class="[isSplitBtn ? 'splitRadio__active' : '']"></div>
            </div>
        </el-form-item>
        <div v-show="isSplitBtn" style="float:right">
          <el-form-item label=''>
              <el-input placeholder="（URL地址）" v-model="linkAdress"></el-input>
          </el-form-item>
          <el-form-item label="触发后登录" class="padding_left_del">
              <div @click="isLogin = !isLogin" class="splitBtn" :class="[isLogin ? 'splitBtn__active' : '']" style="height:2.2px;margin-left:185px">
                <div class="splitRadio" :class="[isLogin ? 'splitRadio__active' : '']"  ></div>
              </div>
          </el-form-item>
          <el-form-item label="上送用户ID" class="padding_left_del">
              <div @click="isNeedId = !isNeedId" class="splitBtn" :class="[isNeedId ? 'splitBtn__active' : '']" style="margin-left:185px">
                <div class="splitRadio" :class="[isNeedId ? 'splitRadio__active' : '']"></div>
              </div>
          </el-form-item>
        </div>
        <el-form-item label="角标设置" class="add_right_padding" style="clear:both;border-top: 1px solid #F5F5FA;">
            <div @click="superscript.title = '2';isSplitBtn3 = true;superscriptContent='NEW'" :style="[superscript.title === '2' ? linkStyle : '']" class="app">NEW</div>
            <div @click="superscript.title = '3';isSplitBtn3 = true;superscriptContent=''" :style="[superscript.title == '3' ? linkStyle : '']" class="third">文字</div>
            <div @click="SubscriptSetting" class="splitBtn" :class="[isSplitBtn3 ? 'splitBtn__active' : '']">
              <div class="splitRadio" :class="[isSplitBtn3 ? 'splitRadio__active' : '']"></div>
            </div>
        </el-form-item>
        <div style="float:right" class="Subscript" v-show="isSplitBtn3">
          <el-form-item label="角标内容">
              <el-input v-model="superscriptContent"></el-input>
          </el-form-item>
          <el-form-item label="角标显示">
              <el-date-picker
                  v-model="packDate3"
                  type="datetime"
                  value-format="yyyy-MM-dd"
                  align="left">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="角标消失">
              <el-date-picker
                  v-model="packDate4"
                  type="datetime" 
                  value-format="yyyy-MM-dd"
                  align="left">
              </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="商户标识" class="line__style__radio" style="clear:both;display: flex;align-items: center;">
            <input type="text" v-model="lofoContent" class="lofoContent" :disabled="!merchantLogo"/>
            <div @click="merchantLogo = !merchantLogo;" class="splitBtn" :class="[merchantLogo ? 'splitBtn__active' : '']" style="margin-left:20px">
              <div class="splitRadio" :class="[merchantLogo ? 'splitRadio__active' : '']"></div>
            </div>
        </el-form-item>
        <el-form-item label="弹框标志" class="line__style__radio">
            <input type="text" v-model="signContent" class="lofoContent" :disabled="!windowSign"/>
            <div @click="windowSign = !windowSign;" class="splitBtn" :class="[windowSign ? 'splitBtn__active' : '']" style="margin-left:20px">
              <div class="splitRadio" :class="[windowSign ? 'splitRadio__active' : '']"></div>
            </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialogImage">
        <el-dialog title="选择素材" :visible.sync="isShowMaterial" class="cropper-box" :before-close="handleDialogCloseMaterial"  :close-on-click-modal="false">
            <choose-material ref="chooseMaterial" :imgOption="size" @backImgTemplate="backImg"></choose-material>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  import chooseMaterial from '^/chooseMaterial'
  import mixins from '../../../../mixins.js'

  export default {
    mixins,
    data() {
      return {
        palaceName: '转账汇款',
        isShowMaterial:false,
        linkAdress: '',
        superscript: {
          title: '1'
        },
        superscriptContent: '',
        packDate3: '',
        packDate4: '',
        lofoContent: '',
        signContent: '',
        disabled:false,
        palaceList: [
            {icon: this.optionsIndex.IconX1,showbottomSilde:false},
            {icon: this.optionsIndex.IconX2,showbottomSilde:false},
            {icon: this.optionsIndex.IconX3,showbottomSilde:false}
        ],
        selectedIndex: 0,
        //控制开关
        isSplitBtn: false,
        isLogin: false,
        isNeedId: false,
        isSplitBtn3: false,
        merchantLogo: false,
        windowSign: false,
        linkType:{
          title: '1'
        },
        linkStyle: {
          background: '#F2F8FF',
          border: '1px solid #3671FF',
          color: '#3671FF'
        },
        formData: {},
        size: []
      }
    },
    components: {
      chooseMaterial
    },
    props: {
      optionsIndex: {
        type: Object,
        default: {}
      }
    },
    methods: {
      handleClick(i) {
        this.isShowMaterial = true
        this.selectedIndex = i
        this.size.push(36, 36, 3)
        // if(i === 0 ) {
        //   this.size.push(36,36,1)
        // }else if (i === 1) {
        //   this.size.push(36,36,2)
        // }else {
        //   this.size.push(36,36,3)
        // }
      },
      backImg(imgArr) {
        this.palaceList[this.selectedIndex].icon = imgArr[0].showSelectImg
        // this.palaceList[1].icon = imgArr[0].showSelectImg
        // this.palaceList[2].icon = imgArr[0].showSelectImg
        this.isShowMaterial = false
      },
      confirm() {
        let a = this.$refs.chooseMaterial.getParentImage()
        this.palaceList[this.selectedIndex].icon = a
        // this.palaceList[this.selectedIndex].icon = a
        // this.palaceList[this.selectedIndex].icon = a

        this.$emit('imgChange',a)
        this.isShowMaterial = false
      },
      nameChange() {
        this.$emit('changeName',this.palaceName)
      },
      handleDialogCloseMaterial() {
        this.isShowMaterial = false
      },
      backMenu() {
        // let a = (this.packDate3 == '' || this.packDate3 == null) ? '' : (this.packDate3.split('-')[0] + this.packDate3.split('-')[1] +this.packDate3.split('-')[2])
        // let b = (this.packDate4 == '' || this.packDate4 == null) ? '' : (this.packDate4.split('-')[0] + this.packDate4.split('-')[1] +this.packDate4.split('-')[2])
        let form = {
          index: this.optionsIndex.index,
          palaceName: this.palaceName,
          palaceList: this.palaceList,
          linkType: this.linkType.title,
          linkAdress: this.linkAdress,
          isLogin: this.isLogin,
          isNeedId: this.isNeedId,
          superscript: this.superscript.title,
          superscriptContent: this.superscriptContent,
          packDate3: this.packDate3,
          packDate4: this.packDate4,
          merchantLogo: this.merchantLogo,
          lofoContent: this.lofoContent,
          windowSign: this.windowSign,
          signContent: this.signContent
        }
        this.formData = form
        this.$emit('back',this.formData)
      },
      openLink() {
        this.isSplitBtn = !this.isSplitBtn;
        this.linkType.title = this.isSplitBtn ? '2' : '1';
        if(!this.isSplitBtn) {
          this.linkAdress = '';
          this.isLogin = '';
          this.isNeedId = '';
        }
      },
      SubscriptSetting() {
        this.isSplitBtn3 = !this.isSplitBtn3;
        this.superscript.title = this.isSplitBtn3 ? '2' : '1'
        if(!this.isSplitBtn3) {
          this.superscriptContent = ''
          this.packDate3 = ''
          this.packDate4 = ''
        }
      }
    },
    created() {
      console.log(this.optionsIndex)
      let a = this.optionsIndex.packDate3
      let b = this.optionsIndex.packDate4
      let c = this.optionsIndex.linkType

      // if(this.optionsIndex.linkType === '1') {
      //   c = '3'
      // }else if (this.optionsIndex.linkType === '2') {
      //   c = '2'
      // }else if (this.optionsIndex.linkType === '5') {
      //   c = '5'
      // }else {
      //   c = '1'
      // }
      this.palaceName = this.optionsIndex.palaceName,
      this.linkType.title = c,
      this.isSplitBtn = (!this.optionsIndex.linkType || this.optionsIndex.linkType === '0') ? false : true
      this.linkAdress = this.optionsIndex.linkAdress,
      this.isLogin = this.optionsIndex.isLogin === '1' ? true : false,
      this.isNeedId = this.optionsIndex.isNeedId === '1' ? true : false,
      console.log(this.optionsIndex.newFlag === '1' && this.optionsIndex.superscriptContent=== 'NEW')
      this.superscript.title = (this.optionsIndex.newFlag === '1' && this.optionsIndex.superscriptContent=== 'NEW') ? '2' : '3',
      this.isSplitBtn3 = this.optionsIndex.newFlag === '1' ? true : false,
      this.superscriptContent = (this.optionsIndex.newFlag === '1'&& this.optionsIndex.superscriptContent=== 'NEW') ? 'NEW' : this.optionsIndex.superscriptContent,
      
      this.packDate3 = a,
      this.packDate4 = b,
      this.merchantLogo = this.optionsIndex.merchantLogo == '1' ? true : false,
      this.lofoContent =  this.optionsIndex.lofoContent,
      this.windowSign = this.optionsIndex.windowSign === '1' ? true : false,
      this.signContent = this.optionsIndex.signContent
      if(!this.isSplitBtn3) {
        this.superscript.title = '1'
      }
    },
    computed:{
    }
  }
</script>

<style lang = "scss">
  .slideleft-leave-active,.slideleft-enter-active{
      transition:  all 0.3s ease; 
  }

  .slideleft-leave-active,.slideleft-enter{
      right:-400px !important;
  }

  .slideleft-leave,.slideleft-enter-active{
      right: 400px;
  }
  .template-set{
      z-index: initial !important;
      overflow: hidden;
      width: 410px;
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            background:#ffffff;
            z-index: 1000;
            overflow-y: auto;
      .el-dialog {
          width: 800px !important;
          .el-dialog__body {
              padding:40px;
              .is-vertical{
                  width: 720px;
                  border: 1px solid #DDE0E4;
                  height: 496px;
                  .el-header{
                      // width: 716px;
                      padding:0 0 0 25px;
                      height: 48px;
                      border-bottom: 1px solid #DDE0E4;
                  };
                  .el-aside,.el-main{
                      border-right: 1px solid #DDE0E4;
                      .el-checkbox-group{
                          .el-checkbox{
                              display: block;
                              width: 360px;
                              height:39px;
                              line-height: 39px;
                              margin:0;
                              padding-left: 25px;
                              border-bottom: 1px solid #DDE0E4;
                              // &:last-child{
                              //     border: 1px solid #DDE0E4;
                              // }
                          }
                      }
                  }
                  .el-main{
                      border:none;
                      padding:0;
                      margin-right: 16px;
                      border-right: 1px solid #DDE0E4;
                      .el-checkbox-group{
                          .el-checkbox{
                              width: 340px;
                          }
                      }
                  }
              }
          }
          .el-dialog__footer{
              text-align: center;
              height: 72px;
              padding:16px;
              .cityButton{
                  width:112px;
                  height: 40px;
                  background:#316cff;
                  color: #ffffff;
                  border: none;
                  font-size: 14px;
              }
          }
      }
      .pic_block {
          width: 240px;
          height: 240px;
          background: #FAFAFC;
          margin-left: 38px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #DDE0E4;
      }
      .submit{
          display: flex;
          cursor: pointer;
          padding: 0;
          align-items: center;
          justify-content: center;
          width: 112px;
          height: 40px;
          border-radius: 3px;
          background: #ffffff;
          border: 1px rgb(220, 223, 230) solid;
          margin: 0 auto;
          &:hover{
              background: #3671FF;
          }
          span {
              font-family: MicrosoftYaHeiUI;
              font-size: 14px;
              color: #323C41;
              letter-spacing: 1px;
              text-align: center;
          }
      }
      .palace__setting{
        .el-form{
          .palace__icon{
            .showbottomSilde{
              background: rgba(0, 0, 0, 0.5);
              position: absolute;
              display: flex;
              height: 40px;
              width: 120px;
              bottom: 0;
              align-items: center;
              img{
                margin-left: 90px;
              }
            }
          }
          .link,.add_right_padding{
            display: flex;
            border-top: 1px solid #F5F5FA;
            padding-top: 18px;
            .el-form-item__content{
              display: flex;
              align-items: center;
              width: 280px;
              justify-content: flex-start;
              & .app,& .third{
                width: 80px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                background: #FAFAFC;
                border-radius: 2px;
                box-sizing: content-box;
                border:1px solid #FAFAFC;
                cursor: pointer;
              }
              & .app{
                margin-right: 8px;
              }

              .tab_block{
                width: 150px;
                margin-right: 2px;
              }

              .tab_splitBtn{
                width: 80px;
                margin-left: 20px;
              }
              
            }
          }
          .add_right_padding{
            
            .el-form-item__label{
              padding: 0 20px 0 0 !important;
            }
          }
          .Subscript{
            .el-form-item{
              display: flex;
              margin-bottom: 20px;
              label.el-form-item__label{
                padding-right: 20px;
              }
              .el-input{
                width: 208px;
                .el-input__inner{
                  width: 208px;
                }
              }
            }
          }
          .line__style__radio {
            .lofoContent{
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              box-sizing: border-box;
              height: 40px;
              width: 228px;
              color: #323C41;
              padding-left: 15px;
              font-family: MicrosoftYaHeiUI;
            }
            .lofoContent:focus{
              border-color:#409EFF;
            }
            .el-form-item__content{
              display: flex;
              align-items: center;
            }
          }
          .padding_left_del{
            display: flex;
            flex-direction: row;
            align-items: center
            /* padding-top: 18px; */
          }
        }
      }
  }
  .splitBtn {
    background: #CACCD2;
    border-radius: 1px;
    width: 32px;
    height: 2px;
    margin-left: 85px;
    position: relative;
    cursor: pointer;
  }
  .splitBtn__active {
      background: #A8D2FF;
  }
  .splitRadio{
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #CACCD2;
      position: absolute;
      left: 0px;
      top: -8px;
  }
  .splitRadio__active {
      position: absolute;
      left: 16px;
      top: -8px;
      background: #3671FF;
      transition: left 0.5 ease-in-out;
  }
  .el-input-number__decrease, .el-input-number__increase{
      z-index: initial !important;
  }
  .el-color-picker__mask{
      z-index: initial !important;
  }
</style>


