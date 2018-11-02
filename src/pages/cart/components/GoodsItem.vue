<template>
  <div class="goodsItem">
    <label for="goodsItem1" class="border-bottom">
        <div class="checkIcon">
            <check-icon :value.sync="goodsItem.value">
            </check-icon>
          </div>
          <div class="goodsItemMain">
            <img v-lazy="imageUrl+goodsItem.goodsItemPic" alt="">
            <div class="info">
              <div class="name">{{goodsItem.goodsItemName}}</div>
              <div class="describe">
                <span class="color" v-for="(item,index) in specs" :key="index">{{item}}</span>
                 x <em class="num">{{goodsItem.num}}</em>
                </div>
              <div class="bottom clearfix">
                <span class="tag fl" v-if="goodsItem.status!=1">已失效</span>
                <span class="modify" v-show="showModify">
                  <x-number :min="0" :max="goodsItem.stock" v-model="goodsItem.num"></x-number>
                </span>
                <i class="price fr">￥{{goodsItem.price}}</i>
              </div>
            </div>
        </div>
      </label>
  </div>
</template>

<script>
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
        if (this.clearNum.length > 0) {
          //   this.changeIsAllSelect(false)
          let index = this.clearNum.indexOf(this.goodsItem)
          console.log(index)

          if (newVal.value) {
            if (index !== -1) {
              this.clearNum[index] = this.goodsItem
            } else {
              console.log(123)
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
        console.log(this.clearNum)
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
    }
  },
  mounted () {
    this.getSpecs()
    console.log(this.goodsItem)
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
      img
        width 286px
        height 286px
        margin-right 30px
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
    // top 0
  .checkIcon .weui-icon-circle
    font-size 46px
  .checkIcon .weui-icon-success
    color #BA825A
    font-size 46px
  .checkIcon .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
    color #BA825A
</style>
