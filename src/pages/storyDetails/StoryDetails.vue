<template>
  <div class="storyDetails" ref="storyDetails">
    <div>
      <story-details-header v-if="details" :details="details" />
      <common-content v-if="details" :goodsItems="goodsItems" :details="details" />
      <h2>热文推荐</h2>
      <common-article-rec v-if="details" :articleRecommends="details.articleRecommends" :linkTo="linkTo"/>
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
  // import {
  //   config
  // } from 'util/config.js'
import BScroll from 'better-scroll'
import CommonContent from '@/common/commonContent/CommonContent'
import StoryDetailsHeader from './components/StoryDetailsHeader'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
export default {
  name: 'StoryDetails',
  components: {
    StoryDetailsHeader,
    CommonContent,
    CommonArticleRec
  },
  data () {
    return {
      id: '',
      details: null,
      goodsItems: [],
      linkTo: '/storyDetails/'
    }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {
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
          console.log(this.goodsItems)
          this.scrollInit()
          this.scroll.scrollTo(0, 0, 0)
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      return (this.scroll = new BScroll(this.$refs.storyDetails, {
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
  h2
    font-size 66px
    font-weight 600
    padding-top 50px
    height 160px
    line-height 160px
    padding-left 50px
</style>
