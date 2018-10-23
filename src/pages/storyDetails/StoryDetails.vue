<template>
  <div class="storyDetails">
    <common-nav-header :title="details.title" v-if="details"/>
    <div class="storyDetailsContent" ref="storyDetailsContent">
      <div>
        <story-details-header v-if="details" :details="details" />
        <common-content v-if="details&&goodsItems.length" :goodsItems="goodsItems" :details="details" />
        <h2>热文推荐</h2>
        <common-article-rec v-if="details" :articleRecommends="details.articleRecommends" :linkTo="linkTo" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  http
} from 'util/request'
import {
  hotelDetailList
} from 'util/netApi'
import BScroll from 'better-scroll'
import CommonContent from '@/common/commonContent/CommonContent'
import StoryDetailsHeader from './components/StoryDetailsHeader'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
export default {
  name: 'StoryDetails',
  components: {
    StoryDetailsHeader,
    CommonContent,
    CommonArticleRec,
    CommonNavHeader
  },
  data () {
    return {
      id: '',
      details: null,
      goodsItems: [],
      linkTo: '/storyDetails/'
    }
  },
  watch: {
    $route (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    getStoryDetails () {
      const id = this.$route.params.id
      http(hotelDetailList, [id])
        .then(res => {
          console.log(res)
          this.details = res.data.body
          this.goodsItems = res.data.body.goodsItems
          this.scrollInit()
          this.scroll.scrollTo(0, 0, 0)
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      return (this.scroll = new BScroll(this.$refs.storyDetailsContent, {
        scrollY: true,
        click: true,
        bounce: {
          top: true,
          bottom: true
        }
      }))
    }
  },
  mounted () {
    this.getStoryDetails()
  }
}
</script>

<style lang="stylus" scoped>
.storyDetails
  height 100%
  padding-top 120px
.storyDetailsContent
  height 100%
  h2
    font-size 66px
    font-weight 600
    padding-top 50px
    height 160px
    line-height 160px
    padding-left 50px
</style>
