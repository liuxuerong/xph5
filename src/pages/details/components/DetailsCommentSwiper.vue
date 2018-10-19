<template>
  <div class="xpSwiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData" :key="item.adId">
          <router-link to="/">
            <div class="imgText">
              <div class="left">
                <p class="name"></p>
                <p class="commentText"></p>
              </div>
              <div class="commentImg">
                <previewer ref="previewer" :list="previewerList" :options="options">
                  <template slot="button-after">
                    <span class="previewer-delete-icon-box">
                      <img src="" width="22" height="22" class="previewer-delete-icon" @click.prevent.stop="removeImg">
                    </span>
                  </template>
                </previewer>
              </div>
            </div>
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
import { Previewer } from 'vux'
export default {
  name: 'DetailsCommentSwiper',
  components: {
    swiper,
    swiperSlide,
    Previewer
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        spaceBetween: 12,
        slidesPerView: 1.2,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      options: {
        isClickableElement: function (el) {
          // return /previewer-delete-icon/.test(el.className)
        },
        list: [
          {
            src: 'https://placekitten.com/800/400'
          },
          {
            src: 'https://placekitten.com/1200/900'
          }
        ]
      },
      swiperData: []
    }
  },
  mounted () {
    http(bannerList, ['find-banner'])
      .then(res => {
        this.swiperData = res.data.body
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="stylus" scoped>
.xpSwiper
  height 512px
  margin-top 48px
  padding 0 50px
  margin-bottom 34px
  .swiperHref
    display block
    width 100%
    height 512px
    img
      width 100%
      height 100%
</style>
<style lang="stylus">
.xpSwiper
  height 512px
  margin-top 48px
  padding 0 50px
  margin-bottom 34px
  .swiperHref
    display block
    width 100%
    height 512px
    img
      width 100%
      height 100%
</style>
