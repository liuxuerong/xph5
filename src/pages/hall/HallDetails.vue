<template>
  <div class="hallDetailsContainer">
    <common-nav-header :title="experienceObj.categoryName" v-if="experienceObj" />
    <div ref="hallDetails" class="hallDetails">
      <img :src="imageUrl+experienceObj.experienceCoverImage" alt="" ref="zoomImg">
      <div class="tag" v-for="(item,index) in experienceObj.experienceGoods" :key="item.goodsId" :style="{left:item.left,top:item.top}" @click="showDetails(index)">
        <img src="/static/icons/hall_tag_icon.png" alt="">
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="details" v-if="itemObj">
          <img :src="imageUrl+itemObj.goodCoverImage" alt="">
          <div class="text">
            <span class="name">{{itemObj.goodName}}</span>
            <span class="price">￥{{itemObj.minPrice}}起</span>
            <p>{{itemObj.summary}}</p>
          </div>
        </div>
      </popup>
    </div>
   <router-link :to="'/hallAtlas/3'" class="morePic"> <i class="arrow"></i>更多图片 </router-link>
  </div>
</template>

<script>
import {
  Popup,
  TransferDom
} from 'vux'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import PinchZoom from '@/func/pinch-zoom'
import {
  config
} from 'util/config.js'
import {
  experience
} from 'util/const.js'
import {
  storage
} from 'util/storage.js'
export default {
  name: 'HallDetails',
  directives: {
    TransferDom
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      experienceObj: null,
      options: {},
      index: '',
      RealImgWidth: '',
      RealImgHeight: '',
      show: false,
      itemObj: null
    }
  },
  components: {
    CommonNavHeader,
    Popup
  },
  methods: {
    zoomInit () {
      this.zoom = new PinchZoom(this.$refs.hallDetails, this.options)
    },
    doPosition () {
      let imgUrl = this.$refs.zoomImg.src
      let img = new Image()
      img.src = imgUrl
      img.onload = function () {
        this.RealImgWidth = img.width
        this.RealImgHeight = img.height
      }
      let items = this.experienceObj.experienceGoods
      let hallDetails = this.$refs.hallDetails
      let hallDetailsWidth = hallDetails.clientWidth
      let hallDetailsHeight = hallDetails.clientHeight
      for (let i = 0; i < items.length; i++) {
        let locate = items[i].locate.split(',')
        this.experienceObj.experienceGoods[i].left = locate[0] / hallDetailsWidth * 100 + '%'
        this.experienceObj.experienceGoods[i].top = locate[1] / hallDetailsHeight * 100 + '%'
      }
    },
    showDetails (index) {
      this.show = true
      this.itemObj = this.experienceObj.experienceGoods[index]
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    },
    experienceObj: function () {
      this.zoomInit()
      this.doPosition()
    }
  },
  created () {
    this.index = this.$route.params.index
    this.experienceObj = storage.getLocalStorage(experience)[this.index]
  },
  mounted () {
    console.log(this.experienceObj)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .hallDetailsContainer
    position absolute
    height 100%
    width 100%
  .hallDetails
    position absolute
  .morePic
    color #262626
    font-size p2r(46)
    position absolute
    bottom 50px
    line-height 100px
    font-weight 600
    padding-left 100px
    &::before
      content ""
      position absolute
      border 1px solid #262626
      border-top none
      border-left none
      transform rotate(45deg)
      width 30px
      height 30px
      top 26px
      left 40px

  .tag
    width 300px
    height 300px
    position absolute
    transform translateX(-50%)
    img
      width 134px
      height 274px
      transform translateX(50%)
   .tag.active
      border 4px solid #fff
      background rgba(248,249,251,0.25)
      border-radius 50%
      transition all 1s
  .details
    padding 30px
    display flex
    margin-bottom 200px
    background-color #fff
    .text
      flex 1
      .name
        display inline-block
        height 166px
        line-height 166px
        font-size 46px
        font-weight 600
        float left
        ellipsis()
        width 60%
        vertical-align middle
      .price
        font-size 40px
        font-weight 600
        display inline-block
        vertical-align middle
        height 166px
        line-height 166px
        float right
      p
        color #808080
        font-size 36px
        line-height 50px
        ellipsisM()
        -webkit-line-clamp: 2
        width 100%
        float left
    img
      width 310px
      height 310px
      margin-right 28px
</style>

<style lang="stylus">
.hallDetailsContainer
  .pinch-zoom-container
    height 100% !important
  .vux-popup-dialog
    background-color rgba(255,255,255,0)
</style>
