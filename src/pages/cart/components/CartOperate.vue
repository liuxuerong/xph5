<template>
  <div class="cartOperate border-top">
    <div class="checkIcon"><check-icon :value.sync="check" @click.native="checkAll"> </check-icon></div>
    <span class="all" >全选</span>
    <span class="price" v-if="!showModify">￥{{price.toFixed(2)}}</span>
    <span class="btn" :class="{active:clearBtn}" v-if="!showModify" @click="buy">去结算</span>
    <span class="btn delBtn" :class="{active:clearBtn}" v-else @click="delCheck">删除所选</span>
  </div>
</template>

<script>
import {
  storage
} from 'util/storage'
import {
  goodsInfo
} from 'util/const.js'
import {
  http
} from 'util/request'
import {
  delCart
} from 'util/netApi'
import {
  CheckIcon
} from 'vux'
import {
  Toast
} from 'mint-ui'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'CartOperate',
  props: {
    showModify: Boolean
  },
  components: {
    CheckIcon,
    Toast
  },
  data () {
    return {
      check: false,
      price: 0,
      clearBtn: false
    }
  },
  computed: mapState({
    goodsList: state => state.cart.goodsList,
    clearNum: state => state.cart.clearNum,
    isAllSelect: state => state.cart.isAllSelect
  }),
  watch: {
    isAllSelect: function (v) {
      this.check = v
    },
    check: function (v) {
      this.changeIsAllSelect(v)
    },
    $route (to, from) {
      this.$router.go(0)
    },
    clearNum: {
      handler (v, oldVal) {
        if (v.length > 0) {
          this.clearBtn = true
        } else {
          this.clearBtn = false
        }
        let price = 0
        for (let i in v) {
          price += v[i].num * v[i].price
        }
        this.price = price
        return this.price
      },
      deep: true,
      immediate: true

    }
  },
  methods: {
    ...mapMutations(['changeGoodsList', 'changeIsAllSelect']),

    checkAll () {
      let goodsList = this.goodsList
      for (let i in goodsList) {
        if (this.check) {
          goodsList[i].value = true
          this.changeIsAllSelect(true)
        } else {
          this.changeIsAllSelect(false)
          goodsList[i].value = false
        }
      }
      this.changeGoodsList(goodsList)
    },
    delCheck () {
      let checkGoodsList = []
      let notCheckGoodsList = []
      let id = ''
      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].value) {
          id += (',' + this.goodsList[i].id)
          checkGoodsList.push(this.goodsList[i])
        } else {
          notCheckGoodsList.push(this.goodsList[i])
        }
      }
      id = id.substring(1, id.length)
      if (checkGoodsList.length) {
        http(delCart, [id]).then(res => {
          if (res.data.code === 0) {
            // this.show5 = true
            Toast({
              message: '删除成功',
              position: 'center',
              duration: 1000
            })
            this.changeGoodsList(notCheckGoodsList)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    buy () {
      if (this.clearNum.length === 0) {
        return
      }
      let goodsObj = {
        key: '',
        shippingMethod: '',
        favorableId: '',
        fromCart: true
      }
      goodsObj.goodsItems = []
      for (let i = 0; i < this.clearNum.length; i++) {
        if (this.clearNum[i].status === '1') {
          if (this.clearNum[i].value) {
            goodsObj.goodsItems.push({
              goodsId: this.clearNum[i].goodsId,
              goodsItemId: this.clearNum[i].goodsItemId,
              num: this.clearNum[i].num,
              stock: this.clearNum[i].stock
            })
          }
        }
      }
      storage.setLocalStorage(goodsInfo, goodsObj)
      this.$router.push('/createOrder')
    }
  }
}
</script>

<style lang="stylus" scoped>
.cartOperate
  position fixed
  bottom 0
  line-height 148px
  height 148px
  background-color #fff
  z-index 9999
  width 100%
  align-items center
  padding-left 60px
  color #262626
  font-size 46px
  justify-content space-between
  .checkIcon
    width 70px
    height 50px
    float left
    margin-top 40px
  .all
    width 230px
    float left
  .price
    width 300px
    text-align right
    float left
  .btn
    width 340px
    height 148px
    line-height 148px
    background-color #F0F0F0
    text-align center
    color #999999
    float right
    &.active
      color #ba825a
  .delBtn
    &.active
      color #D54B4B
</style>
