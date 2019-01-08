<template>
  <div class="xpCart">
    <common-nav-header :title="title">
      <div class="edit" v-if="goodsList.length" @click.prevent="changeShowModify()">
        {{text}}
      </div>
    </common-nav-header>

    <div class="goodsWrap" ref="goodsWrap">
      <div>
        <div class="topWrap clearfix" v-if="goodsList.length">
          <div class="goodsNum fl" v-if="goodsList.length">
            共
            <i>{{totals}}</i> 件商品
          </div>
          <div @click="chooseCoupons" class="fr btn">
            优惠券</div>
        </div>
        <div v-if="cartList.length" class="abledWrap">
          <goods-item v-for="item in cartList" :key="item.id" :goodsItem="item" :showModify="showModify " @reselect="reselect" @refresh="getCartList"></goods-item>
        </div>
        <div class="disabledWrap" v-if="disabledCartList.length">
          <div class="empty">
            <div class="text">以下商品为失效商品，不可购买</div>
            <div  class="btn" @click="sureEmpty">清空失效商品</div></div>
          <goods-item v-for="item in disabledCartList" :key="item.id" :goodsItem="item" :disabled="true" @reselect="reselect"></goods-item>
        </div>
        <divider v-if="noMore&&goodsList.length">已经到达最底部</divider>
      </div>
      <common-empty v-if="goodsList.length<1" :emptyObj="emptyObj" />
    </div>
    <cart-operate v-if="goodsList.length" :showModify="showModify" :page="page" :rows="rows" @buy="changeData" :cartList="cartList"/>
    <order-pop-up :unsatisfactoryData="unsatisfactoryData" v-if="unsatisfactoryData.length" @remove="remove" @orderPopUpShow="orderPopUpShow"/>
    <details-pop-up :sku="sku" v-if="sku" :goods="goods" :goodsStatus="goodsStatus" :shoppingCartId="shoppingCartId" @addCart="addCart"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import GoodsItem from './components/GoodsItem'
