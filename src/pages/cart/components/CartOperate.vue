<template>
  <div class="cartOperate border-top">
    <div class="checkIcon">
      <check-icon :value.sync="check" @click.native="checkAll"> </check-icon>
    </div>
    <span class="all">全选</span>
    <span class="price" v-if="!showModify"><i>合计：</i>￥{{price.toFixed(2)}}</span>
    <span class="btn" v-if="!showModify" @click="buy">结算<i>({{clearNum.length}})</i></span>
    <div class="btnWrap" v-else>
      <span class="collect" @click="collectBatch">移入收藏夹</span>
      <span class="delBtn" :class="{active:clearBtn}" @click="sureDel">删除</span>
    </div>
  </div>
</template>

<script>
import {
  storage
} from 'util/storage'
import {
  goodsInfo
  // cartGoods
} from 'util/const.js'
import {
  http
} from 'util/request'
import {
  delCart,
  batchCollection
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
import notice from 'util/notice'
export default {
  name: 'CartOperate',
  props: {
    showModify: Boolean,
    page: Number,
    roews: Number
  },
  components: {
    CheckIcon,
    Toast
  },
  data () {
    return {
      check: false,
      price: 0,
      clearBtn: false,
      unsatisfactoryData: []
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
    },
    showModify: function (v) {
      if (!v) {
        let goodsList = this.goodsList
        for (let i in goodsList) {
          if (goodsList[i].stock === 0) {
            goodsList[i].value = false
          }
        }
        this.changeGoodsList(goodsList)
      }
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
    // 批量移入收藏夹
    collectBatch () {
      let params = []
      for (let item of this.clearNum) {
        params.push({collectionDataId: item.goodsId, collectionType: 1})
      }

      http(batchCollection, params, 'noloading').then(res => {
        if (res.data.code === 0) {
          notice.alert('', '成功移入收藏夹，你可以在  我的-商品收藏  中找到。')
          this.delCheck(false)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    sureDel () {
      for (let v of this.goodsList) {
        if (v.value) {
          notice.confirm('是否确认删除选定商品？', '', this.delCheck, '删除')
          break
        }
      }
    },
    delCheck (toast = true) {
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
            if (toast) {
              Toast({
                message: '删除成功',
                position: 'center',
                duration: 1000
              })
            }

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
      this.unsatisfactoryData = []
      for (let i = 0; i < this.clearNum.length; i++) {
        if (this.clearNum[i].status === '1') {
          if (this.clearNum[i].value) {
            if (this.clearNum[i].num > this.clearNum[i].stock) {
              this.unsatisfactoryData.push(this.clearNum[i])
            } else {
              goodsObj.goodsItems.push(this.clearNum[i])
            }
          }
        }
      }

      // storage.setLocalStorage(cartGoods, {
      //   goodsList: this.goodsList,
      //   page: this.page,
      //   rows: this.rows
      // })
      storage.setLocalStorage(goodsInfo, goodsObj)
      this.$emit('buy', this.unsatisfactoryData)
      if (!this.unsatisfactoryData.length) {
        this.$router.push('/createOrder')
      }
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
  display flex
  justify-content space-between
  align-items center
  .checkIcon
    width 70px
    height 60px
    margin-right 32px
  .all
    margin-right 32px
    font-weight 600
    i
      font-weight normal
  .price
    text-align right
    float left
    margin-right 32px
    flex 1
    i
      font-size 30px
      color #262626
  .btn
    width 300px
    height 148px
    line-height 148px
    background:linear-gradient(-48deg,rgba(172,124,98,1),rgba(220,166,116,1));
    opacity:0.96
    text-align center
    color #FFFFFF
    font-size 46px
    float right
    i
      font-size 40px
  .delBtn
    height 90px
    display inline-block
    line-height 90px
    width 180px
    text-align center
    font-size 40px
    color #D54B4B
    border 2px solid #D54B4B
    margin-right 50px
    border-radius 45px
  .collect
    height 90px
    line-height 90px
    width 280px
    text-align center
    font-size 40px
    color #BA825A
    border 2px solid #BA825A
    margin-right 50px
    border-radius 45px
    display inline-block
  .btnWrap
    flex 1
    text-align right
</style>
