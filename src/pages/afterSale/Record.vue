<template>
  <div class="record">
    <common-nav-header :title="title" />
    <div class="recordCont" >
      <div class="wrap" v-for="item in recordList" :key=item.id v-if="recordList.length">
        <i class="identity platform" v-if="item.createType==2">
          平台
        </i>
         <i class="identity mine" v-else>
          我
        </i>
        <span class="time">
          {{item.createTime|fromatTime}}
        </span>
        <div class="info" v-html="item.remarksInfo">
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
  customerService,
  operatingLog
} from 'util/netApi'
import {
  http
} from 'util/request'
export default {
  name: 'Record',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      title: '服务纪录',
      saleSn: '',
      recordList: []
    }
  },
  computed: {

  },
  watch: {

  },
  filters: {
    // 时间去'T'
    fromatTime (time) {
      if (time) return time.split('T').join(' ')
    }
  },
  methods: {
    // 联系客服
    contactService () {
      window.location.href = customerService
    },

    // 获取操作记录
    getList () {
      this.saleSn = this.$route.params.saleSn
      http(operatingLog, [this.saleSn]).then(res => {
        console.log(res)
        this.recordList = res.data.body
      }).catch(err => {
        console.log(err)
      })
    }

  },
  created () {
    this.getList()
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
    margin-top 20px
  .wrap:first-child
    .info
      font-weight 600
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
     background url('../../icons/udesk_icon.png') no-repeat center center /100%
     vertical-align middle
</style>
