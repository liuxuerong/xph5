<template>
  <div class="orderPopUp">
    <div class="orderWrap">
      <div class="title">抱歉，您购买的以下{{unsatisfactoryData.length}}件商品，购买的数量 超出了限制
      </div>
      <ul>
        <li v-for="goods in unsatisfactoryData" :key="goods.goodsItemId" class="goodsItem">
          <img v-lazy="imageUrl+goods.goodsItemPic+imageAfterUrl" alt="">
          <div class="info">
            <p class="name">
              {{goods.goodsItemName}}
            </p>
            <div class="promotion">
              <span class="promotionItem" v-for="(item,index) in goods.spec" :key="index">{{item}}</span>
              <span class="num">
                x{{goods.num}}
              </span>
            </div>
              <div class="bottom">
                <div class="inventory notEnough" v-if="goods.stock<goods.num&&goods.stock!=0">
                库存不足
              </div>
               <div class="inventory" v-if="goods.stock==0">
                无库存
              </div>
              <p class="price">¥{{goods.price}}</p>
              </div>
          </div>
        </li>
      </ul>
      <div class="goodsInfoBottm border-top">
        <div class="linkCart" @click="toCart">返回购物车</div>
        <div class="remove" @click="remove">移除上述商品</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config'
export default {
  name: 'OrderPopUp',
  components: {},
  props: {
    unsatisfactoryData: Array
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl
    }
  },
  methods: {
    // 传给父元素id集合
    remove () {
      this.$emit('remove')
    },
    toCart () {
      this.$router.replace({path: '/cart/1'})
    }
  },
  created () {
    for (let i = 0; i < this.unsatisfactoryData.length; i++) {
      let spec = JSON.parse(this.unsatisfactoryData[i].specs)
      this.unsatisfactoryData[i].spec = []
      for (let j = 0; j < spec.length; j++) {
        this.unsatisfactoryData[i].spec.push(spec[j].value)
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.orderPopUp
  width 100%
  height 100%
  position fixed
  background rgba(0,0,0,0.3)
  top 0
  z-index 9999
  img
    width 286px
    height 286px
    margin-right 50px
  .orderWrap
    position absolute
    bottom 0
    background-color #fff
    width 100%
    .title
      padding  50px 50px
      line-height 80px
      color #262626
      font-size 56px
      font-weight 600
    ul
      padding 0 50px
      max-height 1000px
      overflow-y auto
    li
      display flex
      width 100%
      .info
        flex 1
        width 60%
        display inline-block
      .name
        line-height 80px
        color #262626
        font-size 40px
        font-weight 600
        ellipsis()
  .promotion
    height 100px
    span
      color #808080
      font-size 36px
      display inline-block
      margin-right 20px
  .bottom
    display flex
    justify-content space-between
    align-items center
  .price
    color #000000
    font-size 46px
    vertical-align middle
 .inventory
  height 47px
  display inline-block
  line-height 47px
  background-color #F5F5F5
  font-size 32px
  padding 0 10px
  color #BA825A
  margin-top 40px
  margin-bottom 20px
.inventory.notEnough
  color #D54B4B
.goodsInfoBottm
  width 100%
  display flex
  height 158px
  line-height 158px
  font-size 46px
  font-weight 600
  .linkCart
    flex 1
    text-align center
    color #262626
  .remove
    flex 1
    text-align center
    color #BA825A
    background-color #E6E6E6
.goodsItem
  margin-bottom 50px
</style>
