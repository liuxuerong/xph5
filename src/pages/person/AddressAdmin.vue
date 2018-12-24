<template>
  <div class="wrapper">
    <userinfo-header title="我的地址" :oper="oper" @operComplete="onOperComplete"></userinfo-header>
    <div class="addressCon">
      <div class="addressItem" v-if="addList.length > 0" v-for="item in addList" :key="item.id">
        <div class="addressInfo clearfix">
          <div class="left" @click="selectGoodsAddress(item.id)">
            <div class="top clearfix">
              <h4>{{item.receiverName}}</h4>
              <span>{{item.phone}}</span>
              <em class="default" v-if="item.idDefault==1">默认</em>
            </div>
          </div>
          <div class="right">
            <span class="modifyAdd" @click="modifyAddress(item.id)"></span>
          </div>
           <div class="bottom">{{item.province}}{{item.city}}{{item.area}}{{item.detailedAddr}}</div>
        </div>
      </div>
      <common-empty :emptyObj="emptyObj" v-if="addList.length == 0"></common-empty>
    </div>
  </div>
</template>
<script>
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import UserinfoHeader from './components/ComUserSetHeader'
import { listDelivery } from 'util/netApi'
import {http} from 'util/request'
import {storage} from 'util/storage'
import {orderInfo} from 'util/const.js'
export default {
  data () {
    return {
      addList: [],
      oper: '',
      emptyObj: {
        emptyImg: '/static/images/enptyAddress.png',
        emptyBold: '暂无地址',
        emptyP: '您还没有添加收货地址~',
        buttonText: '立即添加',
        buttonRouter: '/goodsAddress/1'
      }
    }
  },
  components: {
    UserinfoHeader,
    CommonEmpty
  },
  methods: {
    // 页面渲染
    addressAdmin () {
      let params = {
        rows: 20,
        page: 1
      }
      http(listDelivery, params).then((response) => {
        this.addList = response.data.body.list
        if (this.addList.length > 0) {
          this.oper = '新增'
        }
      })
    },
    // 新增地址
    onOperComplete (id) {
      this.$router.push('/goodsAddress/1')
    },
    // 修改地址
    modifyAddress (id) {
      this.$router.push('/goodsAddress/2/' + id)
    },
    // 选择地址
    selectGoodsAddress (id) {
      if (this.$route.params.need) {
        let info = storage.getLocalStorage(orderInfo) || {}
        info.addressId = id
        info.addressType = '快递配送'
        info.shippingMethod = 2
        storage.setLocalStorage(orderInfo, info)
        this.$router.replace({path: '/createOrder/2'})
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'addressAdmin') {
        this.addressAdmin()
      }
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
  .wrapper >>> .commonEmpty
    background-color #F5F5F5
  .wrapper
    width 100%
    box-sizing border-box
    background-color #F5F5F5
    min-height 100vh
    padding-top 132px
  .addressCon
    padding 0 50px
  .addressItem
    width 100%
    border-radius:20px;
    margin-top 30px
    background-color #fff
    padding 80px 52px
  .addressInfo
    width 100%
    height auto
    .left
      float left
      height 100%
      width 84%
      box-sizing border-box
      padding-right 60px
      .top
        line-height 42px
        margin-bottom 42px
        font-size 46px
        color #333333
        h4
          float left
          margin-right 50px
          font-size 46px
          color #333333
          width 190px
          ellipsis()
          font-weight 600
        span
          float left
          height 50px
          line-height 50px
          font-weight 600
        .default
          font-size 30px
          color #BA825A
          font-size 30px
          border 1px solid #BA825A
          height 50px
          line-height 50px
          width 78px
          text-align center
          display inline-block
          margin-left 50px
          border-radius 4px
    .right
      float left
      width 60px
      height 100%
      margin-left 80px
      .modifyAdd
        display block
        width 60px
        height 60px
        bgImage('/static/icons/modifyAddress')
    .bottom
      width 100%
      font-size 46px
      color #333333
      line-height 60px
      float left
</style>
