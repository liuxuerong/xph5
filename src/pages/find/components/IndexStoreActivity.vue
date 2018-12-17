<template>
  <div class="indexStoreActivity">
    <h4>门店活动</h4>
    <div class="swiperContainer">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,i) in swiperData" :key="item.id">
          <router-link :to="'/storyDetails/'+item.id" class="swiperHref">
            <img v-lazy="imageUrl+item.articleCoverImage" alt="" class="lazyImg">
            <div class="indexContent">
              <h5>
                {{item.title}}
              </h5>
              <div class="content">
                <p v-for="(v,k) in summary[i]" :key="k">
                  {{v}}
                </p>
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
  name: 'IndexStoreActivity',
  components: {
    swiper,
    swiperSlide,
    IndexContent
  },
  props: {
    swiperData: Array
  },
  methods: {
    resetSwiperData () {
      this.summary = this.swiperData.map(function (v, i) {
        return v.summary.split('\n')
      })
    }
  },
  data () {
    return {
      summary: [],
      swiperOption: {
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      navSwiperData: {},
      imageUrl: config.imageUrl
    }
  },
  mounted () {
    this.resetSwiperData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.indexStoreActivity
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
  padding 0 30px 30px 0
  h5
    height 100px
    line-height 100px
    font-size 46px
    font-weight 600
    color #333
    ellipsis()
    display block
  .content
    color #808080
    font-size 36px
    line-height 60px
    -webkit-line-clamp: 2
    ellipsisM()

</style>

<style lang="stylus">
.indexStoreActivity
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
