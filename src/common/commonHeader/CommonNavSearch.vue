<template>
  <div class="commonNavSearch">
    <div class="back" @click="goBack"></div>
    <div class="car fr">
    </div>
      <div class="search fr">
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonNavHeader',
  components: {},
  props: {
    title: String
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    goBack () {
      this.$router.back(-1)
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
</style>
