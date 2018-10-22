<template>
  <div class="indexNavBanner">
    <h4>{{bannerData.name}}
      <a href="#" class="seeMore fr" v-if="showMore">更多></a>
    </h4>
    <div
      v-for="item in bannerData.articles"
      :key="item.id">
      <img
        :src="imageUrl+item.articleCoverImage"
        alt="" class="banner">
      <index-content
        v-if="showContent"
        :content="item"/>
      <index-items
        :itemsData="item"
        v-if="showItems"/>
    </div>
  </div>

</template>
<script>
import { config } from 'util/config.js'
import IndexContent from './IndexContent'
import IndexItems from './IndexItems'
export default {
  name: 'IndexNavBanner',
  props: {
    bannerData: {
      type: Object,
      default: function () {
        return {
          bannerData: {
            name: '',
            articles: [
            ]
          }
        }
      }
    },
    showMore: Boolean,
    showContent: Boolean,
    showItems: Boolean
  },
  components: {
    IndexContent,
    IndexItems
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
.indexNavBanner
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    .seeMore
      font-size 40px
      color #BA825A
      line-height 64px
      margin-top 60px
  .banner
    width 100%
    // margin-bottom 150px
</style>
