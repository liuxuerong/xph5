<template>
  <div class="wrapper">
    <common-nav-header :title="title" />
    <div class="returnGoodsCon" v-if="goodsData">
      <goods-item :goodsData="goodsData"></goods-item>
      <div class="returnType">
        <div class="returnTypeCon" @click="returnType(1)">
          <span class="returnGoodsIcon"><img src="/static/icons/afterMoney.png" alt=""></span>
          <div class="right">
            <h3>仅退款</h3>
            <p>未收到货（包含未签收）或与平台协商同意前提下</p>
          </div>
        </div>
        <div class="returnTypeCon" @click="returnType(2)">
          <span class="returnGoodsIcon"><img src="/static/icons/afterReturn.png" alt=""></span>
          <div class="right">
            <h3>退款退货</h3>
            <p>已收到货，需要退换已收到的货物</p>
          </div>
        </div>
        <div class="returnTypeCon" @click="returnType(3)">
          <span class="returnGoodsIcon"><img src="/static/icons/afterRepair.png" alt=""></span>
          <div class="right">
            <h3>维修</h3>
            <p>已收到货，需要维修的货物</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import GoodsItem from './components/GoodsItem'
// import {
//   config
// } from 'util/config'
import {
  storage
} from 'util/storage'
import {
  aftersale
} from 'util/const'
export default {
  name: 'AfterSaleSelect',
  data () {
    return {
      // imageUrl: config.imageUrl,
      title: '选择售后类型',
      goodsData: null
    }
  },
  components: {
    CommonNavHeader,
    GoodsItem
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AfterSaleSelect') {
        this.returngoodsRender()
      }
    }
  },
  methods: {
    // 页面渲染
    returngoodsRender () {
      this.goodsData = storage.getLocalStorage(aftersale)
      console.log(this.goodsData)
    },
    // 选择类型
    returnType (type) {
      let orderItemId = this.$route.params.orderItemId
      let orderStatus = this.$route.params.orderStatus
      this.$router.push(`/applyAfterSales/${orderStatus}/${orderItemId}/${type}`)
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
    min-height 100%
  .returnGoodsCon
    width 100%
    background-color #f5f5f5
    padding 148px 50px 0
    min-height 100vh
  .returnType
    width 100%
    background-color #fff
    border-radius 20px
    margin-top 30px
    padding 20px 50px
  .returnTypeCon
    width 100%
    height 260px
    box-sizing border-box
    padding 60px 0
    position relative
    .returnGoodsIcon
      float left
      width 96px
      height 96px
      margin-right 50px
      img
        width 100%
        height 100%
    h3
      font-size 46px
      line-height 50px
      font-weight bold
      margin-bottom 10px
      color #262626
    p
      font-size 30px
      color #999999
  .returnTypeCon:after
    content ""
    position absolute
    border: solid 0.017778rem #B3B3B3;
    border-bottom-width: 0;
    border-left-width: 0;
    top: 43%;
    right: 0;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    width: 0.22444rem;
    height: 0.22444rem;
</style>
