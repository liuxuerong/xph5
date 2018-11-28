<template>
  <div class="xpIndex">
   <router-view/>
    <div class="tabbar border-top">
      <router-link :to="item.to" v-for="item in tabItemData" :key="item.id">
        <img :src=" $route.path === item.to ?item.imgSrcSelect:item.imgSrc" alt="">
       <span :class="{active: $route.path === item.to}"> {{item.text}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Find from '@/pages/find/Find'
import Classfiy from '@/pages/classify/Classify'
// import Brand from '@/pages/brand/Brand'
import Hall from '@/pages/hall/Hall'
import Story from '@/pages/story/Story'
import Person from '@/pages/person/PersonCenter'
export default {
  name: 'Index',
  components: {
    Find,
    Classfiy,
    Hall,
    Story,
    Person
  },
  data () {
    return {
      tabItemData: [
        {
          id: 'tabbar1',
          to: '/find',
          imgSrc: '/static/icons/find_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/find_icon_Tabbar_active@2x.png',
          text: '发现',
          selected: true
        },
        {
          id: 'tabbar2',
          to: '/classify',
          imgSrc: '/static/icons/classify_icon.png',
          imgSrcSelect: '/static/icons/classify_icon_active.png',
          text: '分类',
          selected: false
        },
        {
          id: 'tabbar3',
          to: '/hall',
          imgSrc: '/static/icons/logo@2x.png',
          imgSrcSelect: '/static/icons/logo_active@2x.png',
          text: '',
          selected: false
        },
        {
          id: 'tabbar4',
          to: '/story',
          imgSrc: '/static/icons/story_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/story_icon_Tabbar_active@2x.png',
          text: '故事',
          selected: false
        },
        {
          id: 'tabbar5',
          to: '/personCenter',
          imgSrc: '/static/icons/person_icon_Tabbar@2x.png',
          imgSrcSelect: '/static/icons/person_icon_Tabbar_active@2x.png',
          text: '我',
          selected: false
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.xpIndex
  height 100%
  .tabbar
    position fixed
    bottom 0
    z-index 9999997
    background-color #fff
    height 148px
    line-height 148px
    display flex
    width 100%
    justify-content space-around
    padding-top 16px
    a
      display inline-block
      width 160px
      text-align center
    img
      width 82px
      height 82px
      display block
      margin 0 auto
    span
      display block
      text-align center
      font-size 30px
      color #CCCCCC
      height 56px
      line-height 56px
      &.active
        color #BA825A
    a:nth-child(3)
      img
        width 114px
        height 117px
</style>
