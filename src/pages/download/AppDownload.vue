<template>
  <div class="wrapper">
    <div class="wrapperBg">
      <div class="weixinTips" v-if="terminalType === 'weixin'">
        <span>在微信中无法下载：</span>
        <p>点击右上角，选择在<i class="iconBrowser"></i>浏览器中打开，即可下载<i class="appName">星品优汇</i> </p>
        <i class="operBrowser"></i>
      </div>
    </div>
    <div class="downloadBtn">{{btnText}}</div>
    <div class="mask" v-if="terminalType === 'weixin'"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      terminalType: '',
      btnText: '打开星品优汇'
    }
  },
  methods: {
    downloadRender () {
      let ua = navigator.userAgent.toLowerCase()
      if (isWeixinBrowser()) {
        this.terminalType = 'weixin'
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.terminalType = 'ios'
          let loadDateTime = new Date()
          window.setTimeout(function () {
            let timeOutDateTime = new Date()
            if (timeOutDateTime - loadDateTime < 5000) {
              // window.location = '要跳转的页面URL'
              console.log(999)
            } else {
              window.close()
            }
          }, 25)
          // window.location = ''
          console.log(666)
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.terminalType = 'android'
          let state = null
          try {
            state = window.open('chblogs://com.jdhoe.android', '_blank')
          } catch (e) {}
          if (state) {
            window.close()
          } else {
            // alert('去下载')
            window.location.href = 'chblogs:' + 'com.jdhoe.android'
            // window.location = 'com.jdhoe.android'
          }
        }
      }

      function isWeixinBrowser () {
        return !!(/micromessenger/.test(ua))
      }
    }
  },
  mounted () {
    this.downloadRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .mask
    width 100%
    height 100%
    position absolute
    top 0
    background rgba(0,0,0,0.2)
    z-index 1
  .wrapper
    width 100%
    height 100%
    position absolute
    top 0
    background #fff
    .wrapperBg
      width 100%
      height 70%
      background red
      .weixinTips
        width calc(100% - 40px)
        margin 0 auto
        height 340px
        position relative
        box-sizing border-box
        padding 58px 42px
        z-index 3
        background #fff
        span
          display block
          font-size 60px
          font-size #333333
          line-height 60px
          margin-bottom 40px
        p
          display block
          font-size 50px
          color #333333
      .iconBrowser
        display inline-block
        width 48px
        height 48px
        vertical-align middle
        margin -2px 8px 0
        bgImage('/static/icons/iconBrowser')
    .operBrowser
      width 160px
      height 110px
      position absolute
      top 28px
      right 40px
      bgImage('/static/icons/operBrowser')
  .downloadBtn
    width 800px
    height 160px
    font-size 60px
    color #BA825A
    line-height 160px
    margin 32% auto 0
    background #262D35
    text-align center
</style>
