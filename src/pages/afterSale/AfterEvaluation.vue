<template>
  <div class="wrapper">
    <common-nav-header title="售后评价" />
    <div class="appealCon">
      <div class="wrap">
        <div class="padding50">
          <div class="titleWrap">评价内容</div>
          <div class="evaluateText">
            <textarea class="evaluateArea" :maxlength="300" ref="evaluateText" v-model="params.content" placeholder="具体描述情况，有助于平台优化服务" cols="30" rows="10"></textarea>
            <span class="fontNum"><i>{{params.content.length}}</i>/300</span>
          </div>
        </div>
      </div>
    </div>
     <div class="refundOperBtn" @click="sureRefundOper">提交</div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  Toast
} from 'mint-ui'
import {
  evaluateAfterSales
} from 'util/netApi'
import {
  http
} from 'util/request'
export default {
  name: 'AfterEvaluation',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      params: {
        saleSn: '',
        content: ''
      }
    }
  },
  methods: {
    // 提交
    sureRefundOper () {
      this.params.saleSn = this.$route.params.saleSn
      if (this.params.content == '') {
        Toast({
          message: '请填写评价内容',
          position: 'center',
          duration: 2000
        })
        return
      }
      http(evaluateAfterSales, this.params).then((response) => {
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
  padding 50px 50px
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
