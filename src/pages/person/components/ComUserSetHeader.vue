<template>
    <div class="userInfoTop" @scroll="titleScroll">
		<span class="prevOper" @click="backPrevOper">
			<i class="backOperIcon"></i>
		</span>
		<h3 class="userInfoTitle">{{title}}</h3>
		<span v-if="oper !==''" class="completeOper" @click="perCompleteOper">{{oper}}</span>
	</div>
</template>
<script>
import {
  storage
} from 'util/storage'
export default {
  // 接受父级数据
  props: {
    title: '',
    oper: ''
  },
  methods: {
    // 返回上一步
    backPrevOper: function () {
      let path = this.$route.path
      console.log(path)
      if (path === '/addressAdmin') {
        this.$router.push('/userInfoSet')
      } else if (path === '/userInfoSet' || path === '/userInfoSet/1') {
        storage.delLocalStorage('modifyName')
        this.$router.push('/personCenter')
      } else if (path === '/activitysList/1') {
        this.$router.push('/personCenter')
      } else if (path === '/activitysList/0') {
        this.$router.push('/find')
      } else {
        this.$router.back(-1)
      }
    },
    perCompleteOper () {
      this.$emit('operComplete')
    },
    titleScroll () {

    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
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
			bgImage('/static/icons/back')
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
