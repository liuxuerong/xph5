<template>
  <div class="hallDetailsContainer">
    <common-nav-header :title="experienceObj.categoryName" v-if="experienceObj" />
    <div ref="hallDetails" class="hallDetails" v-if="experienceObj">
      <img :src="imageUrl+experienceObj.experienceCoverImage" alt="" ref="zoomImg">
      <div class="tag" ref="tag" v-for="(item,index) in experienceObj.experienceGoods" :key="item.goodsId" :style="{left:item.left,top:item.top}" @click="showDetails(index)">
        <img src="/static/icons/hall_tag_icon.png" alt="">
      </div>
    </div>
    <div v-transfer-dom class="oneGoodsWrap">
      <popup v-model="showOne">
          <router-link :to="'/details/'+itemObj.goodId" v-if="itemObj">
          <div class="details">
            <img :src="imageUrl+itemObj.goodCoverImage" alt="">
            <div class="text">
              <span class="name">{{itemObj.goodName}}</span>
              <span class="price">￥{{itemObj.minPrice}}起</span>
              <p>{{itemObj.summary}}</p>
            </div>
          </div>
        </router-link>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show" class="goodsWrap">
        <div class="titlExa">样板间商品</div>

        <div class="details" v-if="experienceObj" v-for="(itemObj,index) in experienceObj.experienceGoods" :key="itemObj.goodId">
          <router-link :to="'/details/'+itemObj.goodId">
            <img v-lazy="imageUrl+itemObj.goodCoverImage" alt="">
          </router-link>
          <div class="text">
            <p class="name">{{itemObj.goodName}}</p>
            <div class="priceWrap">
              <span class="price">￥{{itemObj.minPrice}}起</span>
              <em class="collect" :class="{active:itemObj.collected==='1'}" @click.stop="doCollection(index,itemObj.goodId)"></em>
            </div>
          </div>
        </div>

      </popup>
    </div>
    <div class="morePic"><router-link :to="'/hallAtlas/'+(parseInt(index)+1)" class="link">更多图片</router-link>  <em @click="showAllDetails()">商品({{experienceObj.experienceGoods.length}})</em></div>
  </div>
</template>

<script>
import {
  Popup,
  TransferDom
} from 'vux'
import {
  doCollection
} from '@/func/collection'
import {
  Toast
} from 'mint-ui'
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
import notice from 'util/notice'
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
      showOne: false,
      itemObj: null,
      params: {
        collectionType: 1
      }
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
      this.showOne = true
      for (let i = 0; i < this.$refs.tag.length; i++) {
        this.$refs.tag[i].classList.remove('active')
      }
      this.$refs.tag[index].classList.add('active')
      this.itemObj = this.experienceObj.experienceGoods[index]
    },
    showAllDetails () {
      this.show = true
    },
    doCollection (index, goodId) {
      console.log(7889)
      let params = Object.assign({}, this.params, {collectionDataId: goodId})
      doCollection(params).then(res => {
        if (res.data.code === 0) {
          this.experienceObj.experienceGoods[index].collected = this.experienceObj.experienceGoods[index].collected === '1' ? '0' : '1'
          let message = this.experienceObj.experienceGoods[index].collected === '0' ? '取消成功' : '收藏成功'
          Toast({
            message: message,
            position: 'bottom',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    },
    show: function (val) {
      if (!val) {
        let tag = this.$refs.tag
        for (let i = 0; i < tag.length; i++) {
          tag[i].classList.remove('active')
        }
      }
    },
    experienceObj: function () {
      this.zoomInit()
      this.doPosition()
    }
  },
  created () {
    this.index = this.$route.params.index
    const _this = this

    if (!storage.getLocalStorage(experience)) {
      notice.errorModal('请返回体验馆主页', function () {
        _this.$router.push({
          path: '/hall'
        })
      })
    } else {
      this.experienceObj = storage.getLocalStorage(experience)[this.index]
      console.log(this.experienceObj)
    }
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.doPosition()
      }, 16)
    })
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
    color #fff
    font-size p2r(46)
    position absolute
    bottom 63px
    width 510px
    line-height 100px
    text-align center
    height 100px
    font-size 46px
    background:linear-gradient(-90deg,rgba(172,124,98,1),rgba(220,166,116,1));
    border-radius:50px;
    left 50%
    transform translateX(-50%)
    .link
      color #fff
    em
      border-left 1px solid #B08064
      padding-left 20px
  .tag
    width 300px
    height 300px
    position absolute
    transform translateX(-50%)
    transition all 0.5s
    img
      width 134px
      height 274px
      transform translateX(50%)
   .tag.active
      border 4px solid #fff
      background rgba(248,249,251,0.25)
      border-radius 50%
  .goodsWrap
    max-height 1376px !important
    height auto !important
    overflow-y auto
    background-color #f5f5f5
    padding 0 50px 70px
    border-top-left-radius 20px
    border-top-right-radius 20px
    .titlExa
      line-height 145px
      color #262626
      font-size 46px
    .details
      display flex
      margin-bottom 30px
      background-color #fff
      .text
        flex 1
        color #333
        .name
          height 166px
          color #262626
          line-height 166px
          font-size 46px
          font-weight 600
          ellipsis()
          width 90%
          vertical-align middle
        .priceWrap
          display flex
          justify-content space-between
          padding-right 60px
          align-items center
          .price
            font-size 46px
            font-weight 600
            display inline-block
            vertical-align middle
            height 100px
            line-height 100px
          .collect
            width 52px
            height 52px
            // margin-top 20px
            display inline-block
            bgImage("/static/icons/Collection_icon")
            &.active
                bgImage("/static/icons/Collection_icon_click")
      img
        width 260px
        height 260px
        margin-right 50px
.oneGoodsWrap
  .details
      padding 30px
      display flex
      margin-bottom 200px
      background-color #fff
      .text
        flex 1
        color #333
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
