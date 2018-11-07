<template>
  <div class="wrapper">
    <userinfo-header title="意见反馈" oper="提交" @operComplete="onOperComplete"></userinfo-header>
    <div class="feedbackCon">
      <textarea name="" v-model="feedback" class="feedbackText" placeholder="请写下对星品的感受，我们将不断优化对您的服务！"></textarea>
      <input type="text" v-model="phone" class="feedbackPhone" placeholder="请输入您的联系方式">
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import UserinfoHeader from './ComUserSetHeader'
import {feedback} from 'util/netApi'
import {http} from 'util/request'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      feedback: '',
      phone: ''
    }
  },
  components: {
    UserinfoHeader
  },
  computed: {
    // 手机号码判断
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phone)
    }
  },
  methods: {
    // 意见反馈提交
    // pics 反馈图片
    // type反馈类型(1-功能建议 2-购买遇到的问题 3-性能问题 4-其他)
    onOperComplete () {
      if (this.rightPhoneNumber && this.feedback !== '') {
        let params = {
          content: this.feedback,
          memberPhone: this.phone
        }
        http(feedback, params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            console.log('提交意见成功')
            router.push('./softwareSeting')
          }
        })
      } else if (!this.rightPhoneNumber) {
        Toast({
          message: '请输入联系电话',
          position: 'bottom',
          duration: 5000
        })
      } else if (this.feedback === '') {
        Toast({
          message: '请输入反馈意见',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    width 100%
    background #fff
    box-sizing border-box
    padding-top 130px
  .feedbackCon
    width 100%
    .feedbackText
      display block
      width calc(100% - 100px)
      height 400px
      margin 50px auto 30px
      font-size 40px
      color #666
      background #F5F5F5
      box-sizing border-box
      padding 50px
      resize none
    .feedbackPhone
      display block
      width calc(100% - 100px)
      height 148px
      background #F5F5F5
      margin 0 auto
      box-sizing border-box
      padding 0 50px
      font-size 40px
      color #666
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
