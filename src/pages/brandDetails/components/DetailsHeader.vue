<template>
  <div class="detailsHeader border-bottom">
    <div class="top">
      <img :src="imageUrl+details.brandLogo" alt="" class="brandLogo">
    <div class="title">
      {{details.title}}|{{details.subTitle}}
    </div>
    <div class="selected">
      <img src="" alt="">
    </div>
    </div>
    <div class="desc">详细介绍详细介绍详细介绍详细介绍详细介绍详细介绍详 详详细介绍详细介绍详细介绍详细介绍详细介
    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config.js'
export default {
  name: 'DetailsHeader',
  components: {},
  data () {
    return {
      imageUrl: config.imageUrl
    }
  },
  props: {
    details: Object
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
.detailsHeader
  position relative
  margin 0 50px
  .top
    display flex
    justify-content space-between
    .brandLogo
      width 197px
      height 197px
      margin-top -40px
      box-shadow:0px 4px 4px 0px rgba(0,0,0,0.1)
    .title
      font-size 56px
      line-height 80px
      flex 1
      padding 0 24px
    .selected
      width 52px
      height 52px
      margin-top 20px
      bgImage("/static/icons/Collection_icon")
      &.active
         bgImage("/static/icons/Collection_icon_click")
  .desc
    line-height 70px
    padding-top 40px
    color #262626
    font-size 40px
    padding-bottom 80px
</style>
