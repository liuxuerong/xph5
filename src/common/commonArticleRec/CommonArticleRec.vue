<template>
  <div class="commonArticleRec">
    <ul>
      <li v-for="item in articleRecommends" :key="item.id">
        <router-link :to="linkTo+item.id">
          <img :src="imageUrl+item.articleCoverImage" alt="">
        <p class="title">{{item.title}} <em v-if="item.subTitle">|</em> {{item.subTitle}}</p>
        <dir class="summary">{{item.summary}}详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍
详细介绍详细介绍详细介绍详细介绍详细介绍</dir>
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
  li
    img
      width 100%
      height 600px
      margin 50px 0
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
      margin-bottom 100px
      padding 0 50px
</style>
