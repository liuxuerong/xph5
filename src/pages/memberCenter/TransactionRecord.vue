<template>
  <div class="transactionRecord">
    <common-nav-header title="交易记录" />
    <ul class="record" v-if="recordList.length">
      <li v-for="item in recordList" :key="item.id">
        <div class="item">
          <span class="itemTitle">交易单号</span>
          <span class="cont">{{item.sn}}</span>
        </div>
         <div class="item">
          <span class="itemTitle">交易内容</span>
          <span class="cont bold">{{item.content}}</span>
        </div>
         <div class="item">
          <span class="itemTitle">购买时间</span>
          <span class="cont">{{item.createTime.split('T').join(' ')}}</span>
        </div>
         <div class="item">
          <span class="itemTitle">有效时间</span>
          <span class="cont bold">{{item.startTime.split('T')[0]}}至{{item.endTime.split('T')[0]}}</span>
        </div>
        <div class="bottom border-top clearfix">
          <div class="fl way">{{item.paymentName}}</div>
          <div class="fr price">¥{{item.payMoney}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import { http } from 'util/request'
import { buyRecord } from 'util/netApi'
export default {
  name: 'TransactionRecord',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      recordList: []
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    getRecord () {
      let params = {
        page: 1,
        rows: 100
      }
      http(buyRecord, params).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.recordList = res.data.body.list
        }
      })
    }
  },
  created () {
    this.getRecord()
  }
}
</script>
<style lang="stylus" scoped>
.record
  width 100%
  background-color #f5f5f5
  padding-top 148px
  min-height 100vh
  li
    margin-bottom 30px
    background #fff
    padding-top 30px
  .item
    height 98px
    line-height 98px
    font-size 40px
    padding-left 47px
  .itemTitle
    color #999999
    padding-right 50px
  .cont.bold
    font-weight bold
  .bottom
    padding 0 44px
    line-height 130px
    margin-top 20px
    .way
      color #BA825A
      font-size 40px
    .price
      color #333333
      font-size 46px
      font-weight bold
</style>
