<template>
  <div class="activitysWrapper">
    <swiper :options="swiperOption">
      <swiper-slide class="swiperItem" v-for="item in activitysData" :key="item.id" @click.native="activitysList">
        <img :src="imageUrl+item.articleCoverImage" alt="">
        <!-- <h3 class="title" v-if="item.title">{{item.title}}</h3>
        <p class="subTitle" v-if="item.subTitle">{{item.subTitle}}</p>
        <span class="summary" v-if="item.summary">{{item.summary}}</span> -->
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import { config } from 'util/config'
export default {
  props: ['activitysData'],
  data () {
    return {
      imageUrl: config.imageUrl, // 图片路径
      swiperOption: {
        notNextTick: true,
        slidesPerView: 'auto',
        direction: 'horizontal',
        spaceBetween: 24,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // 列表
    activitysList () {
      this.$router.push('/activitysList/1')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .swiper-slide
    width 90%
  .swiperItem
    display block
    width 86%
    position relative
    height 325px
    img
      display block
      width 100%
      height 325px
    .title
      position absolute
      width 100%
      left 0
      top 82px
      font-size 42px
      font-weight bold
      color #333333
      text-align center
    .subTitle
      position absolute
      width 100%
      left 0
      top 130px
      font-size 28px
      color #000000
      text-align center
    .summary
      position absolute
      width 130px
      height 50px
      line-height 50px
      left 0
      right 0
      top 180px
      margin auto
      border 1px solid #D54B4B
      font-size 26px
      color #D54B4B
      text-align center
  .activitysWrapper
    width 100%
    height 400px
    overflow hidden
    background #fff
</style>
