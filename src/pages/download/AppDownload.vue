<template>
  <div class="wrapper">
    <div class="wrapperBg">
      <div class="weixinTips" v-if="terminalType === 'weixin'">
        <span>在微信中无法下载：</span>
        <p>点击右上角，选择在<i class="iconBrowser"></i>浏览器中打开，即可下载<i class="appName">星品优汇</i> </p>
        <i class="operBrowser"></i>
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
              console.log('下载iosApp')
              window.location = 'https://itunes.apple.com/cn/app/%E6%98%9F%E5%93%81%E5%95%86%E5%9F%8E/id1253883465?mt=8'
            } else {
              window.close()
            }
          }, 25)
          console.log('打开iosApp')
          this.operIos = 'Jdhoe://ios'
          // window.location = " apps custom url schemes";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.terminalType = 'android'
          try {
            console.log('打开安卓App')
            this.operAndroid = 'app://test/'
          } catch (e) {}
          if (this.operAndroid) {
            window.close()
          } else {
            console.log('下载安卓App')
            this.btnText = '下载星品优汇'
            window.location = 'https://alissl.ucdl.pp.uc.cn/fs08/2018/10/09/0/110_860ee7b483abf81ecd840fac557d70b2.apk?appid=7876272&packageid=100445992&md5=5fb0eadbece066eb0f3411c98c408c59&apprd=7876272&pkg=com.jdhoe.android&vcode=17&fname=%E6%98%9F%E5%93%81%E4%BC%98%E6%B1%87&iconUrl=http%3A%2F%2Fandroid%2Dartworks%2E25pp%2Ecom%2Ffs08%2F2018%2F10%2F09%2F2%2F110%5Fcf55896e1e02c66b3c2f6f810a9a05d7%5Fcon%2Epng'
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
              console.log('下载iosApp')
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
            console.log('打开安卓App')
            window.location.href = 'jdhoe://android'
            state = true
          } catch (e) {}
          if (state) {
            window.close()
          } else {
            console.log('下载安卓App')
            window.location = 'https://alissl.ucdl.pp.uc.cn/fs08/2018/10/09/0/110_860ee7b483abf81ecd840fac557d70b2.apk?appid=7876272&packageid=100445992&md5=5fb0eadbece066eb0f3411c98c408c59&apprd=7876272&pkg=com.jdhoe.android&vcode=17&fname=%E6%98%9F%E5%93%81%E4%BC%98%E6%B1%87&iconUrl=http%3A%2F%2Fandroid%2Dartworks%2E25pp%2Ecom%2Ffs08%2F2018%2F10%2F09%2F2%2F110%5Fcf55896e1e02c66b3c2f6f810a9a05d7%5Fcon%2Epng'
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
      height 73%
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
    margin 10% auto 0
    background #262D35
    text-align center
</style>
