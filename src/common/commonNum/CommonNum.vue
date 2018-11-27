<template>
  <div class="commonNum">
    <div class="num" ref="num">
      <span class="sub fl" @click="subCount" :class="{disable:subDisabled}">_</span>
      <input type="text" class="fl" v-model="cartCount">
      <span class="add fr" @click="addCount" ref="add" :class="{disable:addDisabled}">+</span>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mint-ui'
export default {
  name: 'CommonNum',
  watch: {
    cartCount (v) {
      this.changeStyle(v)
    }
  },
  methods: {
    addCount () {
      if (this.cartCount > this.maxCount) {
        Toast({
          message: '商品库存不足',
          position: 'center',
          duration: 500
        })
        if (this.maxCount === 0) {
          return
        }
        this.cartCount = this.maxCount
      }
      this.cartCount++
    },

    subCount () {
      this.cartCount--
      if (this.cartCount < 2) {
        this.cartCount = 1
        Toast({
          message: '不能再少了',
          position: 'center',
          duration: 500
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.commonNum
  .num
      height 100px
      line-height 100px
      width 400px
      color #262626
      font-size 46px
      border 1px solid #CCCCCC
      margin-bottom 100px
      span
        display inline-block
        width 100px
        height 92px
        line-height 92px
        font-size 80px
        text-align center
        color #808080
      .sub
        margin-top -36px
      .add
        margin-top 6px
      span.disable
        color #ccc
      input
        width 190px
        border-left 1px solid #CCCCCC
        border-right 1px solid #CCCCCC
        height 92px
        margin-top 2px
        outline none
        text-align center
</style>
