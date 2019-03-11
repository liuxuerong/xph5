 <template>
  <div class="xpSwiperIndex">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData" :key="item.adId">
          <router-link :to="'/details/'+item.linkId" class="swiperHref">
            <img v-lazy="imageUrl+item.image+imageAfterUrl" alt="" class="lazyImg">
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { bannerList } from 'util/netApi'
import { http } from 'util/request'
import { config } from 'util/config.js'
export default {
  name: 'IndexSwiper',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperData: []
    }
  },
  mounted () {
    http(bannerList, ['find-banner']).then((res) => {
      this.swiperData = res.data.body
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style lang="stylus" scoped>
.xpSwiperIndex
  margin-top 50px
  padding 0 50px
  .swiperHref
    display block
    width 100%
    height 512px
    img
      width 100%
      height 100%
    .lazyImg[lazy=loading]
      width 300px
      height 300px
      margin 90px auto
      display block
</style>
<style lang="stylus">
.xpSwiperIndex
  .swiper-container
    height 628px
  .swiper-wrapper
    height 512px
   .swiper-slide
      width 100% !important
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet
    margin 10px
  .swiper-pagination-bullet
    border-radius 0
    width 23px
    height 8px
    display inline-block
    border-radius 100%
    background #333333
    opacity 0.4
  .swiper-pagination-bullet-active
    background #333333
    opacity 1
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets
    bottom 30px
</style>
