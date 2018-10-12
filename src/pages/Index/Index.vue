<template>
  <div class="indexTabbar">
    <mt-tabbar v-model="selected" class="border-top" fixed ref="mtTabbar">
      <mt-tab-item
        v-for="item of tabItemData"
        :key="item.id"
        :id="item.id">
        <img slot="icon" :src="item.selected?item.imgSrcSelect:item.imgSrc">
        {{item.text}}
      </mt-tab-item>
    </mt-tabbar>
    <!-- tab-container -->
    <div ref="wrapper" class="wrapper">
      <mt-tab-container  v-model="selected" >
        <mt-tab-container-item id="tabbar1" >
          <div class="home" >
            <common-header/>
            <index-header/>
            <index-swiper/>
            <index-nav/>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tabbar2">
          2
        </mt-tab-container-item>
        <mt-tab-container-item id="tabbar3">
        3
        </mt-tab-container-item>
        <mt-tab-container-item id="tabbar4">
          4
        </mt-tab-container-item>
        <mt-tab-container-item id="tabbar5">
          5
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>
</template>
<script>
import { Tabbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import BScroll from 'better-scroll'
import CommonHeader from 'common/commonHeader/CommonHeader'
import IndexHeader from './components/IndexHeader'
import IndexSwiper from './components/IndexSwiper'
import IndexNav from './components/IndexNav'
import IndexBottomTabbar from './components/IndexBottomTabbar'

export default {
  name: 'IndexBottomTabbar',
  data () {
    return {
      selected: 'tabbar1',
      tabItemData: [
        {
          id: 'tabbar1',
          imgSrc: '/static/icons/find_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/find_icon_Tabbar_active@2x.png',
          text: '发现',
          selected: true
        },
        {
          id: 'tabbar2',
          imgSrc: '/static/icons/story_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/story_icon_Tabbar_active@2x.png',
          text: '国际品牌',
          selected: false
        },
        {
          id: 'tabbar3',
          imgSrc: '/static/icons/logo@2x.png',
          imgSrcSelect: '/static/icons/logo_active@2x.png',
          text: '',
          selected: false
        },
        {
          id: 'tabbar4',
          imgSrc: '/static/icons/story_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/story_icon_Tabbar_active@2x.png',
          text: '故事',
          selected: false
        },
        {
          id: 'tabbar5',
          imgSrc: '/static/icons/person_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/person_icon_Tabbar_active@2x.png',
          text: '我',
          selected: false
        }
      ]
    }
  },
  watch: {
    selected: function (val) {
      let num = val.charAt(val.length - 1)
      for (let i = 0; i < this.tabItemData.length; i++) {
        this.tabItemData[i].selected = false
      }
      this.tabItemData[num - 1].selected = true
    }
  },
  mounted () {
    this.$refs.wrapper.style.height = document.documentElement.clientHeight - this.$refs.mtTabbar.$el.offsetHeight + 'px'
    this.scroll = new BScroll(this.$refs.wrapper, {
      bounce: {
        top: true,
        bottom: true
      },
      scrollY: true,
      click: true
    })
  },
  methods: {
  },
  components: {
    CommonHeader,
    IndexHeader,
    IndexSwiper,
    IndexNav,
    IndexBottomTabbar,
    BScroll,
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem
  }
}
</script>
<style lang="stylus" >
.indexTabbar
  padding 0 50px
  .goodsContainer
    display flex
    justify-content space-around
    flex-wrap wrap
    .goodsItem
      margin-bottom 140px
    .moreGoods
      width 382px
      a
        display block
        width 252px
        height 252px
        border 4px solid #808080
        font-size 40px
        color #808080
        line-height 56px
        text-align center
        margin 0 auto
        margin-top 157px
        padding-top 76px
  .mint-navbar
    height 219px
    line-height 219px
    text-align left
    justify-content space-between
  .mint-navbar .mint-tab-item
    padding 0
    padding-top 45px
    flex none
    .mint-tab-item-label
      height 130px
      line-height 130px
      font-size 46px
      color #333
      font-weight 600
      vertical-align top
  .mint-navbar .mint-tab-item.is-selected
    border 0
    .mint-tab-item-label
      display inline-block
      position relative
      font-size 76px
    .mint-tab-item-label::before
      content ''
      position absolute
      width 70%
      height 8px
      background-color #333
      left 50%
      transform translateX(-50%)
      bottom 0
  .mint-tabbar
    height 148px
    line-height 148px
    font-size 30px
    color #CCCCCC
    background-color #fff
    z-index 9999
  .mint-tab-item
    padding-top 35px
  .mint-tab-item:nth-child(3)
    .mint-tab-item-icon
      width 114px
      height 127px
      margin-top -25px
  .mint-tab-item-icon
    width 60px
    height 60px
    margin-bottom 17px
  .mint-tabbar > .mint-tab-item.is-selected
    color #BA825A
  .mint-tabbar > .mint-tab-item.is-selected
    background-color #fff
</style>
<style lang="stylus" scoped>
.indexTabbar
  padding 0 50px
  height 100%
  .goodsContainer
    display flex
    justify-content space-around
    flex-wrap wrap
    .goodsItem
      margin-bottom 140px
    .moreGoods
      width 382px
      a
        display block
        width 252px
        height 252px
        border 4px solid #808080
        font-size 40px
        color #808080
        line-height 56px
        text-align center
        margin 0 auto
        margin-top 157px
        padding-top 76px
  .mint-navbar
    height 219px
    line-height 219px
    text-align left
    justify-content space-between
  .mint-navbar .mint-tab-item
    padding 0
    padding-top 45px
    flex none
    .mint-tab-item-label
      height 130px
      line-height 130px
      font-size 46px
      color #333
      font-weight 600
      vertical-align top
  .mint-navbar .mint-tab-item.is-selected
    border 0
    .mint-tab-item-label
      display inline-block
      position relative
      font-size 76px
    .mint-tab-item-label::before
      content ''
      position absolute
      width 70%
      height 8px
      background-color #333
      left 50%
      transform translateX(-50%)
      bottom 0
  .mint-tabbar
    height 148px
    line-height 148px
    font-size 30px
    color #CCCCCC
    background-color #fff
    z-index 9999
  .mint-tab-item
  .mint-tab-item:nth-child(3)
    .mint-tab-item-icon
      width 114px
      height 127px
      margin-top -25px
  .mint-tab-item-icon
    width 60px
    height 60px
    margin-bottom 17px
  .mint-tabbar > .mint-tab-item.is-selected
    color #BA825A
  .mint-tabbar > .mint-tab-item.is-selected
    background-color #fff
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
.wrapper
  height 100%
  .mint-tab-container
    margin-bottom 148px
</style>
