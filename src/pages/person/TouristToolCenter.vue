<template>
  <div class="wrapper">
    <userinfo-header :title="title" oper=""></userinfo-header>
    <div class="toolCon">
      <person-title content="我的会员成长" :moreShow="moreShow"></person-title>
      <div class="inteShow" v-if="active === 0">
        <span>免费注册</span>, 即可成为普卡会员
      </div>
      <div class="inteShow" v-if="active === 1">
        普卡累计消费<span>2000</span>，可升级为银卡
      </div>
      <div class="inteShow" v-if="active === 2">
        银卡累计消费<span>5000</span>，可升级为金卡
      </div>
      <div class="inteShow" v-if="active === 3">
        金卡累计消费<span>10000</span>，可升级为钻卡
      </div>
      <swiper ref="mySwiper" :options="swiperOption" class="memberGradeScroll">
        <swiper-slide></swiper-slide>
        <swiper-slide>
          <div class="swiperItem active"><i class="memberGradeIcon01"></i><span>普卡</span></div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiperItem"><i class="memberGradeIcon02"></i><span>银卡</span></div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiperItem"><i class="memberGradeIcon03"></i><span>金卡</span></div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiperItem last"><i class="memberGradeIcon04"></i><span>钻卡</span></div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
      <person-title content="会员福利及权益" :moreShow="moreShow"></person-title>
      <div class="memberActive">
        <div class="memberActiveItem">
          <i class="activityIcon activityIcon01"></i>
          <p>享积分</p>
        </div>
        <div class="memberActiveItem">
          <i class="activityIcon activityIcon02"></i>
          <p>享优惠品</p>
        </div>
        <div class="memberActiveItem">
          <i class="activityIcon activityIcon03"></i>
          <p>享礼品</p>
        </div>
        <div class="memberActiveItem">
          <i class="activityIcon activityIcon04"></i>
          <p>VIP客服</p>
        </div>
      </div>
    </div>
    <div class="toolInte">
      <router-link class="toolInteItem border-bottom" to="/integralRule">
        <h3>积分规则</h3>
        <i class="aboutIcon"></i>
      </router-link>
    </div>
    <div class="memberGradeExplain">
      <router-link to="./aboutMember" class="memberGradeItem">
        <h3>关于会员卡</h3>
        <i class="aboutIcon"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import PersonTitle from './ComCenterSmillTitle'
