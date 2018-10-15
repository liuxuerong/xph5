<template>
  <div class="indexItems">
    <div class="text">
      <h6 class="title">{{itemsData.title}}</h6>
      <div class="content">{{itemsData.summary}}</div>
    </div>
    <div class="itemList">
      <div class="container" v-for="item in itemsData.goodsItems" :key="item.id">
        <img :src="imageUrl+item.coverImage" alt="">
        <p class="name">
          {{item.name}}
        </p>
        <p class="price">
          ¥{{item.minPrice}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { config } from 'util/config'
export default {
  name: 'IndexItems',
  props: {
    itemsData: Object
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.indexItems
  .text
    text-align center
  .title
    font-size 56px
    margin-top 60px
    height 130px
    line-height 130px
  .content
    font-size 36px
    color #808080
    line-height 60px
    ellipsisM()
    -webkit-line-clamp 2
    margin-bottom 90px
.itemList
  display flex
  justify-content space-between
  .container
    width 300px
    text-align center
    font-size 40px
    margin-bottom 40px
    img
      height 320px
      width 100%
      margin-bottom 50px
    .name
      font-weight 600
      line-height 50px
      ellipsis()
    .price
      margin-top 0px
      line-height 60px
      font-weight normal
</style>
