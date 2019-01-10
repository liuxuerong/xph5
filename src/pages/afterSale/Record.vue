<template>
  <div class="record">
    <common-nav-header :title="title" />
   <div class="recordCont">
      <div class="wrap">
      <i class="identity platform">
        平台
      </i>
      <span class="time">
        2018-12-34 15:30:28
      </span>
      <div class="info">
        用户已退货,物流公司:申通快递;物流单号:71500904907667
      </div>
    </div>
    <div class="wrap">
      <i class="identity mine">
        我
      </i>
      <span class="time">
        2018-12-34 15:30:28
      </span>
      <div class="info">
        用户已退货,物流公司:申通快递;物流单号:71500904907667
      </div>
    </div>
   </div>
    <div class="btn" @click="contactService">
      <i class="icon"></i>
      <span>联系客服</span>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  customerService
} from 'util/netApi'
export default {
  name: 'Record',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      title: '服务纪录'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
  // 联系客服
    contactService () {
      window.location.href = customerService
    }
  }
}
</script>

<style lang="stylus" scoped>
.record
  height 100%
  .recordCont
    width 100%
    min-height calc(100%-(148px))
    background-color #f5f5f5
    padding 120px 50px
    .wrap
      background #FFFFFF
      border-radius 20px
      padding 50px
      margin-top 32px
    .identity
      display inline-block
      line-height 70px
      padding 0 30px
      border-radius 35px
      background-color #F5F5F5
    .platform
      color #BA825A
    .mine
      color #4273FD
    .time
      color #B3B3B3
      font-size 36px
      line-height 70px
      display inline-block
      margin-left 52px
  .info
    color #333
    font-size 46px
    font-weight 600
    margin-top 20px
  .btn
    width 100%
    background-color #fff
    height 148px
    line-height 148px
    font-size 50px
    color #333
    text-align center
    i
     display inline-block
     width 68px
     height 58px
     margin-right 33px
     background url('/static/icons/udesk_icon.png') no-repeat center center /100%
     vertical-align middle
</style>
