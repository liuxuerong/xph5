<template>
  <div class="orderItem">
    <router-link :to="'/details/'+pricesData.goodsId">
      <div class="imgContainer">
        <img v-lazy="imageUrl+pricesData.pic" alt="">
      </div>
      <div class="info">
        <p class="name">
          {{pricesData.goodsName}}
        </p>
        <div class="wrap">
          <div class="promotion">
            {{formatSpec}}
          </div>
          <div class="num">
            x{{pricesData.num}}
          </div>
        </div>
        <div class="wrap">
          <p class="price">¥{{pricesData.actualPrice}}</p>
          <div class="status">
            x{{pricesData.num}}
          </div>
          <!-- <div class="btn">
            已退款
          </div> -->
        </div>

      </div>
    </router-link>
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
    }
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
  a
    display flex
    width 100%
    align-items center
  .imgContainer
    width 286px
    height 286px
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
    color #50CF62
    height 60px
    line-height 60px
    font-weight normal
    display inline-block
    width 14%
    vertical-align top
    text-align right
  .status.warning
    color #D54B4B
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
