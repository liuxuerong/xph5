<template>
  <div class="search" :class="{searchActive:searchActive}">
    <router-link to="/search">
    <input type="text" placeholder="搜索"></router-link>
    <div class="inputIcon"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonSearch',
  data () {
    return {
    }
  },
  computed: mapState({
    searchActive: state => state.home.searchActive
  })
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.search
  width 100%
  height 130px
  line-height 130px
  font-size 46px
  color #4D4D4D
  padding-left 30px
  margin-right 43px
  position relative
  padding  0 50px
  top 0
  input
    height 100%
    background-color #F5F5F5
    width 100%
    padding-right 106px
    padding-left 30px
  .inputIcon
     position absolute
     width 60px
     height 60px
     bgImage("../../icons/serch_icon")
     top 35px
     right 70px
.search.searchActive
  height 100px
  line-height 100px
  width 1020px
  position fixed
  top 18px
  left 0px
  z-index 9999
  transition all 0.2s linear
  animation opa 0.2s linear
  input
  .inputIcon
    top 24px
@keyframes opa {
  0%{
    opacity 0
  }
  70%{
    opacity 0.3
  }
  100%{
    opacity 1
  }
}
</style>
