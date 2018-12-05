<template>
  <div class="storyDetails" :class="{pt0:hideHead}">
    <common-nav-header  v-if="details&&!hideHead"/>
    <div class="storyDetailsContent" ref="storyDetailsContent">
      <div>
        <story-details-header v-if="details" :details="details" />
        <common-content v-if="(details&&goodsItems.length) || (details&&articleShow)" :goodsItems="goodsItems" :details="details" />
        <h2 v-if="details&&details.articleRecommends.length">热文推荐</h2>
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
import { getUrlParam } from '@/func/params'
import BScroll from 'better-scroll'
import CommonContent from '@/common/commonContent/CommonContent'
import StoryDetailsHeader from './components/StoryDetailsHeader'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
import {
  detailsEnum
} from 'util/enum.js'
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
      linkTo: '/storyDetails/',
      hideHead: false,
      platform: '',
      articleShow: false
    }
  },
  methods: {
    hideHeads () {
      this.platform = getUrlParam('platform')
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.hideHead = true
      }
    },
    getStoryDetails () {
      const id = this.$route.params.id
      http(hotelDetailList, [id])
        .then(res => {
          console.log(res)
          this.details = res.data.body
          this.goodsItems = res.data.body.goodsItems
          if (res.data.body.articleCategoryId === detailsEnum.articleCategoryId) {
            this.articleShow = true
          }
          setTimeout(() => {
            this.scrollInit()
            this.scroll.scrollTo(0, 0, 0)
          }, 16)
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.storyDetailsContent, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  mounted () {
    this.getStoryDetails()
    this.hideHeads()
    document.querySelectorAll('html')[0].classList.add('overH')
    document.querySelectorAll('body')[0].classList.add('overH')
  },
  updated () {
    this.$nextTick(function () {
      let img = this.$refs.storyDetailsContent.getElementsByTagName('img')
      let count = 0
      let length = img.length
      if (length) {
        let timer = setInterval(() => {
          if (count === length) {
            this.scroll.refresh()
            clearInterval(timer)
          } else if (img[count].complete) {
            count++
          }
        }, 16)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.storyDetails
  height 100%
  padding-top 120px
.storyDetails.pt0
  padding-top 0
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
