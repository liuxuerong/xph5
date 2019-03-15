<template>
  <div class="wrapper">
    <div class="wrapperBg">
      <div class="weixinTips" v-if="terminalType === 'weixin'">
        <span>在微信中无法下载：</span>
        <p>点击右上角，选择在<i class="iconBrowser"></i>浏览器中打开，即可下载<i class="appName">星品优汇</i> </p>
        <i class="operBrowser"></i>
      </div>
      <div class="appText">
        <span>你值得</span>
        <span>拥有更好的家</span>
        <p>汇聚全球五星酒店奢华&nbsp;&nbsp;&nbsp;&nbsp;时尚好物</p>
      </div>
    </div>
    <div class="downloadBtn" @click="appOperClick">{{btnText}}</div>
    <div class="mask" v-if="terminalType === 'weixin'"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      terminalType: '',
      btnText: '打开星品优汇',
      operAndroid: '',
      operIos: ''
    }
  },
  methods: {
    // 下载页页面渲染
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
              this.btnText = '下载星品优汇'
              // console.log('下载iosApp')
              window.location = 'https://itunes.apple.com/cn/app/%E6%98%9F%E5%93%81%E5%95%86%E5%9F%8E/id1253883465?mt=8'
            } else {
              window.close()
            }
          }, 25)
          // console.log('打开iosApp')
          this.operIos = 'Jdhoe://ios'
          // window.location = " apps custom url schemes";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.terminalType = 'android'
          try {
            // console.log('打开安卓App')
            this.operAndroid = 'app://test/'
          } catch (e) {}
          if (this.operAndroid) {
            window.close()
          } else {
            this.btnText = '下载星品优汇'
            window.location = 'https://www.upinstar.com/android/download/release/jdhoe.apk'
          }
        }
      }
      function isWeixinBrowser () {
        return !!(/micromessenger/.test(ua))
      }
    },
    appOperClick () {
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
              // console.log('下载iosApp')
              window.location = 'https://itunes.apple.com/cn/app/%E6%98%9F%E5%93%81%E5%95%86%E5%9F%8E/id1253883465?mt=8'
            } else {
              window.close()
            }
          }, 25)
          window.location = 'Jdhoe://ios'
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.terminalType = 'android'
          var state = null
          try {
            // console.log('打开安卓App')
            window.location.href = 'jdhoe://android'
            state = false
          } catch (e) {}
          if (state) {
            window.close()
          } else {
            // console.log('下载安卓App')
            window.location = 'https://www.upinstar.com/android/download/release/jdhoe.apk'
          }
        }
      }
      function isWeixinBrowser () {
        return !!(/micromessenger/.test(ua))
      }
    }
  },
  mounted () {
    // this.downloadRender()
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
    bottom 0
    right 0
    left 0
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
      height 100%
      position absolute
      left 0
      top 0
      background url(../../images/appDownload@3x.jpg) no-repeat center center/100% 100%
      .appText
        position absolute
        top 300px
        left 0
        box-sizing border-box
        padding-left 50px
        width 100%
        span,p
          display block
          font-weight bold
          width 100%
        span
          font-size 112px
          font-weight 600
          color #262626
        p
          font-size 60px
          margin-top 60px
          color #262626
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
        bgImage('../../icons/iconBrowser')
    .operBrowser
      width 160px
      height 110px
      position absolute
      top 28px
      right 40px
      bgImage('../../icons/operBrowser')
  .downloadBtn
    position absolute
    left 0
    right 0
    margin auto
    bottom 180px
    width 800px
    height 160px
    font-size 60px
    color #BA825A
    line-height 160px
    background #FFFFFF
    text-align center
</style>
