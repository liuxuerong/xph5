<template>
  <div class="indexContent">
    <h5>
      <span class="title">{{content.title}}</span>
      <span class="price fr"  v-if="content.goodsPrice!==0">{{content.goodsPrice}}元起</span>
    </h5>
    <div class="content">
      {{content.summary}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent',
  props: {
    content: {
      type: Object,
      default: function () {
        return {
          content: {
            title: '',
            summary: ''
          }
        }
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.indexContent
  margin-bottom 150px
  h5
    height 140px
    line-height 140px
    font-size 46px
    font-weight 600
    display flex
    .title
      ellipsis()
      flex 1
      display inline-block
    .price
      font-size 40px
  .content
    color #808080
    font-size 36px
    line-height 60px
    ellipsisM()
    -webkit-line-clamp 2
</style>
