<template>
  <div class="activitiesInterest" :class="{wrapperTitle:titleShow}">
    <userinfo-header :class="{hide:titleShow}" :title="title" oper=""></userinfo-header>
    <div class="activitysContent" ref="activitysContent">
      <div class="bscroll-container">
        <activity-elies v-if="activityInfo" v-for="item in activityInfo" :key="item.eliesItems" :activityInfoData="item"></activity-elies>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
import ActivityElies from './components/ActivityElies'
import UserinfoHeader from '@/pages/person/components/ComUserSetHeader'
import BScroll from 'better-scroll'
import { activityInfo } from 'util/netApi'
import {http} from 'util/request'
export default {
  name: 'ActivitiesInterest',
  data () {
    return {
      title: '感兴趣的活动',
      titleShow: false,
      activityInfo: null // 活动分类
    }
  },
  components: {
    UserinfoHeader,
    ActivityElies
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    activitiesInterestRender () {
      this.platform = getUrlParam('platform')
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.titleShow = true
        this.returnTitle(this.title)
      }
      http(activityInfo).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          let data = response.data.body
          this.activityInfo = data.articles
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.activitysContent, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  },
  mounted () {
    this.activitiesInterestRender()
  }
}
</script>
<style lang="stylus" scoped>
  .wrapperTitle.activitiesInterest
    padding-top 0
  .hide
    display none
  .activitiesInterest
    width 100%
    height 100%
    box-sizing border-box
    padding-top 130px
    .activitysContent
      width 100%
      height 100%
      background #F5F5F5
      .bscroll-container
        box-sizing border-box
        padding-top 54px
        padding-bottom 50px
</style>
