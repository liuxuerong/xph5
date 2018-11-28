<template>
  <div class="wrapper">
   <userinfo-header :title="title" :oper="oper" @operComplete="operBtnClick"></userinfo-header>
   <div class="phoneCodeCon">
     <h2 class="subtitle">{{subtitle}}</h2>
     <phone-code ref="phoneCode"></phone-code>
   </div>
  </div>
</template>
<script>
import UserinfoHeader from './../components/ComUserSetHeader'
import PhoneCode from '@/pages/login/components/ComPhonecode'
import { mapState } from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data () {
    return {
      title: '',
      subtitle: '',
      oper: ''
    }
  },
  computed: mapState({
    returnVal: state => state.returnVal.returnVal
  }),
  components: {
    UserinfoHeader,
    PhoneCode
  },
  methods: {
    userPhoneCodeRender () {
      let type = this.$route.params.type
      this.type = type
      console.log(type)
      if (type === '0') {
        this.title = '绑定新手机'
        this.subtitle = '绑定新手机'
        this.oper = '完成'
      } else {
        this.title = '修改密码'
        this.subtitle = '验证手机'
        this.oper = '下一步'
      }
    },
    // 下一步  完成
    operBtnClick () {
      console.log(this.returnVal)
      if (this.returnVal) {
        if (this.type === '0') {
          Toast({
            message: '修改成功',
            position: 'bottom',
            duration: 2000
          })
          this.$router.push('/accountSecurity')
        } else {
          this.$router.push('/userPassword/2')
        }
      } else {
        Toast({
          message: '验证失败',
          position: 'bottom',
          duration: 2000
        })
      }
    }
  },
  mounted () {
    this.userPhoneCodeRender()
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    box-sizing border-box
    padding-top 132px
  .phoneCodeCon
    width 100%
    box-sizing border-box
    padding 0 50px
    .subtitle
      width 100%
      height 140px
      line-height 140px
      font-size 76px
      margin 30px 0 80px
      color #262626
</style>
