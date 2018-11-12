<template>
  <div class="wrapper">
    <userinfo-header title="门店列表" oper=''></userinfo-header>
    <ul class="toolStoreCon">
      <li class="storeAddItem border-bottom" v-for="item in list" :key="item.id">
        <div class="left border-right">
          <h3>星品优汇 ({{item.name}})</h3>
          <span class="address">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
          <span class="time">营业时间:周一至周五 10:00 - 22:00</span>
        </div>
        <div class="right">
          <i class="phoneIcon" @click="phoneCall(item.phone)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import UserinfoHeader from './ComUserSetHeader'
import {storeAddr} from 'util/netApi'
import {http} from 'util/request'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    // 店铺列表页面渲染
    toolStoreRender () {
      http(storeAddr).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.list = response.data.body
        }
      })
    },
    // 电话呼叫
    phoneCall (phone) {
      window.location.href = 'tel:' + phone
    }
  },
  mounted () {
    this.toolStoreRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    box-sizing border-box
    padding-top 132px
    background #fff
  .toolStoreCon
    width 100%
    .storeAddItem
      width 100%
      height 380px
      box-sizing border-box
      padding 65px 48px 20px
      .left
        float left
        width 82%
        height 260px
        h3
          width 100%
          font-weight bold
          font-size 46px
          margin-bottom 46px
          color #262626
        span
          display block
          width 100%
          font-size 40px
        .address
          color #262626
          line-height 50px
          margin-bottom 50px
        .time
          color #999999
  .right
    float left
    width 18%
    height 100%
    position relative
    .phoneIcon
      display block
      width 70px
      height 70px
      position absolute
      left 0
      right 0
      bottom 0
      top 0
      margin auto
      bgImage('/static/icons/storePhone')
</style>
