<template>
  <div class="indexNewProducts">
    <h4>新品发布</h4>
    <div class="swiperContainer">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData" :key="item.id">
          <router-link :to="'/details/'+item.id" class="swiperHref">
            <img v-lazy="imageUrl+item.coverImage+imageAfterUrl" alt="" class="lazyImg">
            <div class="indexContent">
              <h5>
                <span class="title">{{item.name.substr(0,7)}}</span>
                <span class="price fr" v-if="item.minPrice!==0">{{item.minPrice}}元起</span>
              </h5>
              <div class="content">
                {{item.subName}}
              </div>
              <div class="promotion">
                <span class="promotionItem" :class="{gray:lables.color==2}" v-for="(lables,j) in item.activityLabels" :key="j">{{lables.labelName}}</span>
              </div>
            </div>
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
  name: 'IndexNewProducts',
  components: {
    swiper,
    swiperSlide,
    IndexContent
  },
  props: {
    swiperData: Array
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      navSwiperData: {},
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl
    }
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.indexNewProducts
  padding 0 50px 50px
  border-bottom 10px solid #F5F5F5
  margin-bottom 30px
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    font-weight 600
  .swiperContainer
    position relative
    width 94%
    margin 0 auto
  .swiperHref
    display block
    width 100%
    color #333
    min-height 600px
    img
      width 100%
      height 512px
    .lazyImg[lazy=loading]
      width 300px
      height 300px
      margin 90px auto
      display block
.indexContent
  padding 0 30px 30px
  text-align left
  h5
    height 100px
    line-height 100px
    font-size 46px
    font-weight 600
    display flex
    .title
      color #333
      ellipsis()
      flex 1
      display inline-block
    .price
      font-size 40px
  .content
    color #808080
    font-size 36px
    line-height 60px
    ellipsis()
.promotion
  font-size 0
  height 100px
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 0px 20px
    height 50px
    line-height 50px
    border 1px solid #D54B4B
    display inline-block
    margin 0 30px 0 0
    margin-top 23px
  .promotionItem.gray
    background-color  #F5F5F5
    border none
    color #999999
</style>

<style lang="stylus">
.indexNewProducts
  .swiper-container
    overflow visible
  .swiper-pagination-fraction
    top -125px
    text-align right
    color #333333
    font-size 60px
    height 60px
    right -30px
    left auto
    .swiper-pagination-current
      font-size 60px
      font-weight 500
    .swiper-pagination-total
       font-size 40px
  .indexContent
    margin-top 0

</style>
