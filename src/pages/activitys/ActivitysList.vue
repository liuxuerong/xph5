<template>
  <div class="activitysWrapper" :class="{wrapperTitle:titleShow}">
    <userinfo-header :class="{hide:titleShow}" :title="title" oper=""></userinfo-header>
    <div class="wrapperBg">
      <img src="" alt="" id="ceshiId">
      <ul class="activitysTab" :class="{hide:(activityGoods.length===0 && activityCategory.length===0)}">
        <li v-for="(tab,i) in activitysTab" :key="i" :class="{'active':activitysActive==i}" @click="activitysTabClick(i)">{{tab}}</li>
      </ul>
    </div>
    <div class="activitysCon" v-if="activitysActive == 0 && (activityGoods.length!==0 || activityCategory.length!==0)">
      <!-- 单品秒杀 -->
      <div class="activityGoodsBox" v-if="activityGoods.length">
        <activitys-title :activitysTitle="activitysTitle[0]"></activitys-title>
        <activity-goods v-for="item in activityGoods" :key="item.goodsItemId" :activityGoods="item"></activity-goods>
      </div>
      <!-- 品类秒杀 -->
      <div class="activityCategoryBox" v-if="activityCategory.length">
        <activitys-title  :activitysTitle="activitysTitle[1]"></activitys-title>
        <activity-category v-for="item in activityCategory" :key="item.goodsCategoryId" :activityCategory="item"></activity-category>
      </div>
    </div>
    <div class="activitysCon" v-if="activitysActive == 1">
      <activity-elies v-if="activityInfo" v-for="item in activityInfo" :key="item.eliesItems" :activityInfoData="item"></activity-elies>
    </div>
  </div>
</template>

<script>
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
import UserinfoHeader from '@/pages/person/components/ComUserSetHeader'
import ActivitysTitle from './components/ActivitysTitle'
import ActivityElies from './components/ActivityElies'
import ActivityGoods from './components/ActivityGoods'
import ActivityCategory from './components/ActivityCategory'
import { activityInfo, activityElies } from 'util/netApi'
import {http} from 'util/request'
export default {
  data () {
    return {
      title: '活动精选',
      titleShow: false,
      activitysTab: ['限时抢购', '门店活动'],
      activitysActive: Number,
      activitysTitle: [
        {'title': '单品秒杀', 'subTitle': '限时单品秒杀'},
        {'title': '品类秒杀', 'subTitle': '限时品类秒杀'}
      ],
      activityInfo: null, // 活动分类
      activityGoods: [], // 单品抢购
      activityCategory: [], // 活动品类
      platform: ''
    }
  },
  components: {
    name: 'ActivitysList',
    UserinfoHeader,
    ActivitysTitle,
    ActivityElies,
    ActivityGoods,
    ActivityCategory
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'activitysList') {
        this.activitysRender()
      }
    }
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    // 页面初始化加载
    activitysRender () {
      let type = Number(this.$route.params.type)
      this.platform = getUrlParam('platform')
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.titleShow = true
        this.returnTitle(this.title)
      }
      this.activitysActive = type
      this.activitysCon(type)
    },
    // tab 切换
    activitysTabClick (index) {
      this.activitysActive = index
      this.activitysCon(index)
    },
    // 内容加载
    activitysCon (type) {
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.$router.replace(`/activitysList/${type}?platform=${this.platform}`)
      } else {
        this.$router.replace(`/activitysList/${type}`)
      }
      if (type === 0) {
        // 商品
        http(activityElies).then((response) => {
          if (response.data.code === 0) {
            let data = response.data.body
            console.log(data)
            if (JSON.stringify(data) !== '{}') {
              if (data.activityGoodss) {
                this.activityGoods = data.activityGoodss
              }
              if (data.activityCategorys) {
                this.activityCategory = data.activityCategorys
              }
            } else {
              if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
                this.$router.replace(`/activitysList/1?platform=${this.platform}`)
              } else {
                this.$router.replace('/activitysList/1')
              }
            }
          }
        })
      } else {
        http(activityElies).then((response) => {
          if (response.data.code === 0) {
            let data = response.data.body
            if (JSON.stringify(data) !== '{}') {
              if (data.activityGoodss) {
                this.activityGoods = data.activityGoodss
              }
              if (data.activityCategorys) {
                this.activityCategory = data.activityCategorys
              }
            } else {
              console.log(66)
            }
          }
        })
        // 活动
        http(activityInfo).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            let data = response.data.body
            // this.activityInfo = [...this.activityInfo, ...data.articles]
            this.activityInfo = data.articles
          }
        })
      }
    }
  },
  mounted () {
    this.activitysRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .hide
    display none
  .activitysWrapper.wrapperTitle
    padding-top 0
  .activitysWrapper
    width 100%
    overflow hidden
    box-sizing border-box
    padding-top 132px
    background #fff
  .wrapperBg
    width 100%
    height 430px
    position relative
    bgImage('/static/images/activitysListBg')
    img
      display block
      width 100%
      height 100%
  .activitysTab
    width 100%
    height 100px
    text-align center
    position absolute
    left 0
    bottom 50px
    li
      display inline-block
      width 280px
      height 100px
      font-size 40px
      color #999999
      margin-right 50px
      background #fff
      line-height 100px
      font-weight 600
      text-align center
    li.active
      font-size 46px
      color #333333
    li:last-child
      margin-right 0
  .activitysCon
    width 100%
    box-sizing border-box
    padding 70px 0
    border-radius 50px
    position relative
    top -50px
    background #fff
  .activityGoodsBox,
    width 100%
    box-sizing border-box
    padding-bottom 50px
    background #fff
  .activityCategoryBox
    width 100%
    background #fff
</style>
