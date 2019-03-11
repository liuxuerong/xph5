<template>
  <div class="orderPopUp">
    <div class="orderWrap" >
      <div class="close" @click="toCart"> ×</div>
      <div class="title">抱歉，您购买的以下{{unsatisfactoryData.length}}件商品，购买数量超出了限制
      </div>
      <ul>
        <li v-for="goods in unsatisfactoryData" :key="goods.goodsItemId" class="goodsItem">
          <img v-lazy="imageUrl+goods.goodsItemPic+imageAfterUrl" alt="">
          <div class="info">
            <p class="name">
              {{goods.goodsItemName}}
            </p>
            <div class="promotion">
              <span class="promotionItem" v-for="(item,index) in goods.spec" :key="index">
                <i v-if="index+1<goods.spec.length">{{item}}/</i>
                <i v-else>{{item}}</i>
              </span>
              <span class="num">
                x{{goods.num}}
              </span>
            </div>
              <div class="bottom">
                <!-- <div class="inventory notEnough" v-if="goods.stock<goods.num&&goods.stock!=0">
                库存不足
              </div>
               <div class="inventory" v-if="goods.stock==0">
                无库存
              </div> -->
              <span class="price">¥{{goods.price}}</span>
              <i class="text">最多可购买{{goods.stock}}件</i>
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
    remove () {
      this.$emit('remove')
    },
    toCart () {
      this.$emit('orderPopUpShow', false)
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
    .close
      position absolute
      right 50px
      top 20px
      font-size 80px
      color #ccc
    .title
      padding  50px 90px 50px 50px
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
        color #333
        font-size 46px
        font-weight 600
        ellipsis()

  .promotion
    height 100px
    display flex
    justify-content space-between
    span
      color #999
      font-size 36px
      display inline-block
      margin-right 20px
  .bottom
    display flex
    justify-content space-between
    align-items center
  .price
    color #333333
    font-size 46px
  .text
    color #D54B4B
    font-size 36px
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
