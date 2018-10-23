<template>
  <div class="commonArticleRec">
    <h2>热文推荐</h2>
    <ul>
      <li v-for="item in articleRecommends" :key="item.id">
        <img :src="imageUrl+item.articleCoverImage" alt="">
        <p class="title">{{item.title}}|{{item.subTitle}}</p>
        <dir class="summary">{{item.summary}}详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍
详细介绍详细介绍详细介绍详细介绍详细介绍</dir>
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
  components: {},
  data () {
    return {
      imageUrl: config.imageUrl
    }
  },
  props: {
    articleRecommends: Array
  }
}
</script>
<style lang="stylus" scoped>
.commonArticleRec
  h2
    font-size 66px
    font-weight 600
    padding-top 50px
    height 160px
    line-height 160px
    padding-left 50px
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
    .summary
      color #808080
      font-size 36px
      line-height 50px
      margin-bottom 100px
      padding 0 50px
</style>
