<template>
  <div class="brandDetailsContent" ref="brandDetailsContent" :class="{pt0:hideHead}">
    <common-nav-header :title="details.title" v-if="details&&!hideHead" />
    <div class="brandDetails" ref="brandDetails">
      <div>
        <div class="topBgImg" v-if="details">
          <img :v-lazy="imageUrl+details.articleCoverImage" alt="" class="articleCoverImage">
        </div>
        <details-header v-if="details" :details="details" />
        <common-content v-if="details&&goodsItems.length" :goodsItems="goodsItems" :details="details" />
        <div class="cutOffLine30"></div>
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
import {
  config
} from 'util/config.js'
import { getUrlParam } from '@/func/params'
import BScroll from 'better-scroll'
import DetailsHeader from './components/DetailsHeader'
import CommonContent from '@/common/commonContent/CommonContent'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
export default {
  name: 'BrandDetails',
  components: {
    DetailsHeader,
    CommonContent,
    CommonArticleRec,
    CommonNavHeader
  },
  data () {
    return {
      id: '',
      imageUrl: config.imageUrl,
      details: null, // 详情
      goodsItems: [],
      linkTo: '/brandDetails/',
      hideHead: false,
      platform: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'BrandDetails') {
        this.getBrandDetail()
      }
    }
  },
  methods: {
    hideHeads () {
      this.platform = getUrlParam('platform')
      if (this.platform && this.platform !== '') {
        this.hideHead = true
      }
    },
    getBrandDetail () {
      const id = this.$route.params.id
      http(hotelDetailList, [id])
        .then(res => {
          this.details = res.data.body
          this.goodsItems = res.data.body.goodsItems
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
        this.scroll = new BScroll(this.$refs.brandDetails, {
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
    this.getBrandDetail()
    this.hideHeads()
    document.querySelectorAll('html')[0].classList.add('overH')
    document.querySelectorAll('body')[0].classList.add('overH')
  },
  updated () {
    this.$nextTick(function () {
      let img = this.$refs.brandDetailsContent.getElementsByTagName('img')
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
.brandDetailsContent
  height 100%
  padding-top 120px
.brandDetailsContent.pt0
  padding-top 0
.brandDetails
  height 100%
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
  h2
    font-size 66px
    font-weight 600
    padding-top 50px
    margin-bottom 50px
    height 160px
    line-height 160px
    padding-left 50px
</style>
