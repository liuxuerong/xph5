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
          <goods-item  v-for="(item,index) in cartList" :key="index" :goodsItem="item" :showModify="showModify"></goods-item>
        </div>
        <div class="disabledWrap" v-if="disabledCartList.length" >
          <div class="empty" @click="emptyNoInventory">清空失效商品</div>
          <goods-item  v-for="item in disabledCartList" :key="item.id" :goodsItem="item" :disabled="true"></goods-item>
        </div>
      </div>
      <common-empty v-if="goodsList.length<1" :emptyObj="emptyObj"/>
    </div>
    <cart-operate  v-if="goodsList.length" :showModify="showModify"/>
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
  http
} from 'util/request'
import {
  listCart,
  delCart
} from 'util/netApi'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'Cart',
  components: {
    CommonEmpty,
    CommonNavHeader,
    GoodsItem,
    CartOperate
  },
  data () {
    return {
      title: '购物车',
      emptyObj: {
        emptyImg: '/static/images/commentEmptyCart.png',
        emptyBold: '购物车是空的',
        emptyP: '好多新上架的商品在等着您哟~',
        buttonText: '去购物',
        buttonRouter: '/goods'
      },
      cartList: [],
      disabledCartList: [],
      showModify: false,
      text: '编辑'
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
        this.getCartList()
      }
    }
  },
  computed: mapState({
    goodsList: state => state.cart.goodsList
  }),
  methods: {
    ...mapMutations(['changeGoodsList']),
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.goodsWrap, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    },
    getCartList () {
      http(listCart).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          let cartList = res.data.body
          for (let i = 0; i < cartList.length; i++) {
            cartList[i].value = false
            if (cartList[i].status === '1') {
              this.cartList.push(cartList[i])
            } else {
              this.disabledCartList.push(cartList[i])
            }
          }
          this.changeGoodsList(cartList)
        }
        this.scrollInit()
      }).catch(err => {
        console.log(err)
      })
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
    console.log(789)
    this.getCartList()
  }
}
</script>

<style lang="stylus" scoped>
  .xpCart
    height 100%
    padding-top 120px
    // background-color #F5F5F5
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
