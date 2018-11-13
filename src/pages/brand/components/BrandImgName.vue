<template>
  <div class="brandImgName" ref="brandImgName">
    <ul>
      <li v-for="item in articles" :key="item.id" class="item">
        <router-link :to="'/brandDetails/'+item.id">
          <img :src="imageUrl+item.bandCoverImage" alt="">
          <div class="name">{{item.title}}</div>
          <div class="subName">{{item.subTitle}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  config
} from 'util/config.js'
export default {
  name: 'BrandImgName',
  components: {},
  props: {
    articles: Array
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  },
  computed: {},
  watch: {},
  methods: {
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.brandImgName, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  mounted () {
    this.scrollInit()
  }
}
</script>

<style lang="stylus" scoped>
.brandImgName
  width 100%
  padding 0 50px
  height calc(100% - (400px))
  ul
    padding-top 184px
  .item
    position relative
    width 100%
    height 398px
    margin-bottom 32px
    img
      width 100%
      height 100%
      position absolute
    .name
      position absolute
      width 100%
      text-align center
      font-size 56px
      color #fff
      top 146px
    .subName
      position absolute
      width 100%
      text-align center
      font-size 36px
      color #fff
      top 230px
</style>
