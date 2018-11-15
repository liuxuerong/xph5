<template>
  <div class="indexNavSwiper">
    <h4>{{swiperData.name}}</h4>
    <div class="swiperContainer">
      <span v-if="swiperData.title">
        <h3 class="title">
          {{swiperData.title}}
        </h3>
      </span>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData.articles" :key="item.id">
          <router-link :to="isShowImgTitle?'/goods':'/details/'+item.goodsId" class="swiperHref">
            <img v-lazy="imageUrl+item.articleCoverImage" alt="">
            <span v-if="isShowImgTitle" class="routerTitle">{{item.title}}</span>
            <!-- <div class="cutDown">
              <h6>{{item.title}}</h6>
              <div class="price">
                <em class="goodsPrice">{{item.goodsPrice}}</em>
                <del>{{item.goodsPrice}}</del>
                <em class="tag">距结束{{item.createTime}}</em>
              </div>
            </div> -->
            <index-content :content="item" v-if="showContent" />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  config
} from 'util/config.js'
import IndexContent from './IndexContent'
export default {
  name: 'IndexNavSwiper',
  components: {
    swiper,
    swiperSlide,
    IndexContent
  },
  props: {
    swiperData: Object,
    showContent: Boolean,
    isShowImgTitle: Boolean,
    swiperOption: {
      type: Object,
      default: function () {
        return {
          spaceBetween: 15,
          slidesPerView: 1.1,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
        }
      }
    }
  },
  data () {
    return {
      // swiperOption: {
      //   spaceBetween: 15,
      //   slidesPerView: 1.1,
      //   pagination: {
      //     el: '.swiper-pagination',
      //     type: 'fraction'
      //   }
      // },
      navSwiperData: {},
      imageUrl: config.imageUrl
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
.indexNavSwiper
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    font-weight 600
  .swiperContainer
    position relative
    // height 400px
    .title
      position absolute
      width 100%
      color #FFFFFF
      text-align center
      z-index 5555
      font-size 56px
      top 50%
      transform translateY(-50%)
  .swiperHref
    display block
    width 100%
    color #333
    img
      width 100%
      height 600px
.routerTitle
  position absolute
  width 100%
  text-align center
  top 50%
  transform translateY(-50%)
  font-size 56px
  color #fff
</style>

<style lang="stylus">
.indexNavSwiper
  .swiper-container
    overflow visible
  .swiper-pagination-fraction
    top -125px
    text-align right
    color #333333
    font-size 60px
    height 60px
    .swiper-pagination-current
      font-size 60px
      font-weight 500
    .swiper-pagination-total
       font-size 40px
  .indexContent
    margin-top 0
  .swiper-slide
    box-shadow:0px 2px 26px 0px rgba(0, 0, 0, 0.1);
</style>
