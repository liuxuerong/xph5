<template>
    <div class="wrapper">
        <div class="userTop">
            <span class="prevOper" @click="prevOperBtn">&lt;</span>
            <span class="remberPassword" @click="remberPasswordNext">下一步</span>
        </div>
        <div class="userContent">
            <h3>找回密码</h3>
            <phone-code ref="phoneCode"></phone-code>
        </div>
    </div>
</template>
<script type="text/javascript">
import PhoneCode from './components/ComPhonecode'
import {mapState} from 'vuex'
export default {
  data () {
    return {}
  },
  components: {
    PhoneCode
  },
  computed: mapState({
    returnVal: state => state.returnVal.returnVal
  }),
  methods: {
    remberPasswordNext () {
      let _this = this
      this.$refs.phoneCode.submitCode()
      if (this.returnVal) {
        _this.$router.push('/userPassword/2')
      }
    },
    prevOperBtn: function () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
	body,html
		width 100%
		height 100%
		position relative
	.wrapper
		position absolute
		left 0
		top 0
		width 100%
		height 100%
		background #fff
		box-sizing border-box
		padding-top 40px
	.userTop
		width 100%
		height 52px
		line-height 52px
		.prevOper
			float left
			width 10%
			font-size 60px
			font-weight 600
			color #282828
			text-align center
		.remberPassword
			float right
			width 18%
			font-size 40px
			color #808080
			text-align center
			line-height 52px
	.userContent
		width 92%
		margin 68px auto 0
		h3
			width 100%
			font-size 76px
			font-weight 600
			color #262626
			margin-bottom 46px
</style>
