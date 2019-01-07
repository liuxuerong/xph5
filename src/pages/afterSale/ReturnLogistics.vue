<template>
  <div class="logistics">
    <common-nav-header :title="title">
    </common-nav-header>
    <div class="logisticsWrap" ref="logisticsWrap">
      <group title="物流信息" class="wrap">
        <x-input placeholder="请选择物流公司" v-model.trim="inputForm.name1" class="select"  @click.native="openPop"></x-input>
        <x-input placeholder="请填写物流单号" v-model.trim="inputForm.name2"></x-input>
      </group>
      <group title="联系方式" class="wrap">
        <x-input placeholder="请填写手机号码" v-model.trim="inputForm.phone"></x-input>
      </group>
      <div class="submit" @click.stop="submit">保存</div>
    </div>
    <!-- 物流公司 -->
    <mt-popup position="bottom" v-model="popVisible" @touchmove.prevent>
      <div class="popWrap">
        <div class="title">
          物流公司
          <div class="close" @click="closePop">×</div>
        </div>
        <ul>
          <li>
            <label for="reason1">
                <div class="top">
                  <h3 class="name">顺丰速运</h3>
                  <span class="radioWrap">
                    <icon :type="reasonDesc==='不想买了'?'success':'circle'"></icon>
                    <input type="radio" value="不想买了" v-model="reasonDesc" id="reason1">
                  </span>
                </div>
              </label>
          </li>
          <li>
            <label for="reason2">
                <div class="top">
                  <h3 class="name">信息填写错误，重新拍</h3>
                  <span class="radioWrap">
                    <icon :type="reasonDesc==='信息填写错误，重新拍'?'success':'circle'"></icon>
                    <input type="radio" value="信息填写错误，重新拍" v-model="reasonDesc" id="reason2">
                  </span>
                </div>
              </label>
          </li>
          <li>
            <label for="reason3">
                <div class="top">
                  <h3 class="name">其他原因</h3>
                  <span class="radioWrap">
                    <icon :type="reasonDesc==='其他原因'?'success':'circle'"></icon>
                    <input type="radio" value="其他原因" v-model="reasonDesc" id="reason3">
                  </span>
                </div>
              </label>
          </li>
        </ul>
        <div class="bottomClose" @click="selectItem()">
          提交
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
// import {
//   config
// } from 'util/config.js'
// import {
//   http
// } from 'util/request'
// import {
//   addInvoice,
//   updateInvoice,
//   getInvoice,
//   getInvoiceById,
//   delInvoice
// } from 'util/netApi'
import {
  Toast,
  Popup
} from 'mint-ui'
import {
  Group,
  XInput,
  Cell,
  Icon
} from 'vux'

export default {
  name: 'ReturnLogistics',
  components: {
    CommonNavHeader,
    Group,
    XInput,
    Cell,
    Icon,
    'mt-popup': Popup
  },
  data () {
    return {
      title: '填写物流信息',
      popVisible: false,
      reasonDesc: '不想买了',
      inputForm: {
        phone: '',
        name1: '12',
        name2: ''
      }
    }
  },
  methods: {
    // 弹窗显示
    openPop () {
      this.popVisible = true
    },
    // 关闭弹窗
    closePop () {
      this.popVisible = false
    },
    // 选择公司
    selectItem () {

    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    // 校验
    validate () {
      let input = document.getElementsByTagName('input')
      for (var i = 0; i < input.length; i++) {
        if (input[i].type === 'text') {
          if (input[i].value.trim() === '') {
            this.toastShow(input[i].placeholder)
            return
          }
        }
      }
      const isPhone = (value) => /^1\d{10}$/gi.test(value)
      if (this.inputForm.phone !== '' && !isPhone(this.inputForm.phone)) {
        this.toastShow('请填写一个正确的手机号码')
        return false
      }
    },
    submit () {
      this.validate()
    }
  },
  created () {}
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .addressText >>> .weui-icon-clear
    margin-right 30px
  .logistics
    min-height 100%
    padding-top 120px
    background-color #F5F5F5
    padding-bottom 120px
  .logisticsWrap
    padding 30px 50px
    width 100%
    &>>>.weui-cells__title
      height 144px
      line-height 144px
      margin 0
      color #333333
      font-size 46px
      padding 0
      font-weight 600
    &>>>.weui-cells:before
      display none
      color #fff
    &>>>.weui-cells:after
      display none
      color #fff
    &>>>.weui-cell:before
      border-top none
    &>>>.weui-input
      line-height 120px
      height 120px
      font-size 40px
    &>>>.weui-cell
      line-height 120px
      height 120px
      padding 0 38px
      color #666666
      font-size 60px
      background-color #F5F5F5
      border-radius 60px
      margin 30px 0
    &>>>.weui-check__label:active
      background-color #fff
    &>>>.weui-icon-checked
      border 3px solid #ccc
        border-radius 50%
      width 46px
      height 46px
    &>>>.weui-label
      color #CCCCCC
      font-size 40px
    &>>>::-webkit-input-placeholder
      font-size 40px
      color #CCCCCC
    &>>>input::-moz-placeholder
      font-size 40px
      color #CCCCCC
    &>>>:-ms-input-placeholder
      font-size 40px
      color #CCCCCC
    &>>>::-moz-placeholder
      font-size 40px
      color #CCCCCC
  .logisticsWrap
    .wrap
      background-color #fff
      border-radius 20px
      margin-bottom 30px
      padding 0 38px
.iconWrap
  position relative
  .icon
    position absolute
    top 40px
    right 20px
    width 60px
    height 60px
    color #666666
    font-size 50px
.submit
  background-color #fff
  line-height 146px
  height 146px
  width 91%
  text-align center
  margin-top 80px
  font-size 46px
  color #262626
  bottom 100px
  position fixed
.wrap .select:after
  border: solid 0.017778rem #B3B3B3;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  z-index: 2;
  right: 30px;
  position: absolute;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
  width: 0.22444rem;
  height: 0.22444rem
.popWrap
  .bottomClose
    height 250px
    line-height 250px
    background-color #F0F0F0
    font-size 50px
    color #BA825A
    text-align center
  .title
    height 190px
    line-height 190px
    color #333333
    font-size 50px
    font-weight 600
    text-align center
    position relative
    .close
      position absolute
      right 0
      top 0
      color #999999
      font-weight normal
      width 100px
      height 190px
  ul
    padding 0 50px
    li
      line-height 148px
      .top
        display flex
        justify-content space-between
        align-items center
      label
        display inline-block
        width 100%
        height 100%
      .name
        font-size 46px
        color #333333
        line-height 148px
        display inline-block
        opacity 1
  .radioWrap
    position relative
    width 80px
    height 80px
    overflow hidden
    display inline-block
    input
      position absolute
      top 0
      left 0
      z-index 999999
      opacity 0
      width 60px
      height 60px

</style>

<style lang="stylus">
.logistics
  .mint-popup
    width 100%
    z-index 999999 !important
  .v-modal
    z-index 9999 !important
  .radioWrap
    .weui-icon
      width 60px
      height 60px
      font-size 50px
      line-height 70px
      position absolute
      top 0
      left 0
    .weui-icon-success
      color #BA825A
</style>
