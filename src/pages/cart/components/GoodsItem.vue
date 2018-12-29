<template>
<div class="goodsWrap">
  <div class="goodsItem" :class="{disabled:disabled}">
    <label for="" class="border-bottom">
        <div class="checkIcon">
            <check-icon :value.sync="goodsItem.value">
            </check-icon>
            <div class="shadow" v-if="goodsItem.stock==0&&!showModify"></div>
          </div>
          <div class="goodsItemMain">
            <router-link :to="'/details/'+goodsItem.goodsId" class="linkDetails">
              <img v-lazy="imageUrl+goodsItem.goodsItemPic" alt="" >
              <img src="/static/images/soldOut.png" alt="" class="soldOut" v-if="goodsItem.stock==0&&goodsItem.status==1">
              </router-link>
            <div class="info">
              <div class="name">{{goodsItem.goodsItemName}}</div>
              <div class="describe">
                <span class="color" v-for="(item,index) in specs" :key="index">
                  <i v-if="index+1<specs.length">{{item}}/</i>
                  <i v-else>{{item}}</i>
                </span>
              </div>
              <div class="inventoryWrap" v-if="goodsItem.status==1&&goodsItem.stock!=0">
                <div class="inventory" v-if="goodsItem.stock<5&&goodsItem.stock>0&&goodsItem.status==1">
                库存紧张
                </div>
                <div class="inventory notEnough" v-if="goodsItem.stock<goodsItem.num&&goodsItem.stock!=0&&goodsItem.status==1&&goodsItem.stock>=5">
                  库存不足
                </div>
                <span class="modify fr" v-if="goodsItem.stock!=0">
                  <div class="num" ref="num">
                    <span class="sub fl" @click="subCount" :class="{disable:subDisabled}">_</span>
                    <input type="text" class="fl" v-model="goodsItem.num" @keyup="changeStyle">
                    <span class="add fr" @click="addCount" ref="add" :class="{disable:addDisabled}">+</span>
                  </div>
                </span>
              </div>
                <div class="opera able  fl" v-if="goodsItem.stock==0&&goodsItem.status==1&&goodsItem.stockAdequate">
                  <i class="text">请重新选择规格</i>
                  <div class="btn" @click="reselect(goodsItem.goodsId,goodsItem.id)">重新选择</div>
                </div>
              <div class="bottom clearfix " v-if="goodsItem.status==1">
                <i class="price fl" v-if="goodsItem.stock!=0">￥{{goodsItem.price.toFixed(2)}}</i>
                <div class="fr goodsOpera">
                  <i @click="doCollection(goodsItem.goodsId)">移入收藏</i>
                  <i>删除</i>
                </div>
              </div>

              <div class="bottom clearfix disabled"  v-if="goodsItem.status!=1">

                <div class="opera disabled fl">
                  <i class="text">商品已不能购买</i>
                  <div class="btn"  @click="contactService">联系客服</div>
                </div>
                <div class="fr goodsOpera">
                  <i @click="doCollection(goodsItem.goodsId)">移入收藏</i>
                  <i>删除</i>
                </div>
              </div>
            </div>
        </div>
      </label>

  </div>

</div>

</template>

<script>
import {
  http
} from 'util/request'
import {
  updateCart,
  customerService
} from 'util/netApi'
import {
  CheckIcon
} from 'vux'
import {
  config
} from 'util/config.js'
import {
  mapState,
  mapMutations
} from 'vuex'
import {
  Toast
} from 'mint-ui'
import {
  hasCollection,
  doCollection
} from '@/func/collection'

