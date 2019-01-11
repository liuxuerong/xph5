<template>
  <div class="wrap">
    <div class="orderItem">
      <div class="imgContainer">
        <router-link :to="'/details/'+pricesData.goodsId">
          <img v-lazy="imageUrl+pricesData.goodsPic" alt="">
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
      </div>
    </div>
    <div class="bottom">
      <span>{{pricesData.statusStr.split('-')[0]}}</span>
      <i>{{pricesData.statusStr.split('-')[1]}}</i>
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
    }
  },
  computed: {
    // 格式化商品信息
    formatSpec: function () {
      let specArr = JSON.parse(this.pricesData.goodsSpec)
      let spec = ''
      for (let item of specArr) {
        spec += item.value + '/'
      }
      spec = spec.substring(0, spec.length - 1)
      return spec
    }
  },
  methods: {
    // 售后详情
    goDetails () {
      this.$router.push(`/afterSaleDetails/${this.pricesData.saleSn}`)
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
  align-items top
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
    padding-top 20px
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
.bottom
  line-height 136px
  padding-left 50px
  font-size 40px
  i
    color #BA825A
</style>
