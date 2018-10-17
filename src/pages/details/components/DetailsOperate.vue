<template>
  <div class="detailsOperate">
    <div class="operateLeft">
      <span class="udesk"></span>
      <span class="collect"></span>
      <span class="cart"></span>
    </div>
    <ul class="operateRight">
      <li class="border-left">立即购买</li>
      <li class="border-left active">加入购物车</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DetailsOperate',
  components: {},
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

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
    span
      flex 1
    .udesk
      background: url('/static/icons/udesk_icon.png') no-repeat center center/40% 40%
    .collect
      background: url('/static/icons/collection_icon.png') no-repeat center center/40% 40%
    .cart
      background: url('/static/icons/cart_icon.png') no-repeat center center/40% 40%
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
</style>
