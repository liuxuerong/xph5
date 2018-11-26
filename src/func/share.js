// share_title

import { wxShare } from '@/api/pages'

import wx from 'weixin-js-sdk'
var wxShares = new Array(4)

wxShares[0] = window.location.href.split('#')[0] + '/static/image/cart/shareLogo.png'  // share_img 分享缩略图图片

wxShares[1] = window.location.href.split('#')[0] // share_link  分享页面的url地址，如果地址无效，则分享失败;

wxShares[2] = '零元制作优质广告，一元收获“万+”流量，低投入，高回报，宣传无忧。'// share_desc

wxShares[3] = 'GGGO广告狗-推广好帮手，制作无忧，一元起投'

export const weiXinShare = (shareUrl) => {
  wxShare({url: window.location.href.split('#')[0] + '#' + window.location.href.split('#')[1]})

    .then(res => {
      if (res.code === '0000') {
        // 配置微信信息

        wx.config({

          // debug : true, // true:调试时候弹窗

          appId: res.data.appId, // 微信appid

          timestamp: res.data.timestamp, // 时间戳

          nonceStr: res.data.nonceStr, // 随机字符串

          signature: res.data.signature, // 签名

          jsApiList: [

            // 所有要调用的 API 都要加到这个列表中

            'onMenuShareTimeline', // 分享到朋友圈接口

            'onMenuShareAppMessage', //  分享到朋友接口

            'onMenuShareQQ', // 分享到QQ接口

            'onMenuShareQZone', // 分享到QQ空间

            'onMenuShareWeibo' // 分享到微博接口

          ]

        })

        wx.ready(function () {
          // 微信分享的数据

          var shareData = {

            'imgUrl': wxShares[0], // 分享显示的缩略图地址

            'link': window.location.href.split('#')[0] + 'static/html/redirect.html?vueRedirect=' + encodeURIComponent(shareUrl), // 分享地址

            'desc': wxShares[2], // 分享描述

            'title': wxShares[3], // 分享标题

            success: function () {
              // 分享成功可以做相应的数据处理

              let data = orderId

              this.$router.push({name: 'checkstand', query: { data }})
            },

            cancel: function () {
              // 用户取消分享后执行的回调函数

              // alert("分享取消22");

              let data = orderId

              this.$router.push({name: 'checkstand', query: { data }})
            }

          }

          wx.onMenuShareTimeline(shareData)

          wx.onMenuShareAppMessage(shareData)

          wx.onMenuShareQQ(shareData)

          wx.onMenuShareQZone(shareData)

          wx.onMenuShareWeibo(shareData)
        })

        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，

          // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，

          // 对于SPA可以在这里更新签名。

          alert('好像出错了！！')
        })
      } else {
        this.$message({

          showClose: true,

          type: 'error',

          message: res.msg

        })
      }
    })
}