export default {
  name: 'GoodsItem',
  components: {
    CheckIcon

  },
  data () {
    return {
      imageUrl: config.imageUrl,
      specs: [],
      subDisabled: false,
      addDisabled: false
    }
  },
  props: {
    goodsItem: Object,
    showModify: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState({
    clearNum: state => state.cart.clearNum,
    goodsList: state => state.cart.goodsList,
    isAllSelect: state => state.cart.isAllSelect
  }),
  watch: {
    goodsItem: {
      handler (newVal, oldVal) {
        let goodsList = this.goodsList
        this.changeGoodsList(goodsList)
        let clearNum = []
        for (let i = 0; i < this.goodsList.length; i++) {
          if (this.goodsList[i].status === '1' && this.goodsList[i].stock !== 0) {
            if (this.goodsList[i].value) {
              clearNum.push(this.goodsList[i])
            } else {
              //  if (cartList[i].stock >= cartList[i].num && cartList[i].stock !== 0) {
              //       cartList[i].value = true
              //     }
              this.changeIsAllSelect(false)
            }
          }
        }
        this.changeClearNum(clearNum)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['changeClearNum', 'changeIsAllSelect', 'changeGoodsList']),
    // 重新选择派发给父组件
    reselect (v, id) {
      this.$emit('reselect', v, id)
    },
    // 处理规格
    getSpecs () {
      let specs = JSON.parse(this.goodsItem.specs)
      for (let i in specs) {
        this.specs.push(specs[i].value)
      }
    },
    // 是否收藏
    doCollection (goodsId) {
      let params = {
        collectionType: 1,
        collectionDataId: goodsId
      }
      let fnType = Object.prototype.toString.call(hasCollection(params)).slice(8, -1)
      if (fnType === 'Promise') {
        hasCollection(params).then(res => {
          this.collect = res.data.body
          if (this.collect) {
            Toast({
              message: '该商品已收藏',
              position: 'center',
              duration: 1000
            })
          } else {
            doCollection(params).then(res => {
              Toast({
                message: '收藏成功',
                position: 'center',
                duration: 1000
              })
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 联系客服
    contactService () {
      window.location.href = customerService
    },
    addCount () {
      this.goodsItem.num++
      this.changeStyle()
    },

    subCount () {
      this.goodsItem.num--
      this.changeStyle()
    },
    changeStyle () {
      if (this.goodsItem.num > this.goodsItem.stock) {
        this.addDisabled = true
        Toast({
          message: '数量超出库存范围',
          position: 'center',
          duration: 1000
        })
        this.goodsItem.num = this.goodsItem.stock

        if (this.goodsItem.stock === 0) {
          return
        }
      } else {
        this.doUpdateCart(this.goodsItem.num)
        this.addDisabled = false
      }
      if (this.goodsItem.num > 0) {
        this.doUpdateCart(this.goodsItem.num)
      }
      if (this.goodsItem.num < 2) {
        this.subDisabled = true
        this.goodsItem.num = 1
        // Toast({
        //   message: '不能再少了',
        //   position: 'center',
        //   duration: 2000
        // })
      } else {
        this.subDisabled = false
      }
    },
    doUpdateCart (val) {
      if (val > 0 && val <= this.goodsItem.stock) {
        updateCart.url = '/cart'
        updateCart.url = updateCart.url + '/' + this.goodsItem.id
        if (this.goodsItem.num !== '') {
          let params = {
            cartId: this.goodsItem.id,
            request: val
          }
          http(updateCart, params, 'noloading').then(res => {}).catch(err => {
            console.log(err)
          })
        }
      }
    }
  },
  mounted () {
    this.getSpecs()
    console.log(this.goodsItem)
  }
}
</script>

<style lang="stylus" scoped>

@import '~styles/mixins.styl'
  .goodsWrap
    height 100%
  .goodsWrap >>> .mint-popup
    z-index  99999999 !important
  .goodsWrap >>> .v-modal
    z-index  9999999 !important
  .num
    height 60px
    line-height 60px
    color #262626
    font-size 40px
    span
      display inline-block
      width 60px
      height 60px
      line-height 60px
      font-size 36px
      text-align center
      color #262626
      background-color #F5F5F5
      border-radius 50%
      vertical-align middle
    .sub
      line-height 34px
    span.disable
      color #ccc
    input
      width 134px
      height 60px
      line-height 60px
      margin-top 2px
      outline none
      text-align center
  .goodsItem
    padding 0 32px
    label
      display flex
      align-items center
    .checkIcon
      height 60px
      width 60px
      margin-right 30px
      position relative
    .shadow
      height 60px
      width 60px
      position absolute
      top 4px
      z-index 2
      border 3px solid #cccccc
      background-color #F5F5F5
      border-radius 50%
    .goodsItemMain
      flex 1
      display flex
      padding 90px 0
      .linkDetails
        width 286px
        height 286px
        margin-right 30px
        position relative
        img
          width 100%
          height 100%
        .soldOut
          position absolute
          width 70%
          height 70%
          top 15%
          left 15%
      .info
        flex 1
        .name
          color #333
          font-size 46px
          font-weight 600
          line-height 80px
          ellipsis()
          max-width 540px
        .describe
          color #999999
          font-size 36px
          line-height 50px
          span
            margin 15px 0
        .bottom
          color #000
          font-size 46px
          line-height 60px
          .tag
            background #F5F5F5
            color #DBDBDB
            height 50px
            line-height 50px
            font-size 32px
            width 127px
            text-align center
            margin-bottom 40px
          .modify
            display inline-block
            line-height 120px
            height 120px
            position relative
            .shadow
              width 100%
              height 100%
              position absolute
              z-index 2
              top 0
              left 0
          .price
            display inline-block
            line-height 60px
            font-size 46px
            color #333
.disabled .checkIcon>>>.vux-check-icon
  display none
.disabled.goodsItem .goodsItemMain .info .name
  color #ccc
.disabled.goodsItem .goodsItemMain .info .describe
  color #ccc
.disabled.goodsItem .goodsItemMain .info .bottom
  color #ccc
.inventoryWrap
  height 50px
  margin-bottom 40px
.inventory
  height 50px
  display inline-block
  line-height 50px
  background-color #F5F5F5
  font-size 32px
  padding 0 10px
  color #BA825A
.inventory.notEnough
  color #D54B4B
.opera
  font-size 36px
  width 100%
  display flex
  justify-content space-between
  align-items center
  .btn
    font-size 40px
    color #666
    display inline-block
    width 220px
    height 80px
    line-height 80px
    border-radius 40px
    text-align center
.opera.able
  i
    color #333333
  .btn
    color #BA825A
    border 2px solid #BA825A
.bottom .opera.disabled
  i
    color #666666
  .btn
    color #999999
    border 2px solid #999999
.goodsOpera
  display inline-block
  i
    color #999999
    font-size 36px
</style>

<style lang="stylus">
  .checkIcon .vux-check-icon
    line-height 60px
    position absolute
    width 60px
    height 60px
  .checkIcon .weui-icon-circle
    font-size 64px
  .checkIcon .weui-icon-success
    color #BA825A
    font-size 60px
  .checkIcon [class^="weui-icon-"]:before,.checkIcon [class*=" weui-icon-"]:before
    margin 0
  .checkIcon .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
    color #BA825A
  .vux-cell-primary
    div
      height 100px
      line-height 100px
.vux-cell-primary .vux-number-selector
  display inline-block
  font-size 46px
  height 100px
  padding 0
  width 100px
  border 2px solid #CCCCCC
  position relative
  svg
    fill #808080
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
.vux-cell-primary .vux-number-input
  width 140px !important
  height 100px
  font-size 46px
  color #262626
  border-top 2px solid #ccc
  border-bottom 2px solid #ccc
</style>
