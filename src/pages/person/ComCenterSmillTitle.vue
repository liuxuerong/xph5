<template>
  <div class="centerTitle">
    <h3 class="bgFontTitle">{{content}}</h3>
    <span class="seeMore" v-show="moreShow" @click="seeMoreData">查看全部<i class="moreIcon"></i></span>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    content: '',
    moreShow: Boolean
  },
  methods: {
    seeMoreData () {
      if (this.content === '我的订单') {
        this.$router.push('/orderIndex')
      } else if (this.content === '我的收藏') {
        this.$router.push('/collect/0')
      } else if (this.content === '优惠卡券') {
        this.$router.push('/cardVoucher')
      } else if (this.content === '可能感兴趣的活动') {
        this.$router.push('/activitiesInterest')
      }
    }
  },
  computed: {

  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .centerTitle
    width 100%
    height 160px
    line-height 160px
  .bgFontTitle
    float left
    width auto
    font-size 56px
    font-weight bold
    color #333333
  .seeMore
    float right
    width auto
    font-size 36px
    font-weight normal
    color #808080
    .moreIcon
      display inline-block
      width 24px
      height 45px
      bgImage('/static/icons/enterNextGray')
      margin-left 18px
      vertical-align middle
      position relative
      top -4px
</style>
