<template>
  <div class="detailsOperate border-top">
    <div class="operateLeft">
      <span class="udesk" @click="contactService"></span>
      <span class="collect" :class="{active:collect}" @click="doCollection(params)"></span>
      <router-link to="/cart" class="cart">
        <i class="num" v-show="cartNum != 0">{{cartNum}}</i>
      </router-link>
    </div>
    <ul class="operateRight">
      <li class="border-left" :class="{disabled:goodsStatus!=1}" @click="popUpShowBuy">立即购买</li>
      <li class="border-left active" :class="{disabled:goodsStatus!=1}" @click="popUpShow">加入购物车</li>
    </ul>
  </div>
</template>

<script>
import {
  hasCollection,
  doCollection
} from '@/func/collection'
import {
  mapState,
  mapMutations
} from 'vuex'
import {
  http
} from 'util/request'
import {
  Toast
} from 'mint-ui'
import {
  cartNum,
  customerService
} from 'util/netApi'
import {storage} from 'util/storage'
import {accessToken} from 'util/const'
export default {
  name: 'DetailsOperate',
  data () {
    return {
      collect: false,
      params: null
    }
  },
  props: {
    goodsItems: Array,
    goodsStatus: Number
  },
  computed: mapState({
    details: state => state.details,
    maxCount: state => state.details.maxCount,
    cartNum: state => state.cart.cartNum,
    popupVisible: state => state.details.popupVisible

  }),
  watch: {
    $route (to, from) {
      if (to.name === 'Details') {
        this.$router.go(0)
      }
    },
    popupVisible: function (curval) {
      if (storage.getLocalStorage(accessToken)) {
        this.getCartNum()
      }
    }
  },
  methods: {
    ...mapMutations(['changePopupVisible', 'changeCartNum', 'changeFrom']),
    hasCollection (params) {
      let fnType = Object.prototype.toString.call(hasCollection(params)).slice(8, -1)
      if (fnType === 'Promise') {
        hasCollection(params).then(res => {
          this.collect = res.data.body
        }).catch(err => {
          console.log(err)
        })
      }
    },
    doCollection (params) {
      doCollection(params).then(res => {
        let message = this.collect ? '取消成功' : '收藏成功'
        Toast({
          message: message,
          position: 'bottom',
          duration: 1000
        })
        this.hasCollection(params)
      }).catch(err => {
        console.log(err)
      })
    },
    getCartNum () {
      http(cartNum).then(res => {
        this.changeCartNum(res.data.body)
      }).catch(err => {
        console.log(err)
      })
    },
    popUpShow () {
      if (this.goodsStatus === 1) {
        this.changeFrom(2)
        this.changePopupVisible(true)
      }
    },
    popUpShowBuy () {
      if (this.goodsStatus === 1) {
        this.changeFrom(3)
        this.changePopupVisible(true)
      }
    },
    // 联系客服
    contactService () {
      window.location.href = customerService
    }
  },
  created () {
    this.params = {
      collectionType: 1,
      collectionDataId: this.$route.params.goodsId
    }
  },
  mounted () {
    this.hasCollection(this.params)
    if (storage.getLocalStorage(accessToken)) {
      this.getCartNum()
    }
  }
}
</script>

<style lang="stylus" scoped>
.detailsOperate
  height 146px
  line-height 146px
  display flex
  .operateLeft
    display flex
    width 485px
    .udesk
      flex 1
      background: url('/static/icons/udesk_icon.png') no-repeat center center/40% 40%
    .collect
      flex 1
      background: url('/static/icons/collection_icon.png') no-repeat center center/40% 40%
    .cart
      flex 1
      background: url('/static/icons/cart_icon.png') no-repeat center center/40% 40%
      position relative
      .num
        position absolute
        width 46px
        height 46px
        line-height 46px
        text-align center
        border-radius 50%
        background-color #D54B4B
        color #fff
        top 0
        transform translate(-50%,50%)
        right 0
    .collect.active
      background: url('/static/icons/collection_icon_active.png') no-repeat center center/40% 40%
  .operateRight
    flex 1
    display flex
    li
      flex 1
      font-size 46px
      color #BA825A
      text-align center
    li.active
      background-color #F0F0F0
    li.disabled
      color #CCCCCC
</style>
