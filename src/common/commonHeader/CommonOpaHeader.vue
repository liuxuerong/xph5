<template>
  <div class="commonNavHeader">
    <div class="back" @click.stop="goBack"></div>
    {{title}}
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CommonOpaHeader',
  components: {},
  props: {
    title: String,
    replace: {
      default: '',
      type: String
    }
  },

  methods: {
    goBack () {
      if (this.replace !== '') {
        this.$router.replace(this.replace)
      } else {
        this.$router.go(-1)
      }
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
    font-weight 600
    text-align center
    font-size 56px
    color #fff
    width 100%
    z-index 9999
    padding 0 57px
    background-color transparent
    ellipsis()
    .back
      position absolute
      width 100px
      height 120px
      left 50px
      z-index 99999
    .back::before
      display block
      content ''
      width 40px
      height 40px
      margin-top 40px
      border-left 6px solid #fff
      border-top 6px solid #fff
      transform rotate(-45deg)
</style>
