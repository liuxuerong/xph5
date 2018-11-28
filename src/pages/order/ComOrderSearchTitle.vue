<template>
	<div class="titleWrapper">
		<div class="userInfoTop" v-if="!searchState">
			<span class="prevOper" @click="backPrevOper">
				<i class="backOperIcon"></i>
			</span>
			<h3 class="userInfoTitle">{{title}}</h3>
			<span v-if="oper == '1'" :class="oper == '1' ? 'comOperSearch' : ''" @click="comOperSearch"></span>
			<!-- 评论完成提交 -->
			<span v-if="oper == 3" :class="oper == 3 ? 'commentSubmit' : ''" @click="commentSubmit">完成</span>
		</div>
		<div class="userInfoTop clearfix" v-if="searchState">
			<div class="searchInput clearfix">
				<form action="javascript:return true;">
					<input type="search" @keypress="searchGoods" v-model="searchName" name="" class="" placeholder="搜索订单">
				</form>
				<span class="comOperSearch"></span>
			</div>
			<span class="cancelOper" @click="cancelOper">取消</span>
		</div>
		<div v-if="searchState" class="mask" @click="maskOper" @touchmove.prevent></div>
	</div>
</template>
<script>
import {storage} from 'util/storage'
import {searchorder} from 'util/const'
export default {
  data () {
    return {
      searchState: false,
      searchName: '',
      path: Number
    }
  },
  // 接受父级数据
  props: {
    title: '',
    oper: ''
  },
  methods: {
    // 返回上一步
    backPrevOper () {
      console.log(this.$route.path)
      let path = this.$route.path.split('/')[1]
      console.log(path)
      if (path === 'paymentSucc' || path === 'orderList') {
        this.$router.push('/personCenter')
      } else {
        this.$router.back(-1)
      }
    },
    // 评论提交
    commentSubmit () {
      this.$emit('commentSubmit')
    },
    // 搜素点击事件
    comOperSearch () {
      this.searchState = true
    },
    // 取消搜索
    cancelOper () {
      this.searchState = false
    },
    // 遮罩
    maskOper () {
      this.searchState = false
    },
    // 搜索
    searchGoods (event) {
      if (event.keyCode === 13) {
        // 点击了手机键盘搜索
        if (this.searchName !== '') {
          storage.setLocalStorage(searchorder, this.searchName)
          this.$router.push('/searchOrder')
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.mask
	position fixed
	width 100%
	height 100%
	z-index 99
	background rgba(0,0,0,0.2)
.userInfoTop
	width 100%
	height 130px
	box-sizing border-box
	padding 0 50px
	position fixed
	left 0
	top 0
	background #fff
	z-index 999
	border 1px solid #f5f5f5
	.searchInput
		float left
		width 88%
		height 100px
		border-radius 10px
		margin-top 12px
		box-sizing border-box
		padding-right 20px
		overflow hidden
		background #f5f5f5
		.comOperSearch
			margin-top 20px
		input[type='search']
			float left
			height 100%
			height 100px
			line-height 100px
			width 90%
			box-sizing border-box
			padding 0 40px
			background #f5f5f5
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
	.comOperSearch
		float right
		width 80px
		height 80px
		margin-top 30px
		bgImage('/static/icons/serch_icon')
	.commentSubmit
		float right
		width auto
		height 60px
		font-size 40px
		color #808080
		margin-top 30px
	.cancelOper
		float left
		width 12%
		font-size 40px
		color #808080
		text-align right
		height 130px
		line-height 130px
	::-moz-placeholder {
		font-size 40px
		color #808080
	}

	:-ms-input-placeholder {
		font-size 40px
		color #808080
	}

	::-moz-placeholder {
		font-size 40px
		color #808080
	}

	::-webkit-input-placeholder {
		font-size 40px
		color #808080
	}
</style>
