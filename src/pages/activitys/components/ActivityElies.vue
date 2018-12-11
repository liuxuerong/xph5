<template>
  <div class="eliesItem" @click="activityInfoDetails(activityInfoData.id)">
    <img v-lazy="imageUrl+activityInfoData.articleCoverImage" alt="">
    <h3 class="activityTitle">{{activityInfoData.title}}</h3>
    <span class="activitySummary" v-if="activityInfoData.summary">{{activityInfoData.summary}}</span>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import { config } from 'util/config'
export default {
  props: {
    activityInfoData: Object
  },
  components: {
    name: 'activityElies'
  },
  data () {
    return {
      imageUrl: config.imageUrl // 图片路径
    }
  },
  methods: {
    // 详情跳转
    activityInfoDetails (id) {
      let platform = getUrlParam('platform')
      if (platform === 'i' || platform === 'a' || platform === 'wx') {
        this.$router.push(`/storyDetails/${id}?platform=${platform}`)
      } else {
        this.$router.push('/storyDetails/' + id)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .eliesItem
    width calc(100% - 100px)
    box-sizing border-box
    padding-bottom 52px
    margin 0 auto 58px
    box-shadow 0px 2px 26px 0px rgba(0, 0, 0, 0.1)
    img
      display block
      width 100%
      height 574px
      margin-bottom 20px
    .activityTitle
      width 100%
      height 120px
      box-sizing border-box
      padding 0 50px
      line-height 120px
      font-size 56px
      font-weight 600
      color #333333
    .activitySummary
      display block
      width 100%
      box-sizing border-box
      padding 0 50px
      line-height 60px
      font-size 36px
      color #808080
</style>
