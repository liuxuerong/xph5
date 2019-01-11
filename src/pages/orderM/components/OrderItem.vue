<template>
  <div class="orderItem">

    <div class="imgContainer">
      <router-link :to="'/details/'+pricesData.goodsId">
        <img v-lazy="imageUrl+pricesData.pic" alt="">
      </router-link>
    </div>
    <div class="info" @click="goDetails">
      <p class="name">
        {{pricesData.goodsName}}
      </p>
      <div class="wrap goods">
        <div class="promotion">
          {{formatSpec}}
        </div>
        <div class="num">
          x{{pricesData.num}}
        </div>
      </div>
      <div class="wrap">
        <p class="price">¥{{pricesData.price.toFixed(2)}}</p>
        <div class="status" v-if="!isDetails&&pricesData.saleStatus">
          {{pricesData.saleStatusStr}}
        </div>
        <div class="btn" v-if="isDetails&&status==2&&pricesData.saleStatus==0" @click="afterSale(pricesData,pricesData.orderItemId,2)">
          退款
        </div>
        <router-link :to="`/afterSaleDetails/${pricesData.saleSn}`" class="btn" v-if="isDetails&&status==2&&pricesData.saleStatus==1" >
          退款中
        </router-link>
         <router-link :to="`/afterSaleDetails/${pricesData.saleSn}`" class="btn" v-if="isDetails&&status==2&&pricesData.saleStatus==2" >
          退款中
        </router-link>
         <div class="btn" v-if="isDetails&&status==3&&pricesData.saleStatus!=1||isDetails&&status==5&&pricesData.saleStatus==0" @click="afterSale(pricesData,pricesData.orderItemId,1)">
          申请售后
        </div>
         <router-link :to="`/afterSaleDetails/${pricesData.saleSn}`" class="btn" v-if="isDetails&&status==3&&pricesData.saleStatus==1||isDetails&&status==5&&pricesData.saleStatus==1">
          申请售后中
        </router-link>
         <router-link :to="`/afterSaleDetails/${pricesData.saleSn}`" class="btn" v-if="isDetails&&status==3&&pricesData.saleStatus==2||isDetails&&status==5&&pricesData.saleStatus==1">
          申请售后中
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config'
export default {
  name: 'OrderItem',
  props: {
    pricesData: {
      type: Object
    },
    isDetails: {
      type: Boolean,
      default: false
    },
    orderSn: {
      type: String,
      default: ''
    },
    // 主订单的状态
    status: Number
  },
  computed: {
    // 格式化商品信息
    formatSpec: function () {
      let specArr = JSON.parse(this.pricesData.spec)
      let spec = ''
      for (let item of specArr) {
        spec += item.value + '/'
      }
      spec = spec.substring(0, spec.length - 1)
      return spec
    }
  },
  methods: {
    // 订单详情
    goDetails () {
      if (!this.isDetails) {
        console.log(this.orderSn)
        this.$router.push(`/orderDetails/${this.orderSn}`)
      }
    },
    /**
     * 申请售后
     * type 1:申请售后  2：直接退款
     */
    afterSale (pricesData, orderItemId, type) {
      this.$emit('afterSale', pricesData, orderItemId, type)
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.orderItem
  font-size 40px
  width 100%
  padding 50px
  display flex
  width 100%
  align-items center
  .imgContainer
    width 286px
    height 286px
    a
      display inline-block
      width 100%
      height 100%
    img
      width 100%
      height 100%
  .info
    width 70%
    padding-left 50px
    align-items top
    justify-content space-between
  .name
    width 100%
    height 60px
    line-height 60px
    font-size 46px
    ellipsis()
    font-weight bold
    color #333
  .wrap
    display flex
    align-items center
  .price
    height 50px
    line-height 50px
    ellipsis()
    font-size 40px
    color #000000
    display inline-block
    flex 1
  .btn
    display inline-block
    font-size 40px
    width 240px
    height 86px
    line-height 86px
    border-radius 43px
    text-align center
    margin-left 30px
    color #666666
    border 2px solid #808080
  .status
    font-size 36px
    color #BA825A
    height 60px
    line-height 60px
    font-weight normal
    display inline-block
    flex 1
    vertical-align top
    text-align right
  .promotion
    flex 1
    display inline-block
    font-size 36px
    color #999999
    display inline-block
    margin-bottom 20px
  .num
    font-size 40px
    color #262626
    height 60px
    line-height 60px
    font-weight normal
    display inline-block
    width 14%
    vertical-align top
    text-align right

</style>
