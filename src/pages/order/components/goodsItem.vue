<template>
  <div class="goodsItem clearfix">
    <img v-if="goodsData.pic != ''" :src="imageUrl+goodsData.pic" alt="">
    <img v-else src="/static/images/personalHeader.png">
    <div class="orderText">
      <h3 class="goodsName">{{goodsData.goodsName}} {{goodsData.pic != ''}}</h3>
      <div class="goodsSpecWrapper clearfix">
        <span class="goodsSpec" v-if="goodsData.spec" v-for="(spec,n) in JSON.stringify(goodsData.spec)" :key="n">{{spec.value}}</span>
      </div>
      <span class="goodsPrice">￥ {{goodsData.price}}</span>
      <span class="goodsNum">×{{goodsData.num}}</span>
    </div>
  </div>
</template>
<script>
import { config } from 'util/config' // 图片路径
export default {
  props: ['goodsData'],
  data () {
    return {
      imageUrl: config.imageUrl
    }
  },
  mounted () {
    console.log(this.goodsData)
  }
}
</script>
<style lang="stylus" scoped>
.goodsItem
  width 100%
  box-sizing border-box
  padding 50px
  img
    float left
    width 286px
    height 286px
    margin-right 50px
  .orderText
    float left
    width calc(100% - 336px)
    height 286px
    box-sizing border-box
    padding-top 38px
    position relative
    .goodsName
      width 94%
      line-height 40px
      font-size 40px
      color #262626
      line-height 60px
      margin-bottom 30px
      font-weight blod
    .goodsPrice
      display block
      width 100%
      font-size 40px
      color #000000
      position absolute
      bottom 20px
      left 0
    .goodsNum
      width auto
      font-size 36px
      color #262626
      position absolute
      top 50px
      right 10px
</style>
