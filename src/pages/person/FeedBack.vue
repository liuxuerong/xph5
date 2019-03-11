<template>
  <div class="wrapper">
    <!-- <userinfo-header title="意见反馈" oper="提交" @operComplete="onOperComplete"></userinfo-header> -->
    <userinfo-header title="意见反馈" oper=""></userinfo-header>
    <div class="feedbackCon">
      <div class="feedbackItem">
        <div class="feedbackTitle">{{feedbackTitle[0]}}</div>
        <ul class="feedbackType clearfix">
          <li
            v-for="(item,index) in feedbackType"
            :class="{'active': index == active}"
            @click="feedbackTypeChange(index)"
            :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="feedbackItem">
        <div class="feedbackTitle">{{feedbackTitle[1]}}</div>
        <textarea name="" v-model="feedback" class="feedbackText" placeholder="请写下对星品的感受，我们将不断优化对您的服务！"></textarea>
        <div class="uploadWrapper">
          <div class="uploadItem" v-for="(childImg,j) in objImgs" :key="j">
            <img :src="imageUrl+childImg+imageAfterUrl" alt="">
            <span class="deletePic" @click="deletePic(j)"></span>
          </div>
          <div class="uploadPicBtn" v-if="(!objImgs) || ( objImgs.length < 3)">
            <input name="file" @change="uploadPic($event)" ref="inputer"  type="file"/>
          </div>
          <span class="uploadText">最多三张</span>
        </div>
      </div>
      <div class="feedbackItem">
        <div class="feedbackTitle">{{feedbackTitle[2]}}</div>
        <input type="text" v-model="phone" class="feedbackPhone" placeholder="请输入您的联系方式">
      </div>
    </div>
    <div class="feedbackSubmit" @click="onOperComplete">提交</div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import {feedback} from 'util/netApi'
import {http} from 'util/request'
import { Toast } from 'mint-ui'
import { storage } from 'util/storage.js'
import { accessToken } from 'util/const.js'
import axios from 'axios'
import { config } from 'util/config' // 图片路径
export default {
  name: 'FeedBack',
  data () {
    return {
      feedbackTitle: ['反馈类型', '问题和意见', '联系方式'],
      feedbackType: ['功能建议', '购买遇到的问题', '性能问题', '其他'],
      active: 0,
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      objImgs: [],
      feedback: '',
      phone: ''
    }
  },
  components: {
    UserinfoHeader
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'feedBack') {
        this.active = 0
        this.objImgs = []
        this.feedback = ''
        this.phone = ''
      }
    }
  },
  computed: {
    // 手机号码判断
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phone)
    }
  },
  methods: {
    feedbackTypeChange (index) {
      this.active = index
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
    // 意见反馈提交
    // pics 反馈图片
    // type反馈类型(1-功能建议 2-购买遇到的问题 3-性能问题 4-其他)
    onOperComplete () {
      if (this.rightPhoneNumber && this.feedback !== '') {
        let params = {
          content: this.feedback,
          memberPhone: this.phone,
          type: this.active + 1,
          pics: this.objImgs
        }
        http(feedback, params).then((response) => {
          if (response.data.body === true) {
            Toast({
              message: '意见反馈成功',
              position: 'middle',
              duration: 3000
            })
            this.$router.push('/softwareSeting')
          }
        })
      } else if (this.feedback === '') {
        Toast({
          message: '请输入反馈意见',
          position: 'bottom',
          duration: 3000
        })
      } else if (!this.rightPhoneNumber) {
        Toast({
          message: '请输入联系电话',
          position: 'bottom',
          duration: 3000
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
   @import "~styles/mixins.styl";
  .wrapper
    width 100%
    background #fff
    box-sizing border-box
    padding-bottom 280px
    padding-top 130px
  .feedbackCon
    width 100%
    background #f5f5f5
    .feedbackText
      display block
      width calc(100% - 100px)
      height 400px
      margin 0px auto 30px
      font-size 40px
      color #666
      resize none
    .feedbackPhone
      display block
      width calc(100% - 100px)
      height 148px
      margin 0 auto
      font-size 40px
      border-bottom 1px solid #cccccc
      color #666
  .feedbackItem
    width 100%
    margin-bottom 30px
    padding-bottom 80px
    background #ffffff
    .feedbackTitle
      width 100%
      height 150px
      line-height 150px
      font-size 46px
      font-weight bold
      color #262626
      box-sizing border-box
      padding 0 50px
  .feedbackType
    width 100%
    box-sizing border-box
    padding 0 50px
    li
      float left
      width auto
      height 80px
      line-height 80px
      font-size 40px
      color #666666
      text-align center
      box-sizing border-box
      padding 0 20px
      margin-right 30px
      border 1px solid #666666
    li.active
      background #C78A5C
      color #ffffff
      border 1px solid #C78A5C
  .uploadWrapper
    width 100%
    box-sizing border-box
    padding 0 50px
    height 260px
    position relative
    .uploadText
      position absolute
      bottom 0
      left 70px
      font-size 26px
      color #666666
    .uploadPicBtn
      float left
      width 185px
      height 185px
      background url(/static/images/upLoadPic.png) no-repeat center center/70%
      input[type="file"]
        display block
        width 185px
        height 185px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      height 190px
      position relative
      img
        float left
        width 180px
        height 180px
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
        bgImage('/static/icons/deletePic')
  .feedbackSubmit
    width calc(100% - 100px)
    height 146px
    line-height 146px
    position fixed
    left 0
    right 0
    bottom 80px
    margin auto
    text-align center
    font-size 46px
    font-weight bold
    color #B07D57
    background #F4F4F4
  ::-webkit-input-placeholder {
    color: #999;
    font-size 40px
  }
  ::-moz-placeholder {
    color: #999;
    font-size 40px
  }
  :-ms-input-placeholder {
    color: #999;
    font-size 40px
  }
  :-moz-placeholder {
    color: #999;
    font-size 40px
  }
</style>
