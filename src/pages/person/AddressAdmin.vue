<template>
  <div class="wrapper">
    <userinfo-header title="我的地址" oper="新增地址" @operComplete="onOperComplete"></userinfo-header>
    <div class="addressCon">
      <div class="addressItem border-bottom" v-for="item in addList" :key="item.id">
        <div class="addressInfo clearfix">
          <div class="left">
            <div class="top clearfix">
              <h4>{{item.receiverName}}</h4>
              <span>{{item.phone}}</span>
            </div>
            <div class="bottom">{{item.province}}{{item.city}}{{item.area}}{{item.detailedAddr}}</div>
          </div>
          <div class="rigth">
            <span class="modifyAdd"  ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './ComUserSetHeader'
import { listDelivery } from 'util/netApi'
import {http} from 'util/request'
export default {
  data () {
    return {
      addList: []
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    // 页面渲染
    addressAdmin () {
      let params = {
        rows: 20,
        page: 1
      }
      http(listDelivery, params).then((response) => {
        console.log(response)
        this.addList = response.data.body.list
        console.log(this.addList)
        // // 判断默认地址
        // for (var i = 0; i < data.list.length; i++) {
        //   if (data.list[i].idDefault === 1) {
        //     this.addName = data.list[i].receiverName
        //     this.phone = data.list[i].phone.substring(0, 3) + '****' + data.list[i].phone.substring(7, 11)
        //     if (data.list[i].province === '上海' || data.list[i].province === '重庆' || data.list[i].province === '北京' || data.list[i].province === '天津') {
        //       this.address = data.list[i].city + data.list[i].area + data.list[i].detailedAddr
        //     } else {
        //       this.address = data.list[i].province + data.list[i].city + data.list[i].area + data.list[i].detailedAddr
        //     }
        //   }
        // }
      })
    },
    // 新增地址
    onOperComplete () {

    }
  },
  mounted () {
    // 地址初始化管理
    this.addressAdmin()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
  .addressItem
    width 100%
    box-sizing border-box
    padding 80px 52px
  .addressInfo
    width 100%
    height auto
    .left
      float left
      width 84%
      height 100%
      border-right 1px solid #e6e6ee
      box-sizing border-box
      padding-right 60px
      .top
        line-height 42px
        margin-bottom 42px
        font-size 46px
        color #000
        font-weight bold
        h4
          float left
          margin-right 100px
          font-weight bold
        span
          float left
          height 50px
          line-height 50px
          font-weight bold
    .rigth
      float left
      width 60px
      height 100%
      margin-top 40px
      margin-left 80px
      .modifyAdd
        display block
        width 60px
        height 60px
        bgImage('/static/icons/modifyAddress')
    .bottom
      width 100%
      font-size 36px
      line-height 44px
      color #262626
</style>
