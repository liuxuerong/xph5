<template>
  <div class="setItemPop border-bottom">
    <span class="setProperty">{{setPro}}</span>
    <input type="text" class="setInfoInput" v-show="inputShow" v-model="inputData" placeholder="请输入昵称" v-bind:readonly="setPro!=='昵称'">
    <i class="setIcon" v-show="iconShow"></i>
  </div>
</template>
<script>
export default {
  props: {
    setPro: '',
    inputShow: Boolean,
    inputData: ''
  },
  data () {
    return {
      iconShow: Boolean
    }
  },
  mounted: function () {
    // input 指示箭头  显示
    this.iconShow = !this.inputShow
    console.log(this.inputShow)
  },
  methods: {

  },
  watch: {
    inputData: {
      handler: function () {
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .setItemPop
    width 100%
    height 148px
    line-height 148px
    background #fff
    box-sizing border-box
    padding 0 70px 0 50px
  .setProperty
    width auto
    height 148px
    line-height 148px
    font-size 46px
    color #262626
  .setIcon
    float right
    width 24px
    height 45px
    bgImage('/static/icons/enterNextGray')
    margin-top 51px
  .setInfoInput
    width auto
    height 146px
    line-height 140px
    font-size 46px
    color #808080
    float right
    text-align right
  ::-webkit-input-placeholder {
      color: #CCCCCC;
  }
  ::-moz-placeholder {
      color: #CCCCCC;
  }
  :-ms-input-placeholder {
      color: #CCCCCC;
  }
  :-moz-placeholder {
      color: #CCCCCC;
  }
</style>
