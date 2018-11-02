<template>
  <div class="cartOperate border-top">
    <div class="checkIcon"><check-icon :value.sync="check" @click.native="test"> </check-icon></div>
    <span class="all" >全选</span>
    <span class="price">￥{{price}}</span>
    <span class="btn" :class="{active:clearBtn}">去结算</span>
  </div>
</template>

<script>
import {
  CheckIcon
} from 'vux'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'CartOperate',
  components: {
    CheckIcon
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
      if (!v) {
        this.check = false
      }
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
    test () {
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
  display flex
  align-items center
  padding-left 60px
  color #262626
  font-size 46px
  justify-content space-between
  .checkIcon
    width 70px
    height 50px
  .all
    width 230px
  .price
    width 300px
    text-align right
  .btn
    width 340px
    height 148px
    line-height 148px
    background-color #F0F0F0
    text-align center
    color #999999
    &.active
      color #ba825a
</style>
