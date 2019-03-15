<template>
  <div class="activityTemps mobile-wrap" :class="{wrapperTitle:titleShow}">
    <CommonNavHeader :class="{hide:titleShow}"/>
     <div class="activitysContent" v-html="activityDetails">
    </div>
    <div id="test"></div>
  </div>
</template>
<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
// import Vue from 'vue'
import {
  http
} from 'util/request'
import {
  activityDetail,
  memberCouponRecord
} from 'util/netApi'
import {
  Toast
} from 'mint-ui'
import {
  storage
} from 'util/storage'
import dsbridge from 'dsbridge'
import { getUrlParam } from '@/func/params'
import {
  accessToken
} from 'util/const.js'
export default {
  name: 'ActivityTemps',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      titleShow: false,
      activityDetails: null,
      params: '',
      token: ''
    }
  },
  methods: {
    activitiesRender () {
      this.platform = getUrlParam('platform')
      this.params = this.$route.params.id
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.titleShow = true
      }
      http(activityDetail, [this.params]).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          let data = response.data.body
          this.activityDetails = data.contentCode.previewCode
        }
      })
    }
  },
  created () {
    this.activitiesRender()
  }
}
let platform = getUrlParam('platform')
window.toGoodDetail = function (goodsId) {
  if (platform === 'i' || platform === 'a') {
    dsbridge.call('goodsDetail', goodsId, function (v) {
      alert(v)
    })
  } else {
    window.open(`${window.location.origin}/#/details/${goodsId}`)
  }
}
window.toLinkPage = function (link) {
  window.open(`${window.location.origin}/#/${link}`)
}

window.clickTo = function (couponId) {
  let params = {
    couponId
  }
  if (storage.getLocalStorage(accessToken)) {
    http(memberCouponRecord, params).then((response) => {
      if (response.data.code === 0) {
        Toast({
          message: '优惠券领取成功',
          position: 'center',
          duration: 2000
        })
      } else {
        Toast({
          message: response.data.message,
          position: 'center',
          duration: 2000
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  } else {
    window.location.href = `${window.location.origin}/#/login`
  }
}

</script>
<style lang="stylus" scoped>
  .wrapperTitle.activityTemps
    padding-top 0
  .hide
    display none
  .activityTemps
    width 100%
    height 100%
    box-sizing border-box
    padding-top 130px
  .activitysContent
      width 100%
</style>
