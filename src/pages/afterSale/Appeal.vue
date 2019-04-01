<template>
  <div class="wrapper">
    <common-nav-header title="申诉详情" />
    <div class="appealCon">
      <div class="wrap">
        <div class="padding50">
          <div class="titleWrap">问题描述</div>
          <div class="evaluateText">
            <textarea class="evaluateArea" :maxlength="300" ref="evaluateText" v-model="params.desc" placeholder="填写您需要申诉的细节情况，以便客服更加详细的了解您的诉求，若文字无法描述清楚问题，您也可以上传图片辅佐描述" cols="30" rows="10"></textarea>
            <span class="fontNum"><i>{{params.desc.length}}</i>/300</span>
          </div>
        </div>
        <div class="uploadWrapper">
          <div class="uploadPicBtn" @click="checkLength">
            <input name="file" @change="uploadPic($event)" ref="inputer" type="file" v-if="objImgs.length<5"/>
          </div>
          <div class="uploadItem" v-for="(childImg,j) in objImgs" :key="j">
            <img :src="imageUrl+childImg+imageAfterUrl" alt="">
            <span class="deletePic" @click="deletePic(j)"></span>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="cellLink">
          <div>联系人<input type="text" placeholder="请填写联系人姓名" class="fr" v-model="params.contactName"></div>
        </div>
        <div class="cellLink">
          <div>联系电话 <input type="text" placeholder="请填写联系电话" class="fr" v-model="params.contactNumber"></div>
        </div>
      </div>
    </div>
     <div class="refundOperBtn" @click="sureRefundOper">提交</div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  storage
} from 'util/storage'
import {
  accessToken
} from 'util/const'
import {
  config
} from 'util/config' // 图片路径
import axios from 'axios'
import {
  Toast
} from 'mint-ui'
import {
  appealAfterSales
} from 'util/netApi'
import {
  http
} from 'util/request'
import { isPhone } from 'util/validate'
export default {
  name: 'Appeal',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      params: {
        saleSn: '',
        desc: '',
        pic: '',
        contactNumber: '',
        contactName: ''
      },
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      objImgs: []
    }
  },
  methods: {
    // 检查已上传图片
    checkLength () {
      if (this.objImgs.length > 4) {
        Toast({
          message: '最多上传五张图片',
          position: 'center',
          duration: 2000
        })
      }
    },
    uploadPic (e) {
      let ss = e.target.files
      let formData = new FormData()
      formData.append('file', ss[0])
      let cf = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': storage.getLocalStorage(accessToken)
        }
      }
      axios.post(config.baseUrl + 'file/upload', formData, cf).then((response) => {
        if (response.data.code === 0) {
          this.objImgs.push(response.data.body.key)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 图片删除
    deletePic (index) {
      this.objImgs.splice(index, 1)
    },
    // 提交申诉
    sureRefundOper () {
      if (this.params.desc == '') {
        Toast({
          message: '请填写问题描述',
          position: 'center',
          duration: 2000
        })
        return
      }
      if (this.params.contactName == '') {
        Toast({
          message: '请填写联系人姓名',
          position: 'center',
          duration: 2000
        })
        return
      }
      if (this.params.contactNumber == '') {
        Toast({
          message: '请填写联系电话',
          position: 'center',
          duration: 2000
        })
        return
      }
      if (this.params.contactNumber !== '' && !isPhone(this.params.contactNumber)) {
        Toast({
          message: '请填写一个正确的手机号码',
          position: 'center',
          duration: 2000
        })
        return
      }
      this.params.saleSn = this.$route.params.saleSn
      this.params.pic = this.objImgs.join(',')
      http(appealAfterSales, this.params).then((response) => {
        if (response.data.code === 0) {
          Toast({
            message: '提交成功',
            position: 'bottom',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push(`/personCenter`)
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.wrapper
  min-height 100%
.appealCon
  width 100%
  background-color #f5f5f5
  padding 148px 50px 0
  height calc(100vh-(148px))
.wrap
  background-color #fff
  margin-top 30px
.padding50
  padding 50px 50px 0
.titleWrap
  color #262626
  font-size 46px
  font-weight 600
  margin-bottom 50px
.evaluateText
    display block
    width 100%
    height 320px
    background #F5F5F5
    position relative
    padding 50px 30px
    .evaluateArea
      width 100%
      height 100%
      box-sizing border-box
      font-size 36px
      background #F5F5F5
      color #262626
      resize none
    .fontNum
      position absolute
      margin-right 40px
      font-size 40px
      color #999
      bottom 10px
      right 0
      i
        color #333333
.uploadWrapper
    width 100%
    height 230px
    padding 50px 50px
    .uploadPicBtn
      float left
      width 130px
      height 130px
      background url(../../images/upLoadPic.png) no-repeat center center/70%
      input[type="file"]
        display block
        width 130px
        height 130px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      position relative
      height 190px
      img
        float left
        width 130px
        height 130px
        margin-right 24px
      img:nth-of-type
        margin-right 0px
    .deletePic
      display block
      width 40px
      height 40px
      position absolute
      right 5px
      top -20px
      bgImage('../../icons/deletePic')
.cellLink
  line-height 148px
  padding 0 50px
  display inline-block
  width 100%
  div
    line-height 148px
    position relative
    width 100%
    font-size 40px
    color #262626
    font-weight 600
    input
      width 80%
      height 1.315556rem
      line-height 1.315556rem
.refundOperBtn
  width 100%
  background-color #fff
  font-size 46px
  color #333
  text-align center
  line-height 148px
  height 148px
  font-weight 600
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-size 36px
  color #CCCCCC
}
::-moz-placeholder { /* Firefox 19+ */
  font-size 36px
  color #CCCCCC
}
:-ms-input-placeholder { /* IE 10+ */
  font-size 36px
  color #CCCCCC
}
:-moz-placeholder { /* Firefox 18- */
  font-size 36px
  color #CCCCCC
}
</style>
