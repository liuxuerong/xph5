<template>
  <div class="commonArticleRec">
    <ul>
      <li v-for="item in articleRecommends" :key="item.id">
        <router-link :to="linkTo+item.id" class="routerDetailes">
        <img v-lazy="imageUrl+item.articleCoverImage" alt="" class="lazyImg">
        <p class="title">{{item.title}} <em v-if="item.subTitle">|</em> {{item.subTitle}}</p>
        <slot></slot>
        <div class="summary">{{item.summary}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  config
} from 'util/config.js'
export default {
  name: 'CommonArticleRec',
  props: {
    linkTo: String,
    articleRecommends: Array
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>
<style lang="stylus" scoped>
.commonArticleRec
  margin-top 50px
  li
    padding-bottom 100px
    .routerDetailes
      display inline-block
      width 100%
    img
      width 100%
      height 600px
      margin-bottom 50px
     .title
      font-size 56px
      font-weight 600
      line-height 100px
      padding 0 50px
      color:#333
    .summary
      color #808080
      font-size 36px
      line-height 50px
      padding 0 50px
  .lazyImg[lazy=loading]
    width 400px
    height 400px
    margin 100px auto
    display block
</style>
