<template>
    <div class="userInfoTop border-bottom" @scroll="titleScroll">
		<span class="prevOper" @click="backPrevOper"></span>
		<h3 class="userInfoTitle">{{title}}</h3>
		<span class="completeOper" @click="perCompleteOper">{{oper}}</span>
	</div>
</template>
<script>
export default {
  // 接受父级数据
  props: {
    title: '',
    oper: ''
  },
  methods: {
    // 返回上一步
    backPrevOper: function () {
      this.$router.back(-1)
    },
    perCompleteOper: function () {
      this.$emit('operComplete')
    },
    titleScroll () {

    }
  },
  mounted: function () {
    // console.log(this.title)
    // console.log(this.oper)
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
	background #fff
	.prevOper
		display block
		width 32px
		height 58px
		bgImage('/static/icons/back')
		position absolute
		left 50px
		top 0
		bottom 0
		margin auto
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
