<template>
  <div class="commonNavSearch">
    <div class="back" @click="goBack"></div>
    <router-link to="/cart" class="car fr">
      <span class="num" v-if="count!=0">{{count}}</span>
    </router-link>
    <div class="search fr">
    </div>
  </div>
</template>
<script>
import {
  http
} from 'util/request'
import {
  cartNum
} from 'util/netApi'
import {storage} from 'util/storage'
import {accessToken} from 'util/const'
export default {
  name: 'CommonNavHeader',
  components: {},
  props: {
    title: String
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getCartNum () {
      http(cartNum).then(res => {
        this.count = res.data.body
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    if (storage.getLocalStorage(accessToken)) {
      this.getCartNum()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .commonNavSearch
    position fixed
    top 0
    height 120px
    line-height 120px
    text-align center
    font-size 56px
    color #262626
    width 100%
    background-color #fff
    z-index 999999
    padding-right 50px
    .back
      position absolute
      left 50px
      top 30px
      width 45px
      height 45px
      border-left 4px solid #262626
      border-top 4px solid #262626
      transform rotate(-45deg)
    .search
      width 60px
      height 60px
      bgImage("/static/icons/search_black")
      margin-right 40px
      vertical-align middle
      margin-top 20px
    .car
      width 83px
      height 83px
      bgImage("/static/icons/car")
      margin-top 13px
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
        transform translate(50%,-25%)
        right 0
        font-size 36px
</style>
