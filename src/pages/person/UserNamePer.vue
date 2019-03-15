<template>
  <div class="userNamePerWrapper">
    <div class="userInfoTop">
      <span class="prevOper" @click="backPrevOper">
        <i class="backOperIcon"></i>
      </span>
      <h3 class="userInfoTitle">修改昵称</h3>
      <span class="completeOper" @click="perCompleteOper">确定</span>
    </div>
    <div class="userNamePerCon">
      <div class="nameInput">
        <input type="text" name="" id="" v-model="modifyName" maxlength="10" placeholder="请输入您的昵称">
        <i class="emptyText" @click="emptyText"></i>
      </div>
      <span class="userNamePerText">昵称可以是中英文和数字的任意组合（限10位以内）</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import {
  storage
} from 'util/storage'
export default {
  data () {
    return {
      modifyName: ''
    }
  },
  methods: {
    backPrevOper () {
      this.$router.push('/userInfoSet')
    },
    perCompleteOper () {
      if ((/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi.test(this.modifyName))) {
        storage.setLocalStorage('modifyName', this.modifyName)
        this.$router.push('/userInfoSet/1')
      } else {
        Toast({
          message: '请输入合法的昵称',
          position: 'middle',
          duration: 2000
        })
      }
    },
    emptyText () {
      this.modifyName = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.userNamePerWrapper
  width 100%
  min-height 100%
  padding-top 132px
  background #f5f5f5
  .userNamePerCon
    width 100%
    .nameInput
      width 100%
      height 150px
      background #fff
      box-sizing border-box
      padding 0 50px
      margin-bottom 50px
      input
        float left
        width 80%
        height 150px
        font-size 46px
        color #262626
        line-height 150px
      .emptyText
        float right
        width 46px
        height 46px
        margin-top 52px
        bgImage('../../icons/emptyText')
  .userNamePerText
    display block
    width 100%
    box-sizing border-box
    padding 0 50px
    font-size 36px
    color #999999
::-webkit-input-placeholder {
    font-size 46px
    color: #CCCCCC;
  }
  ::-moz-placeholder {
    font-size 46px
    color: #CCCCCC;
  }
  :-ms-input-placeholder {
    font-size 46px
    color: #CCCCCC;
  }
  :-moz-placeholder {
    font-size 46px
    color: #CCCCCC;
  }
.userInfoTop
	width 100%
	height 130px
	box-sizing border-box
	padding 0 50px
	position fixed
	left 0
	top 0
	z-index 99
	border-bottom 1px solid #f5f5f5
	background #fff
	.prevOper
		display block
		width 92px
		height 58px
		position absolute
		left 50px
		top 0
		bottom 0
		margin auto
		.backOperIcon
			display block
			width 32px
			height 58px
			bgImage('../../icons/back')
	.userInfoTitle
		width 60%
		height 130px
		line-height 130px
		margin 0 auto
		font-size 56px
		color #333333
		text-align center
		font-weight 600
		position absolute
		top 0
		left 0
		bottom 0
		right 0
		margin auto
	.completeOper
		float right
		font-size 36px
		color #808080
		height 130px
		line-height 130px
</style>
