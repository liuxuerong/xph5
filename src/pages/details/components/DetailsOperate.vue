<template>
  <div class="detailsOperate">
    <div class="operateLeft">
      <span class="udesk"></span>
      <span class="collect" :class="{active:collect}" @click="doCollection(params)"></span>
      <span class="cart"></span>
    </div>
    <ul class="operateRight">
      <li class="border-left">立即购买</li>
      <li class="border-left active">加入购物车</li>
    </ul>
  </div>
</template>

<script>
// import {
//   http
// } from 'util/request'
// import {
//   isCollection,
//   opCollection
// } from 'util/netApi'
// import {
//   storage
// } from 'util/storage.js'
// import {
//   accessToken
// } from 'util/const.js'
// import notice from 'util/notice.js'
import {
  hasCollection,
  doCollection
} from '@/func/collection'
export default {
  name: 'DetailsOperate',
  components: {},
  data () {
    return {
      collect: false,
      id: '',
      params: null
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    hasCollection (params) {
      hasCollection(params).then(res => {
        this.collect = res.data.body
      }).catch(err => {
        console.log(err)
      })
    },
    doCollection (params) {
      doCollection(params).then(res => {
        this.hasCollection(params)
      }).catch(err => {
        console.log(err)
      })
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
