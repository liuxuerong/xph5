<template>
  <div class="storyDetailsHeader border-bottom">
    <img v-if="articleShow" :src="imageUrl+details.articleCoverImage" alt="">
    <div class="titleCont">
      <p class="title">{{details.title}} <em v-if="details.subTitle !==''">|</em> {{details.subTitle}}</p>
      <common-collection class="collection" v-if="!articleShow" />
    </div>
     <div class="bottom" v-if="!articleShow">
        <div class="author fl">{{details.author}}</div>
        <div class="time fl">{{details.updateTime.split('T')[0]}}</div>
        <div class="browse fr"><i class="icon"></i>{{details.browse}}</div>
      </div>
    <!-- <div class="summary">{{details.summary}}
    </div> -->
  </div>
</template>

<script>
import CommonCollection from '@/common/commonCollection/CommonCollection'
import {
  config
} from 'util/config.js'
import {
  detailsEnum
} from 'util/enum.js'
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
      imageUrl: config.imageUrl,
      articleShow: false
    }
  },
  methods: {
    storyDetailsHeaderRender () {
      console.log(detailsEnum.articleCategoryId)
      if (this.details.articleCategoryId === detailsEnum.articleCategoryId) {
        this.articleShow = true
      }
    }
  },
  mounted () {
    this.storyDetailsHeaderRender()
    console.log(this.details)
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.storyDetailsHeader
    img
      width 100%
      height 600px
      margin-bottom 50px
    .titleCont
      display flex
      justify-content space-between
      padding 0 50px 40px
      .collection
        margin-top 30px
    .title
      font-size 56px
      font-weight 600
      line-height 100px
      color #333
      flex 1
      ellipsisM()
      -webkit-line-clamp 2
    .summary
      color #808080
      font-size 36px
      line-height 50px
      padding 0 50px
  .bottom
    height 140px
    line-height 140px
    font-size 40px
    color #666666
    padding 0 50px
   .author
      color #262626
      margin-right 50px
      font-weight bold
    .icon
      width 50px
      height 30px
      display inline-block
      background url('/static/icons/browse_icon.png') no-repeat center center/100% 100%
      margin-right 35px
</style>
