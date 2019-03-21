<template>
  <div class="wrapper">
    <userinfo-header title="卡券中心" oper=''></userinfo-header>
    <div class="cardVoucherCon">
      <div class="cardVoucherTitle">
        <div class="tabItem" v-for="(tabs,i) in tab" :key="i">
          <span class="hrefCss" :class="index==i?'active':''" @click="headleTabsChange(i)">{{tabs}}</span>
        </div>
      </div>
      <div class="cardVoucherPage" v-if="list.length > 0">
         <div class="cardVouItem"  v-for="item in list" :key="item.id" @click.stop="cardDetailsPages(item.useStatus,item.id,item)">
           <card :item="item" :index="index" :showOperate="true"/>
         </div>
      </div>
      <div class="cardVoucherPage" :class="{cardVoucherPageBg:list.length == 0}" v-else>
        <common-empty :emptyObj="emptyObj"/>
      </div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import Card from 'common/commonCard/Card'
import { Tab, TabItem } from 'vux'
import {coupon, memberCouponRecord} from 'util/netApi'
import {http} from 'util/request'
import {Toast} from 'mint-ui'
import {storage} from 'util/storage'
import {mapMutations, mapState} from 'vuex'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import emptyImg from '../../images/emptyCard.png'
export default {
  data () {
    return {
      tab: ['未使用', '已使用', '已失效'],
      index: 0,
      list: [],
      emptyObj: {
        emptyImg,
        emptyBold: '暂无卡券',
        emptyP: '更多卡券在飞奔向你的路上~',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    UserinfoHeader,
    Tab,
    TabItem,
    CommonEmpty,
    Card
  },
  filters: {
    timeFilter: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('T')[0].replace(/-/ig, '.')
    }
  },
  methods: {
    ...mapMutations(['changeListObj']),
    // tab切换
    headleTabsChange (index) {
      if (index === 0) {
        this.index = index
        let params = {
          status: 1,
          page: 1,
          rows: 100
        }
        http(coupon, params).then((result) => {
          this.list = result.data.body.list
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.index = index
        let params = {
          status: index + 1,
          page: 1,
          rows: 100
        }
        http(coupon, params).then((result) => {
          this.list = result.data.body.list
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 卡券详情
    cardDetailsPages (type, id, item) {
      let mainType = this.index
      // id不能搜索到卡券
      storage.setLocalStorage('card', item)
      this.$router.push(`/cardDetails/${type}/${mainType}/${id}`)
    },
    // 领取优惠券
    receiveCard (id) {
      let params = {
        couponId: id
      }
      http(memberCouponRecord, params).then((response) => {
        if (response.data.code === 0) {
          Toast({
            message: '优惠券领取成功',
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.headleTabsChange(0)
          }, 2000)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.headleTabsChange(0)
  },
  computed: mapState({
    listObj: state => state.card.listObj
  }),
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    },
    list: function (v) {
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper >>> .commonEmpty
    padding-top 400px
  .wrapper
    width 100%
    min-height 100%
    padding-top 132px
    background #F5F5F5
  .cardVoucherTitle
    width 100%
    height 120px
    line-height 120px
    display flex
    background #fff
    .tabItem
      flex 1
      text-align center
      .hrefCss
        display inline-block
        width auto
        height 120px
        color #666666
        font-size 42px
      .hrefCss.active
        color #262626
        border-bottom 8px solid #333333
  .cardVoucherPageBg.cardVoucherPage
    position absolute
    left 0
    width 100%
    height 100%
    background #fff
  .cardVoucherPage
    width 100%
    box-sizing border-box
    padding 34px 30px 34px
    background #f5f5f5
</style>
