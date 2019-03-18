<template>
  <div class="activitysWrapper" :class="{wrapperTitle:titleShow}">
    <userinfo-header :class="{hide:titleShow}" :title="title" oper></userinfo-header>
    <div class="isEmpty" v-if="!isEmpty">
      <div class="wrapperBg">
        <img src alt id="ceshiId">
      </div>
      <div class="activitysCon" v-if="activityGoods.length!==0 || activityCategory.length!==0">
        <!-- 单品秒杀 -->
        <div class="activityGoodsBox" v-if="activityGoods.length">
          <activitys-title :activitysTitle="activitysTitle[0]"></activitys-title>
          <activity-goods
            v-for="item in activityGoods"
            :key="item.goodsItemId"
            :activityGoods="item"
          ></activity-goods>
        </div>
        <!-- 品类秒杀 -->
        <div class="activityCategoryBox" v-if="activityCategory.length">
          <activitys-title :activitysTitle="activitysTitle[1]"></activitys-title>
          <activity-category
            v-for="item in activityCategory"
            :key="item.goodsCategoryId"
            :activityCategory="item"
          ></activity-category>
        </div>
      </div>
    </div>
    <div class="isEmpty" v-else>
      <common-empty :emptyObj="emptyObj"/>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
import UserinfoHeader from '@/pages/person/components/ComUserSetHeader'
import ActivitysTitle from './components/ActivitysTitle'
import ActivityGoods from './components/ActivityGoods'
import ActivityCategory from './components/ActivityCategory'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import { activityElies } from 'util/netApi'
import { http } from 'util/request'
import emptyImg from '../../images/activeEmpty.png'
export default {
  name: 'ActivitysList',
  data () {
    return {
      title: '活动精选',
      titleShow: false,
      activitysTitle: [
        { title: '单品秒杀', subTitle: '限时单品秒杀' },
        { title: '品类秒杀', subTitle: '限时品类秒杀' }
      ],
      activityGoods: [], // 单品抢购
      activityCategory: [], // 活动品类
      platform: '',
      isEmpty: false,
      emptyObj: {
        emptyImg,
        emptyBold: '暂无活动',
        emptyP: '抱歉，当前暂无可参与的活动~',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    UserinfoHeader,
    ActivitysTitle,
    ActivityGoods,
    ActivityCategory,
    CommonEmpty
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
      })
    },
    // 页面初始化加载
    activitysRender () {
      this.platform = getUrlParam('platform')
      if (
        this.platform === 'i' ||
        this.platform === 'a' ||
        this.platform === 'wx'
      ) {
        this.titleShow = true
        this.returnTitle(this.title)
      }
      http(activityElies).then(response => {
        console.log(response)
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
            this.isEmpty = true
          }
        }
      })
    }
  },
  mounted () {
    this.activitysRender()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'

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
  background url('../../images/activitysListBg.png') no-repeat center center / 100% 100%
  img
    display block
    width 100%
    height 100%
.activitysCon
  width 100%
  box-sizing border-box
  padding 70px 0
  border-radius 50px
  position relative
  top -50px
  background #fff
.activityGoodsBox, width 100%
  box-sizing border-box
  padding-bottom 50px
  background #fff
.activityCategoryBox
  width 100%
  background #fff
.isEmpty >>> .commonEmpty img
  width 895px
  height 540px
</style>
