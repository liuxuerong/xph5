<template>
  <div class="goodsItem">
    <div class="imgContainer">
      <router-link :to="'/details/'+goodsData.goodsId">
        <img v-lazy="imageUrl+goodsData.goodsPic+imageAfterUrl" alt="">
      </router-link>
    </div>
    <div class="info" @click="goDetails(goodsData.goodsId)">
      <p class="name">
        {{goodsData.goodsName}}
      </p>
      <div class="wrap goods">
        <div class="promotion">
          {{formatSpec}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config'
export default {
  name: 'DetailsItem',
  props: {
    goodsData: {
      type: Object
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl
    }
  },
  computed: {
    // 格式化商品信息
    formatSpec: function () {
      let specArr = JSON.parse(this.goodsData.goodsSpec)
      let spec = null
      if (specArr.length) {
        spec = ''
        for (let item of specArr) {
          spec += item.value + '/'
        }
        spec = spec.substring(0, spec.length - 1)
      }
      return spec
    }
  },
  methods: {
    // 订单详情
    goDetails (goodsId) {
      this.$router.push(`/details/${goodsId}`)
    }
  }

}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.goodsItem
  background-color #fff
  border-radius 20px
  font-size 40px
  width 100%
  display flex
  width 100%
  align-items top
  padding-bottom 50px
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
  .promotion
    flex 1
    display inline-block
    font-size 36px
    color #999999
    display inline-block
    margin-bottom 20px
</style>
