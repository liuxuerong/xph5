<template>
  <div class="indexTabbar" ref="wrapper">
    <mt-tabbar v-model="selected" fixed>
      <!-- <mt-tab-item
        v-for="item of tabItemData"
        :key="item.id"
        :id="item.id"
        @click="changeImg">
        <img slot="icon" :src="item.imgSrc">
        {{item.text}}
      </mt-tab-item> -->
    <mt-tab-item id="tabbar1">
        <img slot="icon" src="/static/icons/story_icon_Tabbar@2x.png">
        故事
      </mt-tab-item>
          <mt-tab-item id="tabbar2">
        <img slot="icon" src="/static/icons/story_icon_Tabbar@2x.png">
        故事
      </mt-tab-item>
      <mt-tab-item id="tabbar3">
        <img slot="icon" src="/static/icons/logo@2x.png">
      </mt-tab-item>
      <mt-tab-item id="tabbar4">
        <img slot="icon" src="/static/icons/story_icon_Tabbar@2x.png">
        故事
      </mt-tab-item>
      <mt-tab-item id="tabbar5">
        <img slot="icon" src="/static/icons/person_icon_Tabbar_@2x.png">
        个人
      </mt-tab-item>
    </mt-tabbar>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected">
      <mt-tab-container-item id="tabbar1">
        <div class="home">
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
        {'id': 'tabbar1', 'imgSrc': '/static/icons/find_icon_Tabbar@2x.png', 'imgSrcSelect': '/static/icons/find_icon_Tabbar@2x.png', 'text': '发现1'}, {'id': 'tabbar2', 'imgSrc': '/static/icons/find_icon_Tabbar@2x.png', 'imgSrcSelect': '/static/icons/find_icon_Tabbar@2x.png', 'text': '发现2'}
      ]
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
  },
  methods: {
    changeImg () {
      console.log(this.selected)
    }
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
    padding-top 16px
  .mint-tab-item:nth-child(3)
    .mint-tab-item-icon
      width 114px
      height 127px
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
</style>
<style lang="stylus" scoped>
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
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
</style>
