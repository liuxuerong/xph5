<template>
  <div class="detailsCommentSwiper" v-if="swiperData.length">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,i) in swiperData" :key="item.id">
        <div class="imgText">
          <div class="left">
            <p class="name">{{item.memberName.substr(0, 3) + '****' + item.memberName.substr(7)}}</p>
            <p class="commentText">{{item.comments}}
            </p>
          </div>
          <div class="commentImg">
            <div class="previewCon">
              <img :src="itemImg.src" alt="" v-for="(itemImg,index) in list[i]" :key="itemImg.src" @click="show(i,index)" class="previewer-demo-img">
              <div v-transfer-dom>
                <previewer :list="list[i]" ref="previewer" :options="options"></previewer>
              </div>
            </div>
            <div class="commentImgNum">{{list[i].length}}张</div>
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
  config
} from 'util/config.js'
import {
  getList
} from '@/func/preview'
import {
  Previewer,
  TransferDom
} from 'vux'
export default {
  name: 'DetailsCommentSwiper',
  directives: {
    TransferDom
  },
  props: {
    goodsComment: Object
  },
  components: {
    swiper,
    swiperSlide,
    Previewer
  },
  watch: {
    goodsComment (v) {
      console.log(v)
      const commemts = v
      if (commemts.totals) {
        this.swiperData = commemts.list
        this.comments = commemts
        this.list = getList(commemts.list)
      }
    }
  },
  methods: {
    show (i, index) {
      this.$refs.previewer[i].show(index)
    }
  },
  mounted () {
    console.log(this.goodsComment)
    const commemts = this.goodsComment
    if (commemts.totals) {
      this.swiperData = commemts.list
      this.comments = commemts
      this.list = getList(commemts.list)
    }
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 12,
        slidesPerView: 1.2
      },
      list: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      },
      swiperData: []
    }
  }
}
</script>

<style lang="stylus">
.detailsCommentSwiper
  .swiper-slide
    height 400px
    background rgba(255,255,255,1);
    padding 20px
    width 320px
  .commentImg>.previewCon
    width 100%
    height 100%
    overflow hidden
    img
      height 100%
      width 320px
.pswp__top-bar
  height 100px !important
  line-height 100px !important
.pswp__counter
  font-size 46px !important
  height 100px !important
  line-height 100px !important
.pswp__button--fs
  display none !important
.pswp
  z-index 19998 !important
.pswp__button--close
  display none !important
</style>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.detailsCommentSwiper
  height 400px
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
    width 320px
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
