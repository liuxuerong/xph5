<template>
  <div class="orderList">
    <common-head-link title="我的订单" />
    <div class="orderListWrap">
      <div class="topTap">
        <tab>
          <tab-item :selected="item.index==currentIndex" v-for="(item,index) in tabbar" :key="index">
            <router-link :to="`/orderList/${item.index}`">
              {{item.text}}
            </router-link>
          </tab-item>
        </tab>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import {
  Tab,
  TabItem
} from 'vux'
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
export default {
  name: 'OrderList',
  components: {
    Tab,
    TabItem,
    CommonHeadLink
  },
  data () {
    return {
      tabbar: [{
        index: -1,
        text: '全部'
      },
      {
        index: 1,
        text: '待付款'
      },
      {
        index: 2,
        text: '待发货'
      },
      {
        index: 3,
        text: '待收货'
      },
      {
        index: 4,
        text: '待评价'
      }
      ],
      currentIndex: -1
    }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'orderListStatus') {
        this.currentIndex = this.$route.path.split('/')[2]
      }
    }
  },
  methods: {

  },
  mounted () {
    this.currentIndex = this.$route.path.split('/')[2]
  }
}
</script>

<style lang="stylus" scoped>
.orderListWrap
  height 100%
  padding-top 104px
.orderList>>>.vux-tab .vux-tab-item.vux-tab-selected
  color #333333
  border-bottom 8px solid #262626
  position relative
  a
    color #333333
.orderList>>>.vux-tab .vux-tab-item.vux-tab-selected::before
  content ""
  position absolute
  bottom 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 8px
.orderList>>>.vux-tab-ink-bar
    display none !important
.orderList>>>.vux-tab-container
    height 106px
.orderList>>>.vux-tab
    height 106px
.orderList>>>.scrollable .vux-tab-item
  flex 0 0 17%
.orderList>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 42px
    margin-right 40px
    font-weight 600
    width auto
.orderList
  height 100%
  background-color #F5F5F5
.topTap
  height 120px
  z-index 99999999
  a
    color #666666
</style>
