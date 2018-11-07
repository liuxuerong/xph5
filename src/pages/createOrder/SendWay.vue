<template>
  <div class="sendWay">
    <common-nav-header :title="title"/>
      <router-link class="cellLink" to="/addressAdmind">
        <div class="text">快递配送</div>
      </router-link>
        <router-link class="cellLink" to="/storeAddress">
        <div class="text">上门自提</div>
      </router-link>
  </div>
</template>
<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
export default {
  name: 'SendWay',
  components: {CommonNavHeader},
  data () {
    return {
      title: '配送方式'
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
  .sendWay
    height 100%
    background-color #f5f5f5
    padding-top 120px
    .cellLink
      height 148px
      line-height 148px
      padding 0 50px
      display inline-block
      background-color #fff
      width 100%
      margin-top 30px
      .text
        height 148px
        line-height 148px
        position relative
        width 100%
        font-size 40px
        color #262626
      .text::after
        content ''
        position absolute
        right 10px
        top 60px
        width 30px
        height 30px
        border-right 2px solid #666
        border-top 2px solid #666
        transform rotate(45deg)
</style>