import CartOperate from './components/CartOperate'
import DetailsPopUp from '../details/components/DetailsPopUp'
import {
  Toast
} from 'mint-ui'
import notice from 'util/notice'
import {
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  listCart,
  delCart,
  goodsDetail
} from 'util/netApi'
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import OrderPopUp from './components/OrderPopUp'
import {
  storage
} from 'util/storage'
import {
  couponByGoods
} from 'util/const.js'
export default {
  name: 'Cart',
  components: {
    CommonEmpty,
    CommonNavHeader,
    GoodsItem,
    CartOperate,
    Divider,
    OrderPopUp,
    DetailsPopUp
  },
  data () {
    return {
      title: '购物车',
      emptyObj: {
        emptyImg: '/static/images/commentEmptyCart.png',
        emptyBold: '购物车是空的',
        emptyP: '好多新上架的商品在等着您哟~',
        buttonText: '去购物',
        buttonRouter: '/find'
      },
      cartList: [],
      disabledCartList: [],
      showModify: false,
      text: '管理',
      page: 1,
      noMore: false,
      totals: 0,
      rows: 20,
      unsatisfactoryData: [],
      goodsId: '',
      goodsStatus: 1,
      goods: null,
      sku: null,
      shoppingCartId: ''
    }
  },
  watch: {
    goodsList: function (v) {
      this.cartList = []
      this.disabledCartList = []
      for (let i = 0; i < v.length; i++) {
        if (v[i].status === '1') {
          this.cartList.push(v[i]) // 能够编辑的
        } else {
          this.disabledCartList.push(v[i]) // 失效的
        }
      }
    },
    '$route' (to, from) {
      if (to.name === 'Cart') {
        this.page = 0
        this.getCartList()
      }
    },
    isAllSelect (v) {
      if (v) {
        this.rows = this.totals
        this.page = 1
        this.getCartList()
      } else {
        this.rows = 20
      }
    }
  },
  computed: mapState({
    goodsList: state => state.cart.goodsList,
    isAllSelect: state => state.cart.isAllSelect,
    clearNum: state => state.cart.clearNum
  }),
  methods: {
    ...mapMutations(['changeGoodsList', 'changeIsAllSelect', 'changeClearNum', 'changePopupVisible', 'changeFrom']),
    ...mapActions(['refreshCart', 'pushKeys']),
    // 重新选择
    reselect (goodsId, id) {
      this.shoppingCartId = id
      console.log(id)
      this.goodsId = goodsId
      this.changePopupVisible(true)
      // 商品详情
      if (this.goodsId !== '' || this.goodsId !== undefined) {
        http(goodsDetail, [this.goodsId])
          .then(res => {
            console.log(res)
            this.goodsStatus = res.data.body.status
            this.goods = res.data.body.goods
            this.changeFrom(2)
            this.pushKeys(res.data.body.goodsItems).then(res => {
              console.log(res, 122)
              this.sku = res
            }).catch(err => {
              console.log(err, 444)
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 加入之后重新刷新页面
    addCart () {
      this.$router.go(0)
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.goodsWrap, {
          scrollY: true,
          click: true,
          pullUpLoad: {
            threshold: -50,
            moreTxt: '加载更多',
            noMoreTxt: '没有更多数据了'
          },
          bounce: {
            top: true,
            bottom: true
          }
        })

        this.scroll.on('pullingUp', () => {
          this.page++
          this.getCartList()
          this.scroll.refresh()
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    },
    changeData (v) {
      this.unsatisfactoryData = v
    },
    remove () {
      let goodsList = this.goodsList
      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].num > goodsList[i].stock) {
          goodsList[i].value = false
        }
      }
      this.unsatisfactoryData = []
      this.refreshCart({
        isAllSelect: false,
        goodsList: goodsList,
        clearNum: []
      })
      // this.changeIsAllSelect(false)
      // this.changeGoodsList(goodsList)
      // this.changeClearNum(clearNum)
      // for (let i = 0; i < this.clearNum.length; i++) {
      //   if (this.clearNum[i].num < this.clearNum[i].stock) {
      //     this.clearNum[i].value = false
      //     this.changeIsAllSelect(false)
      //   }
      // }

      // goodsInfoCart.goodsItemsNew = []
      // for (let i = 0; i < goodsInfoCart.goodsItems.length; i++) {
      //   if (goodsInfoCart.goodsItems[i].num <= goodsInfoCart.goodsItems[i].stock) {
      //     goodsInfoCart.goodsItemsNew.push(goodsInfoCart.goodsItems[i])
      //   }
      // }
      // goodsInfoCart.goodsItems = goodsInfoCart.goodsItemsNew
    },
    orderPopUpShow (v) {
      if (!v) {
        this.unsatisfactoryData = []
      }
    },
    getCartList () {
      let parmas = {
        page: this.page,
        rows: this.rows
      }
      if (!this.noMore) {
        http(listCart, parmas).then(res => {
          if (res.data.code === 0) {
            this.totals = res.data.body.totals
            if (this.page !== 1 && res.data.body.list.length === 0) {
              this.scroll.finishPullUp()
              this.noMore = true
              return
            }
            let cartList = res.data.body.list
            for (let i = 0; i < cartList.length; i++) {
              // 假如为管理状态的话，所有库存不符合的也可以选择
              if (!this.isAllSelect) {
                cartList[i].value = false
              } else {
                if (this.showModify) {
                  cartList[i].value = true
                } else {
                  if (cartList[i].stock !== 0) {
                    cartList[i].value = true
                  }
                }
              }

              if (cartList[i].status === '1') {
                this.cartList.push(cartList[i])
              } else {
                this.disabledCartList.push(cartList[i])
              }
            }
            if (!this.isAllSelect) {
              cartList = [...this.goodsList, ...cartList]
            }
            this.changeGoodsList(cartList)
            this.scrollInit()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    changeShowModify () {
      this.showModify = !this.showModify
      this.changeIsAllSelect(false)
      if (this.showModify) {
        this.text = '完成'
        // 修改购物车数量
      } else {
        this.text = '管理'
      }
    },
    sureEmpty () {
      notice.confirm('是否确认清空全部失效商品？', '商品清空后将无法恢复', this.emptyNoInventory, '继续删除')
    },
    // 清除失效商品
    emptyNoInventory () {
      let id = ''
      for (let i = 0; i < this.disabledCartList.length; i++) {
        id += (',' + this.disabledCartList[i].id)
      }
      id = id.substring(1, id.length)
      http(delCart, [id]).then(res => {
        if (res.data.code === 0) {
          Toast({
            message: '清除成功',
            position: 'center',
            duration: 2000
          })
          this.changeGoodsList(this.cartList)
          this.disabledCartList = []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 使用优惠券
    chooseCoupons () {
      let couponArr = []
      for (let i = 0; i < this.cartList.length; i++) {
        couponArr[i] = {
          'goodsItemId': this.cartList[i].goodsItemId,
          'num': this.cartList[i].num
        }
      }
      storage.setLocalStorage(couponByGoods, couponArr)
      this.$router.replace('/chooseCoupons/1')
    }
  },
  mounted () {
    this.refreshCart({
      isAllSelect: false,
      goodsList: [],
      clearNum: []
    })
    this.getCartList()
    // let goods = storage.getLocalStorage(cartGoods)
    // if (goods) {
    //   for (let i in goods.goodsList) {
    //     if (goods.goodsList[i].num > goods.goodsList[i].stock) {
    //       goods.goodsList[i].value = false
    //     }
    //   }
    //   this.changeGoodsList(goods.goodsList)
    //   this.page = goods.page
    //   this.rows = goods.rows
    //   storage.delLocalStorage(cartGoods)
    //   this.scrollInit()
    //   // this.noMore = true
    // } else {
    //   this.getCartList()
    // }
  },
  destroyed () {
    this.refreshCart({
      isAllSelect: false,
      goodsList: [],
      clearNum: []
    })
  }
}
</script>

<style lang="stylus" scoped>
.xpCart >>> .v-modal
  z-index 99999999!important
.xpCart >>> .mint-popup
  z-index 999999999!important
.xpCart
  height 100%
  padding-top 120px
  padding-bottom 148px
  background #f5f5f5
  .edit
    font-size 40px
    color #666666
    position absolute
    right 50px
    top 0
    font-weight normal
  .goodsWrap
    height 100%
    &>div
      background #f5f5f5
      padding 0 50px
  .commonEmpty
    background-color #fff
.abledWrap
  background-color #fff
  border-radius 20px
.disabledWrap
  margin-top 30px
  background-color #fff
  border-radius 20px
  .empty
    display flex
    height 138px
    line-height 138px
    text-align right
    padding 0 50px
    font-size 040px
    justify-content space-between
    .btn
      color #BA825A
    .text
      color #666
.topWrap
  height 152px
  line-height 152px
  font-size #999999
  padding 0 50px
  font-size 40px
  .btn
    font-size 40px
    font-weight 600
    color #333
  i
    color #BA825A
</style>
