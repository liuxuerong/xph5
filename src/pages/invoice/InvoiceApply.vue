<template>
  <div class="invoiceApply">
    <common-nav-header title="申请开票" />
    <div class="applyWrap">
      <div class="wrap">
        <div class="cellLink">
          <div>实付金额<span>¥45648</span></div>
        </div>
        <div>
          <div class="cellLink">
            <div class="text" @click="openType">发票类型<span>{{this.invoiceStatus==1?'电子普通发票':'增值税专用发票'}}</span></div>
          </div>
          <router-link :to="`/invoiceInfo/${invoiceType}/${invoiceStatus}/2`" class="cellLink">
            <div class=" text">发票抬头<span v-if="info&&info.invoicingId">{{info.invoiceTitle}}</span></div>
          </router-link>
          <div class="cellLink">
            <div>发票内容<span>商品明细</span></div>
          </div>
        </div>
      </div>
      <span class="submit" @click="submit">提交申请</span>
    </div>
    <mt-popup position="bottom" v-model="invoiceVisible" @touchmove.prevent>
      <div class="popWrap">
        <div class="title">
          发票类型
          <div class="close" @click="closeType">×</div>
        </div>
        <ul>
          <li :class="{active:invoiceStatusSelect==='One'}">
            <label for="invoice1">
                  <div class="top">
                    <h3 class="name">电子普通发票</h3>
                    <span class="radioWrap">
                      <icon :type="invoiceStatusSelect==='One'?'success':'circle'"></icon>
                      <input type="radio" value="One" v-model="invoiceStatusSelect" id="invoice1">
                    </span>
                  </div>
                  <p>电子普通发票与纸质普通发票具备同等法律效力,可支持报销入账</p>
                </label>
          </li>
          <li :class="{active:invoiceStatusSelect!=='One'}">
            <label for="invoice2">
                  <div class="top">
                    <h3 class="name">增值税专用发票</h3>
                    <span class="radioWrap">
                      <icon :type="invoiceStatusSelect==='One'?'circle':'success'"></icon>
                      <input type="radio" value="Two" v-model="invoiceStatusSelect" id="invoice2">
                    </span>
                  </div>
                    <p>我司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目，请选择普通发票</p>
                </label>
          </li>
        </ul>
        <div class="bottomClose" @click="closeType">
          关闭
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  Toast,
  Popup
} from 'mint-ui'
import {
  storage
} from 'util/storage'
import {
  orderInfo
} from 'util/const.js'
import {
  Icon
} from 'vux'
export default {
  name: 'InvoiceApply',
  data: function () {
    return {
      invoiceVisible: false,
      invoiceStatus: '1', // 1、普票 2、专票
      invoiceType: '1', // 1、个人 2、企业
      info: null, // 创建订单参数
      invoiceStatusSelect: 'One'
    }
  },
  components: {
    CommonNavHeader,
    'mt-popup': Popup,
    Icon
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'CreateOrder' && to.params.info) {
        this.info = storage.getLocalStorage(orderInfo)
      } else if (to.name === 'CreateOrder' && !to.params.info) {
        this.info = null
        storage.delLocalStorage(orderInfo)
      }
    },
    // 发票类型弹窗选择
    invoiceStatusSelect (v) {
      if (v === 'Two') {
        this.invoiceStatus = '2'
        this.invoiceType = '2'
      } else {
        // 假如重新选择
        this.invoiceStatus = '1'
        this.invoiceType = '1'
      }
      let info = storage.getLocalStorage(orderInfo) || {}
      info.invoicingType = this.invoiceType
      info.invoiceStatus = this.invoiceStatus
      info.invoicingId = null
      storage.setLocalStorage(orderInfo, info)
      this.info = info
    }
  },
  methods: {
    // 打开发票类型弹窗
    openType () {
      this.invoiceVisible = true
    },
    // 关闭发票类型弹窗
    closeType () {
      this.invoiceVisible = false
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    // 申请开票
    submit () {
      // 判断是否要开发票
      if (!this.info || (this.info && !this.info.invoicingId)) {
        this.toastShow('请填写发票抬头！')
        return false
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
.invoiceApply
  padding 120px 0 0
  height 100%
  .applyWrap
    height 100%
    overflow-y auto
    background-color #f5f5f5
    padding 0 50px
    .cellLink
      line-height 148px
      padding 0 50px
      display inline-block
      width 100%
      div
        line-height 148px
        position relative
        width 100%
        font-size 40px
        color #666
        span
          padding-left 80px
          color #333
          font-weight 600
          font-size 46px
      .text::after
        content ''
        position absolute
        right 10px
        top 50%
        margin-top -12px
        width 24px
        height 24px
        border-right 2px solid #B3B3B3
        border-top 2px solid #B3B3B3
        transform rotate(45deg)
  .wrap
    background-color #fff
    border-radius 20px
    margin-top 30px
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
    font-size 56px
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
    li.active
      border none
      background #FAF7F3
      border 2px solid #FAF7F3
    li
      border 2px solid #E6E6E6
      border-radius 20px
      margin-bottom 30px
      padding 20px 50px
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
        line-height 100px
        display inline-block
        opacity 1
      p
        font-size 36px
        color #999999
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
.submit
  position fixed
  bottom 100px
  width calc(100%-(100px))
  left 50px
  background-color #fff
  height 146px
  line-height 146px
  text-align center
  font-size 46px
  color #333
  font-weight 600
</style>

<style lang="stylus">
.invoiceApply
  .mint-popup
    width 100%
    z-index 999999 !important
.radioWrap
  .weui-icon
    width 60px
    height 60px
    font-size 50px
    line-height 70px
  .weui-icon-success
    color #BA825A
</style>
