<template>
  <div class="commonImgPrices">
      <div class="imgContainer">
        <img src="/static/images/index_swiper.jpg" alt="">
      </div>
      <p class="name">
        竖条纹水晶花瓶竖条纹水晶花瓶
      </p>
      <p class="price">¥339</p>
      <div class="promotion">
        <span class="promotionItem active">限时特惠</span>
        <span class="promotionItem">满减</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'CommonImgPrices'
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .commonImgPrices
    text-align center
    font-size 40px
    width 382px
    font-weight 600
    .imgContainer
      width 382px
      height 382px
      img
        width 100%
        height 100%
    .name
      height 98px
      line-height 98px
      ellipsis()
    .price
      height 40px
      line-height 40px
      ellipsis()
.promotion
  font-size 0
  text-align center
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 22px 20px
    border 1px solid #D54B4B
    display inline-block
    margin 0 15px
    margin-top 23px
  .promotionItem.active
    background-color  #FED9D9
</style>
