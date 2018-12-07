<template>
  <div class="xpCart">
    <common-nav-header :title="title">
      <div class="edit"  v-if="goodsList.length" @click.prevent="changeShowModify()">
        {{text}}
      </div>
    </common-nav-header>
    <div class="goodsWrap" ref="goodsWrap">
      <div>
        <div v-if="cartList.length">
          <goods-item  v-for="item in cartList" :key="item.id" :goodsItem="item" :showModify="showModify"></goods-item>
        </div>
        <div class="disabledWrap" v-if="disabledCartList.length" >
          <div class="empty" @click="emptyNoInventory">清空失效商品</div>
          <goods-item  v-for="item in disabledCartList" :key="item.id" :goodsItem="item" :disabled="true"></goods-item>
        </div>
        <divider v-if="noMore&&goodsList.length">已经到达最底部</divider>
      </div>
      <common-empty v-if="goodsList.length<1" :emptyObj="emptyObj"/>
    </div>
    <cart-operate  v-if="goodsList.length" :showModify="showModify" :page="page" :rows="rows"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import GoodsItem from './components/GoodsItem'
import CartOperate from './components/CartOperate'

import {
  Toast
} from 'mint-ui'
import {
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  listCart,
  delCart
} from 'util/netApi'
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import { cartGoods } from 'util/const'
import {storage} from 'util/storage'
export default {
  name: 'Cart',
  components: {
    CommonEmpty,
    CommonNavHeader,
    GoodsItem,
    CartOperate,
    Divider
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
      text: '编辑',
      page: 1,
      noMore: false,
      totals: 0,
      rows: 20
    }
  },
  watch: {
    goodsList: function (v) {
      this.cartList = []
      this.disabledCartList = []
      for (let i = 0; i < v.length; i++) {
        if (v[i].status === '1') {
          this.cartList.push(v[i])
        } else {
          this.disabledCartList.push(v[i])
        }
      }
    },
    '$route' (to, from) {
      if (to.name === 'Cart') {
        this.page = 0
        this.getCartList()
      }
      if (from.path === '/cart/1' && to.path === '/cart') {
        this.$router.go(-1)
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
    clearNum: state => state.cart.clearNum,
    isAllSelect: state => state.cart.isAllSelect
  }),
  methods: {
    ...mapMutations(['changeGoodsList', 'changeClearNum', 'changeIsAllSelect']),
    ...mapActions(['refreshCart']),
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
              if (!this.isAllSelect) {
                cartList[i].value = false
              } else {
                cartList[i].value = true
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
      if (this.showModify) {
        this.text = '完成'
        // 修改购物车数量
      } else {
        this.text = '编辑'
      }
    },
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
    }
  },
  mounted () {
    this.refreshCart({isAllSelect: false, goodsList: [], clearNum: []})
    let goods = storage.getLocalStorage(cartGoods)
    if (goods) {
      for (let i in goods.goodsList) {
        if (goods.goodsList[i].num > goods.goodsList[i].stock) {
          goods.goodsList[i].value = false
        }
      }
      this.changeGoodsList(goods.goodsList)
      this.page = goods.page
      this.rows = goods.rows
      storage.delLocalStorage(cartGoods)
      this.scrollInit()
      // this.noMore = true
    } else {
      this.getCartList()
    }
  },
  destroyed () {
    this.refreshCart({isAllSelect: false, goodsList: [], clearNum: []})
  }
}
</script>

<style lang="stylus" scoped>
  .xpCart
    height 100%
    padding-top 120px
    padding-bottom 148px
    .edit
      font-size 40px
      color #262626
      position absolute
      right 50px
      top 0
    .goodsWrap
      height 100%
    .commonEmpty
      background-color #fff
.disabledWrap
  .empty
    height 138px
    line-height 138px
    text-align right
    padding-right 50px
    font-size 40px
    color #BA825A
</style>
