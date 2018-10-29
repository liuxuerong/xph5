<template>
  <div class="hallAtlas">
    <common-nav-header :title="title" />
    <div class="xpAtlasTop border-bottom" ref="xpAtlasTop">
      <div class="xpAtlasTopContent" ref="xpAtlasTopContent">
        <tab v-if="hallAtlasData.length>1">
          <tab-item v-for="(item,i) in hallAtlasData" :selected="i==index" @on-item-click="onItemClick" :key="i" :id="i" ref="tabItem">{{item.name}}</tab-item>
        </tab>
      </div>
    </div>
    <div ref="xpHallContent" class="xpHallContent">
      <div>
        <ul class="goodsContainer" v-if="imgsList.length">
          <li v-for="item in imgsList" v-if="imgsList.length" :key="item.index">
              <router-link :to="'/hallDetails/'+index">
                <img :src="imageUrl+item.img" alt="">
              </router-link>
            </li>
            <li class="emptyBox"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import {
  config
} from 'util/config.js'
import {
  experience
} from 'util/const.js'
import {
  storage
} from 'util/storage.js'
import {
  Tab,
  TabItem
} from 'vux'
import BScroll from 'better-scroll'
export default {
  name: 'HallAtlas',
  components: {
    CommonNavHeader,
    Tab,
    TabItem
  },
  data () {
    return {
      title: '图集',
      imageUrl: config.imageUrl,
      imgsList: [],
      hallAtlasData: [{
        name: '全部',
        experienceCategoryId: '全部',
        list: []
      }],
      index: 0
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    initHallAtlasData (index) {
      for (let i = 0; i < this.experience.length; i++) {
        let flag = true
        for (let j = 0; j < this.hallAtlasData.length; j++) {
          if (this.hallAtlasData[j].experienceCategoryId === this.experience[i].experienceCategoryId) {
            this.hallAtlasData[j].list.push({
              img: this.experience[i].experienceCoverImage,
              index: i
            })
            flag = false
            break
          }
        };
        if (flag) {
          this.hallAtlasData.push({
            name: this.experience[i].categoryName,
            experienceCategoryId: this.experience[i].experienceCategoryId,
            list: [{
              img: this.experience[i].experienceCoverImage,
              index: i
            }]
          })
        }
        this.hallAtlasData[0].list.push({
          img: this.experience[i].experienceCoverImage,
          index: i
        })
      }
      this.getImgsList(index)
      // this.scrollInitTopBar()
      // console.log(this.$refs.xpAtlasTopContent.getElementsByClassName('vux-tab-erap'))
    },
    onItemClick (index) {
      this.index = index
      this.getImgsList(index)
    },
    getImgsList (i) {
      this.imgsList = this.hallAtlasData[i].list
    },
    scrollInitTopBar () {
      console.log(this.$refs.xpAtlasTop)
      console.log(this.$refs.xpAtlasTopContent.getElementsByClassName('vux-tab-erap')[0])
      return (this.scrollTopBar = new BScroll(this.$refs.xpAtlasTop, {
        scrollX: true,
        scrollY: false,
        click: true,
        bounce: {
          left: true,
          right: true
        }
      }))
    }
  },
  created () {
    this.index = this.$route.params.index
    this.experience = storage.getLocalStorage(experience)
    console.log(this.index)
    this.initHallAtlasData(this.index)
  },
  updated () {
    console.log(this.$refs.xpAtlasTopContent.getElementsByClassName('vux-tab-erap')[0])
  },
  mounted () {
    this.scrollInitTopBar()
  }
}
</script>

<style lang="stylus" scoped>
  .xpAtlasTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
    font-weight: 600;
.xpAtlasTop>>>.vux-tab-ink-bar
    background transparent
.xpAtlasTop>>>.vux-tab-ink-bar::before
  content ""
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 100%
.xpAtlasTop>>>.vux-tab-container
    height 106px
    display block
.xpAtlasTop>>>.vux-tab
    height 106px
    display: block
.xpAtlasTop>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 46px
    flex none
    display inline-block
    width: auto;
    margin-right 100px
.hallAtlas
  height 100%
  padding-top 202px
  .xpAtlasTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
    z-index 9999999
    padding 0 50px
    background-color #fff
.xpHallContent
  ul
    display flex
    flex-wrap wrap
    padding 50px
    justify-content space-between
    height 100%
    li
      width 488px
      height 450px
      margin-bottom 50px
      img
        width 488px
        height 450px
    .emptyBox
      width 488px
      height 0
</style>
