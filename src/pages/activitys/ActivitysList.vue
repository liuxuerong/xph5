<template>
  <div class="activitysWrapper">
    <userinfo-header :title="title" oper=""></userinfo-header>
    <div class="wrapperBg">
      <img src="" alt="">
      <ul class="activitysTab">
        <li v-for="(tab,i) in activitysTab" :key="i" :class="{'active':activitysActive==i}" @click="activitysTabClick(i)">{{tab}}</li>
      </ul>
    </div>
    <div class="activitysCon" v-if="activitysActive == 0">
      <!-- 单品秒杀 -->
      <div class="activityGoodsBox">
        <activitys-title v-if="activityGoods" :activitysTitle="activitysTitle[0]"></activitys-title>
        <activity-goods v-if="activityGoods" v-for="item in activityGoods" :key="item.goodsItemId" :activityGoods="item"></activity-goods>
      </div>
      <!-- 品类秒杀 -->
      <div class="activityCategoryBox">
        <activitys-title v-if="activityCategory" :activitysTitle="activitysTitle[1]"></activitys-title>
        <activity-category v-if="activityCategory" v-for="item in activityCategory" :key="item.goodsCategoryId" :activityCategory="item"></activity-category>
      </div>
    </div>
    <div class="activitysCon" v-if="activitysActive == 1">
      <activity-elies v-if="activityInfo" v-for="item in activityInfo" :key="item.eliesItems" :activityInfoData="item"></activity-elies>
    </div>
  </div>
</template>
<script src="https://unpkg.com/dsbridge/dist/dsbridge.js"></script>
<script>
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
      activitysTab: ['限时抢购', '门店活动'],
      activitysActive: Number,
      activitysTitle: [
        {'title': '单品秒杀', 'subTitle': '限时单品秒杀'},
        {'title': '品类秒杀', 'subTitle': '限时品类秒杀'}
      ],
      activityInfo: null, // 活动分类
      activityGoods: null, // 单品抢购
      activityCategory: null // 活动品类
    }
  },
  components: {
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
    // 页面初始化加载
    activitysRender () {
      let type = Number(this.$route.params.type)
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
      this.$router.push('/activitysList/' + type)
      if (type === 0) {
        // 商品
        http(activityElies).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            let data = response.data.body
            this.activityGoods = data.activityGoodss
            this.activityCategory = data.activotyCategorys
          }
        })
      } else {
        // 活动
        http(activityInfo).then((response) => {
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
