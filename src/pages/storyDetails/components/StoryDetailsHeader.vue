<template>
  <div class="storyDetailsHeader">
    <img :src="imageUrl+details.articleCoverImage" alt="">
    <div class="titleCont">
      <p class="title">{{details.title}} <em v-if="details.subTitle !==''">|</em> {{details.subTitle}}</p>
      <common-collection class="collection"/>
    </div>
    <dir class="summary">{{details.summary}}详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍 详细介绍详细介绍详细介绍详细介绍详细介绍
    </dir>
  </div>
</template>

<script>
import CommonCollection from '@/common/commonCollection/CommonCollection'
import {
  config
} from 'util/config.js'
export default {
  name: 'StoryDetailsHeader',
  props: {
    details: Object,
    articleRecommends: Array
  },
  components: {
    CommonCollection
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
.storyDetailsHeader
    img
      width 100%
      height 600px
      margin 50px 0
    .titleCont
      display flex
      justify-content space-between
      padding 0 50px
      .collection
        margin-top 30px
    .title
      font-size 56px
      font-weight 600
      line-height 100px
      color #333
    .summary
      color #808080
      font-size 36px
      line-height 50px
      margin-bottom 100px
      padding 0 50px
</style>
