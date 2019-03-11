<template>
  <div class="orderItem">
    <router-link :to="'/details/'+pricesData.goodsId">
      <div class="imgContainer">
        <img v-lazy="imageUrl+pricesData.pic+imageAfterUrl" alt="">
      </div>
      <div class="info">
        <p class="name">
          {{pricesData.name}}
        </p>
        <div class="wrap">
          <div class="promotion">
            <span class="promotionItem" v-for="(item,index) in pricesData.spec" :key="index">
              <i v-if="index+1<pricesData.spec.length">{{item}}/</i>
              <i v-else>{{item}}</i>
              </span>
          </div>
          <div class="num">
            x{{pricesData.num}}
          </div>
        </div>
        <p class="price">¥{{pricesData.price}}</p>
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
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.orderItem
  font-size 40px
  width 100%
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
    flex 1
    width 60%
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
  .price
    height 50px
    line-height 50px
    ellipsis()
    font-size 46px
    color #333
  .promotion
    width 80%
    display inline-block
    .promotionItem
      font-size 36px
      color #808080
      display inline-block
  .num
    font-size 40px
    color #333333
    height 60px
    line-height 60px
    display inline-block
    width 14%
    vertical-align top
    text-align right
    font-weight 600
</style>
