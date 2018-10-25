<template>
  <div class="commonNavHeader">
    <div class="back" @click="goBack"></div>
    {{title}}
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
  .commonNavHeader
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
    padding 0 200px
    ellipsis()
    .back
      position absolute
      left 50px
      top 30px
      width 45px
      height 45px
      border-left 4px solid #262626
      border-top 4px solid #262626
      transform rotate(-45deg)
</style>
