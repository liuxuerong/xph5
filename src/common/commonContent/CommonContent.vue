<template>
  <div class="commonContent">
    <div class="goodsItemsContainer" ref="goodsItemsContainer">
      <div v-for="item in goodsItems" :key="item.id">
        <div class="goodsItems">
          <div>
            <img :src="imageUrl+item.coverImage" alt="" :key="item.coverImage">
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="price">
              <div>
                <span>￥{{item.minPrice}}</span>
                <del>￥{{item.marketPrice}}</del>
              </div>
            </div>
            <div class="promotion" v-if="item.activityLabels&&item.activityLabels.length>0">
              <span class="promotionItem" :class="{gray:lables.color==2}" v-for="(lables,index) in item.activityLabels" :key="index">{{lables.labelName}}</span>
            </div>
            <div class="seeMore">查看详情</div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="detailsContent" v-html="content" v-if="content!==''">
    </div>
  </div>
</template>

<script>
import dsbridge from 'dsbridge'
import { getUrlParam } from '@/func/params'
import wx from 'weixin-js-sdk'
import {
  config
} from 'util/config.js'
export default {
  name: 'CommonContent',
  data () {
    return {
      content: '',
      contentArr: [],
      imageUrl: config.imageUrl,
      platform: ''
    }
  },
  props: {
    goodsItems: Array,
    details: Object
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    goodsDetail (goodsId) {
      this.platform = getUrlParam('platform')
      if (this.platform === 'wx') {
        wx.miniProgram.navigateTo({
          url: '../productDetails/productDetails?id=' + goodsId
        })
      } else if (this.platform === 'i' || this.platform === 'a') {
        dsbridge.call('goodsDetail', goodsId, function (v) {
          alert(v)
        })
      } else {
        this.$router.push(`/details/${goodsId}`)
      }
    },
    addMethods () {
      let goodsItem = document.getElementsByClassName('goodsItems')
      let len = this.goodsItems.length
      let _this = this
      for (let i = len; i < len * 2; i++) {
        if (goodsItem[i]) {
          goodsItem[i].addEventListener('click', function () {
            _this.goodsDetail(_this.goodsItems[i - len].id)
          })
        }
      }
    },
    updateContent () {
      const goodsItems = this.$refs.goodsItemsContainer.children
      this.contentArr = this.details.content.split('{')
      let newArr = []
      for (let i = 0; i < this.contentArr.length; i++) {
        let innerArr = this.contentArr[i].split('}')
        for (let j = 0; j < innerArr.length; j++) {
          if (innerArr[j] !== '') {
            newArr.push(innerArr[j])
          }
        }
      }
      let j = 0
      for (let i = 0; i < newArr.length; i++) {
        if (!isNaN(newArr[i])) {
          let goods = goodsItems[j].innerHTML
          newArr[i] = goods
          j++
        }
      }
      this.content = newArr.join('')
      this.addMethods()
    }

  },
  mounted () {
    this.updateContent()
    this.returnTitle(this.details.title.trim())
  },
  updated () {
    this.updateContent()
  }

}
</script>

<style lang="stylus" scoped>
  .goodsItemsContainer
    display none
  .goodsItems
    display flex
    padding 30px
    background-color #FAFAFA
    margin-bottom 50px
    img
      width 230px
      height 230px
      margin-right 35px
    .right
      flex 1
      position relative
      .name
        font-size 40px
        font-weight 600
        margin-bottom 40px
        color #333
      .price
        span
          font-size 40px
          display inline-block
          margin-right 20px
          color #333
        del
          color #999999
      .seeMore
        position absolute
        width 200px
        height 80px
        line-height 80px
        text-align center
        border 1px solid #BA825A
        color #BA825A
        font-size 40px
        right 0
        bottom 0
.promotion
  font-size 0
  display inline-block
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 0 20px
    height 50px
    line-height 50px
    border 1px solid #D54B4B
    display inline-block
    margin 0 12px
    margin-top 23px
    font-weight normal
  .promotionItem.gray
    background-color  #F5F5F5
    border none
    color #999999
</style>

<style lang="stylus">
  .detailsContent
    text-align left
    padding 100px 50px 100px
    color #262626
    font-size 40px
    line-height 70px
    p
      text-align left!important
      color #262626
      font-size 40px
      line-height 70px
    img
      display block
      width 100%
      margin 50px 0
</style>
