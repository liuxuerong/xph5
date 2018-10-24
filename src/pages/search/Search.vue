<template>
  <div class="xpSearch">
    <div class="search">
    <input type="text" placeholder="搜索">
    <div class="inputIcon"></div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  components: {},
  data () {
    return {

    }
  },
  props: {
    searchName: {
      type: String,
      default: ''
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
@import '~styles/mixins.styl'
.search
  width 100%
  height 130px
  line-height 130px
  // background-color #F5F5F5
  font-size 46px
  color #4D4D4D
  padding-left 30px
  margin-right 43px
  position relative
  padding  0 50px
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
     bgImage("/static/icons/serch_icon")
     top 35px
     right 70px
</style>
