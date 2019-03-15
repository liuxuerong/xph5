<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="returnGoodsCon">
      <goods-item :goodsData="list"></goods-item>
      <div class="returnType">
        <span class="smallTitle">选择类型</span>
        <div class="returnTypeCon border-bottom" @click="returnType">
          <span class="returnGoodsIcon"></span>
          <div class="right">
            <h3>退款退货</h3>
            <p>已收到货，需要退换已收到的货物</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import goodsItem from './components/goodsItem'
import {storage} from 'util/storage'
import { aftersale } from 'util/const'
export default {
  data () {
    return {
      title: '选择售后类型',
      list: []
    }
  },
  components: {
    SearchTitle,
    goodsItem
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'returnGoods') {
        this.returngoodsRender()
      }
    }
  },
  methods: {
    // 页面渲染
    returngoodsRender () {
      let data = storage.getLocalStorage(aftersale)
      this.list = data
    },
    // 选择类型
    returnType () {
      let orderId = this.$route.params.orderId
      this.$router.push('/applyRefund/2/' + orderId)
    }
  },
  mounted () {
    this.returngoodsRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    box-sizing border-box
    padding-top 132px
  .returnGoodsCon
    width 100%
  .returnType
    width 100%
    .smallTitle
      display block
      width 100%
      height 170px
      line-height 170px
      box-sizing border-box
      padding 0 50px
      font-size 46px
      font-weight bold
      color #262626
      background #f5f5f5
  .returnTypeCon
    width 100%
    height 260px
    box-sizing border-box
    padding 80px 46px
    .returnGoodsIcon
      float left
      width 124px
      height 104px
      margin-right 40px
      bgImage('../../icons/returnGoods')
    h3
      font-size 46px
      line-height 50px
      font-weight bold
      margin-bottom 10px
      color #262626
    p
      font-size 30px
      color #999999
</style>
