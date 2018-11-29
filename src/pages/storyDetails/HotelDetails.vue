<template>
  <div class="storyDetails" :class="{pt0:hideHead}">
    <common-nav-header :title="details.title" v-if="details&&!hideHead" />
    <div class="storyDetailsContent" ref="storyDetailsContent">
      <div>
        <story-details-header v-if="details" :details="details" />
        <div v-for="item in goodsItems" v-if="goodsItems.length" :key="item.id" class="goodsItems">
          <router-link :to="'/details/'+item.id">
            <img v-lazy="imageUrl+item.coverImage" alt="" class="banner">
            <div class="hotelContent">
              <h5>
                <span class="title">{{item.name}}</span>
                <span class="price fr" v-if="item.minPrice!==0">{{item.minPrice}}元起</span>
              </h5>
              <div class="content">
                {{item.introduction}}
              </div>
            </div>
          </router-link>
        </div>
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
import BScroll from 'better-scroll'
import CommonContent from '@/common/commonContent/CommonContent'
import StoryDetailsHeader from './components/StoryDetailsHeader'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
import { getUrlParam } from '@/func/params'
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
      imageUrl: config.imageUrl,
      hideHead: false,
      platfrom: ''
    }
  },
  watch: {
    $route (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    hideHeads () {
      this.platfrom = getUrlParam('platfrom')
      if (this.platfrom && this.platfrom !== '') {
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
          console.log(this.goodsItems)
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
  },
  updated () {
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
      }, 100)
    }
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
.goodsItems
  width 100%
  padding 50px 50px 0px
  img
    width 100%
.hotelContent
  margin-bottom 150px
  h5
    height 140px
    line-height 140px
    font-size 46px
    font-weight 600
    display flex
    .title
      color #333
      ellipsis()
      flex 1
      display inline-block
    .price
      font-size 40px
      color #333
  .content
    color #808080
    font-size 36px
    line-height 60px
    ellipsisM()
    -webkit-line-clamp 2
</style>
