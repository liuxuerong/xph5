<template>
  <div class="xpStory">
    <common-header :isScan="false" ref="commonHeader">
      <h1 class="title fl">故事</h1>
    </common-header>
    <div class="top">
      <tab v-if="tabbar.length">
        <tab-item :selected="index===0" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.id" >{{item.name}}</tab-item>
      </tab>
    </div>
    <div ref="xpStoryContent" class="xpStoryContent">
      <div>
        <common-article-rec v-if="storyKnow.length&&storyKnowFlag" :articleRecommends="storyKnow" :linkTo="linkTo" />
        <common-article-rec v-if="storyWord.length&&storyWordFlag" :articleRecommends="storyWord" :linkTo="linkTo" />
        <common-article-rec v-if="storySub.length&&storySubFlag" :articleRecommends="storySub" :linkTo="linkTo" />
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/commonHeader/CommonHeader'
import {
  Tab,
  TabItem
} from 'vux'
import {
  http
} from 'util/request'
import {
  storyKnow,
  storyWord,
  storySub,
  storyTabs
} from 'util/netApi'
import {
  mainEnum
} from 'util/enum.js'
import {
  config
} from 'util/config.js'
import BScroll from 'better-scroll'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
export default {
  name: 'Story',
  components: {
    CommonHeader,
    CommonArticleRec,
    Tab,
    TabItem
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      articles: [],
      storyKnow: [],
      storyWord: [],
      storySub: [],
      storyKnowFlag: true,
      storyWordFlag: false,
      storySubFlag: false,
      linkTo: '/storyDetails/',
      tabbar: []
    }
  },
  computed: {},
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0)
  //   }
  // },
  methods: {
    getTabbar () {
      let _this = this
      http(storyTabs, [mainEnum[0]]).then(res => {
        console.log(res)
        for (let i = 0; i < res.data.body.length; i++) {
          _this.tabbar.push(res.data.body[i])
        }
      })
    },
    onItemClick (index) {
      this.storyKnowFlag = false
      this.storyWordFlag = false
      this.storySubFlag = false
      if (index === 0) {
        this.storyKnowFlag = true
      } else if (index === 1) {
        this.storyWordFlag = true
      } else if (index === 2) {
        this.storySubFlag = true
      }
      this.scroll.refresh()
    },
    getStoryKnow () {
      http(storyKnow)
        .then(res => {
          console.log(res)
          this.storyKnow = res.data.body.articles
          this.scrollInit()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getStoryWord () {
      http(storyWord)
        .then(res => {
          this.storyWord = res.data.body.articles
        })
        .catch(err => {
          console.log(err)
        })
    },
    getStorySub () {
      http(storySub)
        .then(res => {
          this.storySub = res.data.body.articles
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      return (this.scroll = new BScroll(this.$refs.xpStoryContent, {
        scrollY: true,
        click: true,
        bounce: {
          top: false,
          bottom: true
        }
      }))
    }
  },
  mounted () {
    this.getTabbar()
    this.getStoryKnow()
    this.getStorySub()
    this.getStoryWord()
  }
}
</script>

<style lang="stylus" scoped>
.top>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
.top>>>.vux-tab-ink-bar
    background transparent
.top>>>.vux-tab-ink-bar::before
  content ""
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 100%
.top>>>.vux-tab-container
    height 106px
.top>>>.vux-tab
    height 106px
.top>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 46px
.xpStory
  height 100%
  padding-top 242px
  padding-bottom 148px
  .top
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 136px
    z-index 9999999
  .xpStoryContent
    height 100%
  h1.title
    font-size 56px
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
</style>
