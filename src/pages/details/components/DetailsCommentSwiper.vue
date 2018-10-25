<template>
  <div class="detailsCommentSwiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperData" :key="item.adId">
        <div class="imgText">
          <div class="left">
            <p class="name">我就是昵称呀我就是昵称呀~</p>
            <p class="commentText">行间距
              内容这里是用户评论这里是这里是
              用户评论这里是这里是用户评
              这里是用户评论这里是论这行间距
              内容这里是用户评论这里是这里是
              用户评论这里是这里是用户评
              这里是用户评论这里是论这
            </p>
          </div>
          <div class="commentImg">
            <div class="previewCon">
              <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)" :key="index">
              <div v-transfer-dom>
                <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
              </div>
            </div>
             <div class="commentImgNum">３张</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  bannerList
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config.js'
import {
  Previewer,
  TransferDom
} from 'vux'
export default {
  name: 'DetailsCommentSwiper',
  directives: {
    TransferDom
  },
  components: {
    swiper,
    swiperSlide,
    Previewer
  },
  methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer[index].show(index)
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        spaceBetween: 12,
        slidesPerView: 1.2
      },
      list: [{
        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        w: 800,
        h: 400
      },
      {
        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
        w: 1200,
        h: 900
      }, {
        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
      }
      ],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
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
<style lang="stylus">
.detailsCommentSwiper
  .swiper-slide
    height 400px
    background rgba(255,255,255,1);
    padding 20px
  .commentImg>.previewCon
    width 100%
    height 100%
    overflow hidden
    img
      height 100%
      width 320px
.pswp__button--close
  display none !important
.pswp__button--fs
  display none !important
.pswp
  z-index 19998 !important
</style>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.detailsCommentSwiper
  height 360px
  padding 0 50px
  margin-bottom 34px
 .imgText
  display flex
  box-shadow 0px 0px 18px rgba(78,78,78,0.15)
  height 320px
  .left
    padding-left 30px
    flex 1
  .commentImg
    height 320px
    position relative
  .name
    font-size 40px
    height 124px
    line-height 124px
    font-weight 600
    color #262626
    width 80%
    ellipsis()
  .commentText
    color #262626
    font-size 36px
    line-height 60px
    ellipsisM()
    -webkit-line-clamp: 3
.commentImgNum
  position absolute
  top 20px
  right 20px
  z-index 30
  width 72px
  height 38px
  background rgba(0,0,0,0.5)
  border-radius 18px
  font-size 18px
  line-height 38px
  text-align center
  color #fff
</style>
