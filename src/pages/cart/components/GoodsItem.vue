<template>
  <div class="goodsItem">
    <label for="goodsItem1" class="border-bottom">
        <div class="checkIcon">
            <check-icon :value.sync="goodsItem.value">
            </check-icon>
          </div>
          <div class="goodsItemMain">
            <router-link to="#" class="linkDetails">
              <img v-lazy="imageUrl+goodsItem.goodsItemPic" alt="" >
             </router-link>
            <div class="info">
              <div class="name">{{goodsItem.goodsItemName}}</div>
              <div class="describe">
                <span class="color" v-for="(item,index) in specs" :key="index">{{item}}</span>
                 x <em class="num">{{goodsItem.num}}</em>
                </div>
              <div class="bottom clearfix">
                <span class="tag fl" v-if="goodsItem.status!=1">已失效</span>
                <span class="modify" v-show="showModify">
                  <x-number :min="1" :max="goodsItem.stock" v-model="goodsItem.num" @click.stop.prevent :fillable="true"></x-number>
                </span>
                <i class="price fr">￥{{goodsItem.price.toFixed(2)}}</i>
              </div>
            </div>
        </div>
      </label>
  </div>
</template>

<script>
import {
  http
} from 'util/request'
import { updateCart } from 'util/netApi'
import {
  CheckIcon,
  XNumber
} from 'vux'
import {
  config
} from 'util/config.js'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'GoodsItem',
  components: {
    CheckIcon,
    XNumber
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      specs: []
    }
  },
  props: {
    goodsItem: Object,
    showModify: Boolean
  },
  computed: mapState({
    clearNum: state => state.cart.clearNum,
    goodsList: state => state.cart.goodsList
  }),
  watch: {
    goodsItem: {
      handler (newVal, oldVal) {
        this.doUpdateCart()
        if (this.clearNum.length > 0) {
          let index = this.clearNum.indexOf(this.goodsItem)
          if (newVal.value) {
            if (index !== -1) {
              this.clearNum[index] = this.goodsItem
            } else {
              this.clearNum.push(this.goodsItem)
            }
          } else {
            if (index !== -1) {
              this.clearNum.splice(index, 1)
            }
          }
          let goodsList = this.goodsList
          this.changeGoodsList(goodsList)
          this.changeClearNum(this.clearNum)
        } else {
          if (newVal.value) {
            this.clearNum.push(this.goodsItem)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['changeClearNum', 'changeIsAllSelect', 'changeGoodsList']),
    getSpecs () {
      let specs = JSON.parse(this.goodsItem.specs)
      for (let i in specs) {
        this.specs.push(specs[i].value)
      }
    },
    doUpdateCart () {
      updateCart.url = '/cart'
      updateCart.url = updateCart.url + '/' + this.goodsItem.id
      if (this.goodsItem.num !== '') {
        let params = {
          cartId: this.goodsItem.id,
          request: this.goodsItem.num
        }
        http(updateCart, params, 'noloading').then(res => {
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    this.getSpecs()
  }
}
</script>

<style lang="stylus" scoped>
  .goodsItem
    padding 0 50px
    label
      display flex
      align-items center
    .checkIcon
      height 46px
      width 60px
      margin-right 30px
      position relative
    .goodsItemMain
      flex 1
      display flex
      padding 90px 0
      .linkDetails
        width 286px
        height 286px
        margin-right 30px
        img
          width 100%
          height 100%
      .info
        flex 1
        .name
          color #262626
          font-size 40px
          font-weight 600
          line-height 80px
        .describe
          color #808080
          font-size 36px
          line-height 50px
          margin-bottom 50px
          span
            margin-right 20px
        .bottom
          color #000
          font-size 46px
          line-height 60px
          .tag
            background #E6E6E6
            color #ffffff
            height 60px
            line-height 60px
            font-size 30px
            width 127px
            text-align center
          .modify
            display inline-block
            line-height 100px
            height 100px
.disabled .checkIcon>>>.vux-check-icon
  display none
.disabled.goodsItem .goodsItemMain .info .name
  color #ccc
.disabled.goodsItem .goodsItemMain .info .describe
  color #ccc
.disabled.goodsItem .goodsItemMain .info .bottom
  color #ccc
</style>

<style lang="stylus">
  .checkIcon .vux-check-icon
    line-height 46px
    position absolute
    // top 40px
  .checkIcon .weui-icon-circle
    font-size 46px
  .checkIcon .weui-icon-success
    color #BA825A
    font-size 46px
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
    fill #CCCCCC
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