export default {
  name: 'TouristToolCenter',
  data () {
    return {
      title: '会员福利',
      moreShow: false,
      active: Number,
      totalShoppingMoneyHTML: '',
      swiperOption: {
        direction: 'horizontal',
        spaceBetween: 90,
        slidesPerView: 3,
        notNextTick: true,
        on: {
          slideChangeTransitionEnd: () => {
            this.grandRender()
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    PersonTitle,
    swiper,
    swiperSlide,
    UserinfoHeader
  },
  methods: {
    // 返回上一级
    backPrevOper () {
      this.$router.back(-1)
    },
    // 页面初始化 渲染
    dataRender () {
      this.swiper.activeIndex = 0
      this.grandRender()
    },
    grandRender () {
      this.active = this.swiper.activeIndex
    }
  },
  mounted () {
    this.dataRender()
  }
}
</script>
<style lang="stylus">
html,body,#app
  position absolute
  width 100%
  left 0
  right 0
  bottom 0
  top 0
  height 0
  background #fff!important
</style>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .memberGradeScroll
    width 100%
  .swiper-slide
    width 33%
    text-align center
    .swiperItem
      float left
      width 160px
      height 220px
      margin-right 264px
      box-sizing border-box
      padding-top 20px
      position relative
      &:after
        content ''
        width 280px
        height 8px
        position absolute
        left 158px
        top 39%
        background #E6E6E6
        // background linear-gradient(90deg,rgba(201,158,135,1),rgba(237,198,162,1))
      i
        display block
        width 116px
        height 128px
        margin 0 auto
      .memberGradeIcon01
        bgImage('/static/icons/menberGrade01')
      .memberGradeIcon02
        bgImage('/static/icons/menberGrade02')
      .memberGradeIcon03
        bgImage('/static/icons/menberGrade03')
      .memberGradeIcon04
        bgImage('/static/icons/menberGrade04')
      span
        width 100%
        height 40px
        font-size 36px
        color #666666
        line-height 40px
        text-align center
        position absolute
        left 0
        bottom 0
    .swiperItem.last
      &:after
        display none
    .swiperItem.active
      i
        width 152px
        height 174px
        position relative
        top -20px
      &:after
        background linear-gradient(90deg,rgba(201,158,135,1),rgba(237,198,162,1))
    .swiperItem.active
      &:after
        background #E6E6E6
</style>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
   background #F5F5F5
   box-sizing border-box
   padding-bottom 200px
  .centerHeader
    width 100%
    height 760px
    background rgba(0,0,0,0.8)
    position relative
  .userInfoTop
    width 100%
    height 130px
    box-sizing border-box
    padding 0 50px
    position relative
    .prevOper
      display block
      font-size 70px
      width 32px
      height 130px
      line-height 130px
      color #fff
      font-weight bold
    .userInfoTitle
      width 60%
      height 130px
      line-height 130px
      margin 0 auto
      font-size 56px
      color #fff
      text-align center
      font-weight 600
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      margin auto
  .centerHeaderBot
    width 88%
    height 470px
    bgImage('/static/images/centerHeaderBg')
    position absolute
    left 0
    right 0
    bottom 0
    margin auto
    img
      float left
      width 209px
      height 209px
      margin 50px
    .headerInfoText
      float left
      margin 50px 0
      h3
        width auto
        font-size 56px
        color #252525
        height 100px
        line-height 100px
        font-weight bold
        margin-bottom 20px
      .memberGrade
        width auto
        height 70px
        line-height 70px
        font-size 36px
        color #B77C58
        .memberGradeIcon
          float left
          width 60px
          height 70px
          background red
          margin-right 50px
        .memberGradeIcon01
          bgImage('/static/icons/menberGrade01')
        .memberGradeIcon02
          bgImage('/static/icons/menberGrade02')
        .memberGradeIcon03
          bgImage('/static/icons/menberGrade03')
        .memberGradeIcon04
          bgImage('/static/icons/menberGrade04')
    .stopTimeTips
      width 100%
      height 94px
      line-height 94px
      color #B77C58
      box-sizing border-box
      padding 0 30px
      position absolute
      left 0
      bottom 0
      right 0
      .left
        float left
        font-size 46px
      .rigth
        float right
        font-size 36px
  .gradeTips
    width 100%
    height 120px
    line-height 120px
    text-align center
    font-size 40px
    color #262626
    box-shadow 0px 0px 6px 6px rgba(228,228,228,0.6)
    border-radius 0px 0px 12px 20px
    span
      font-size 40px
      color #262626
      i
        color #BA825A
        box-sizing border-box
        padding 0 20px
  .toolCon
    width 100%
    box-sizing border-box
    padding 80px 50px
    background #fff
    margin-bottom 30px
  .inteShow
    width 84%
    height 128px
    line-height 128px
    text-align center
    font-size 36px
    color #4D4D4D
    margin 70px auto
    background #F5F5F5
    border-radius 60px
    position relative
    p
      display inline-block
    span
      color #BA825A
      box-sizing border-box
      padding 0 20px
  .inteShow:after
    display block
    content ""
    width 30px
    height 30px
    transform rotate(45deg)
    position absolute
    left 0
    right 0
    bottom -15px
    margin auto
    background #F5F5F5
  .memberActive
    display flex
    width 100%
    height 400px
    background #FBF6F1
    .memberActiveItem
      flex 1
      .activityIcon
        display block
        width 180px
        height 180px
        margin 62px auto 52px
      .activityIcon01
        bgImage('/static/icons/activityIcon01')
      .activityIcon02
        bgImage('/static/icons/activityIcon02')
      .activityIcon03
        bgImage('/static/icons/activityIcon03')
      .activityIcon04
        bgImage('/static/icons/activityIcon04')
      p
        display block
        width 100%
        font-size 40px
        color #262626
        text-align center
  .toolInte,.memberGradeExplain
    width 100%
    background #fff
    .toolInteItem,.memberGradeItem
      display block
      width 88%
      height 180px
      line-height 180px
      margin 0 auto
      h3
        display inline-block
        font-size 56px
        color #333
        font-weight bold
      p
        float right
        font-size 40px
        color #BA825A
      .aboutIcon
        float right
        width 24px
        height 45px
        bgImage('/static/icons/enterNextGray')
        margin-top 70px
        margin-left 30px
</style>
