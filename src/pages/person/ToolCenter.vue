<template>
  <div class="wrapper">
    <div class="centerHeader">
      <div class="userInfoTop">
        <span class="prevOper" @click="backPrevOper">&lt;</span>
        <h3 class="userInfoTitle">个人中心</h3>
      </div>
      <div class="centerHeaderBot">
        <img v-if="headImage === undefined" src="/static/images/memberHeader.png" class="headerImg">
        <img v-else :src="imageUrl+headImage" class="headerImg">
        <div class="headerInfoText">
          <h3>{{name}}</h3>
          <span class="memberGrade">
            <i class="memberGradeIcon memberGradeIcon01" v-if="memberLevelName === '普卡'"></i>
            <i class="memberGradeIcon memberGradeIcon02" v-else-if="memberLevelName === '银卡'"></i>
            <i class="memberGradeIcon memberGradeIcon03" v-else-if="memberLevelName === '金卡'"></i>
            <i class="memberGradeIcon memberGradeIcon04" v-else-if="memberLevelName === '钻卡'"></i>
            {{memberLevelName}}
          </span>
          <div class="stopTimeTips">
            <p class="left">NO.370010100001</p>
            <p class="rigth">2019年12月31日到期</p>
          </div>
        </div>
      </div>
    </div>
    <div class="gradeTips">您距离下一年延续 {{memberLevelName}}会员 还有<span>{{protectMemberLevel}} 元</span>的距离</div>
    <div class="toolCon">
      <person-title content="我的会员成长" :moreShow="moreShow"></person-title>
      <div class="inteShow">累计消费<span>{{integral}}</span>,还剩<span> {{upgradeIntegral}} </span>可升为 {{nextMemberLevelName}}</div>
      <div ref="memberGrade" class="indexNavWrapper">
        <ul class="memberGradeScroll">
          <li :class="memberLevelName === '普卡'?'active':''"><i class="memberGradeIcon01"></i><span>普卡</span></li>
          <li :class="memberLevelName === '银卡'?'active':''"><i class="memberGradeIcon02"></i><span>银卡</span></li>
          <li :class="memberLevelName === '金卡'?'active':''"><i class="memberGradeIcon03"></i><span>金卡</span></li>
          <li :class="memberLevelName === '钻卡'?'active':''"><i class="memberGradeIcon04"></i><span>钻卡</span></li>
        </ul>
      </div>
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
      <router-link class="toolInteItem border-bottom" to="/integralDetails">
        <h3>我的积分</h3>
        <p>{{integral}} 积分</p>
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
import PersonTitle from './ComCenterSmillTitle'
import BScroll from 'better-scroll'
import {memberData} from 'util/netApi'
import {http} from 'util/request'
import { config } from 'util/config'
export default {
  data () {
    return {
      moreShow: false,
      name: '',
      integral: '', // 积分
      memberLevelName: '', // 会员等级
      nextMemberLevelName: '', // 下一个等级
      protectMemberLevel: Number, // 保级积分
      upgradeIntegral: 0, // 升级积分
      active: '1',
      imageUrl: config.imageUrl, // 图片路径
      headImage: ''
    }
  },
  components: {
    PersonTitle
  },
  methods: {
    // 返回上一级
    backPrevOper () {
      this.$router.back(-1)
    },
    // 页面初始化 渲染
    dataRender () {
      http(memberData).then((response) => {
        console.log(response)
        let data = response.data.body
        this.name = data.name
        this.headImage = data.headImage
        this.integral = data.integral
        this.memberLevelName = data.memberLevelName
        if (data.memberLevelName === '普卡') {
          this.nextMemberLevelName = '银卡会员'
          this.upgradeIntegral = (2000 - data.integral)
          this.protectMemberLevel = 0
        } else if (data.memberLevelName === '银卡') {
          this.nextMemberLevelName = '金卡会员'
          this.upgradeIntegral = 5000 - data.integral
          this.protectMemberLevel = 1000 - data.integral
        } else if (data.memberLevelName === '金卡') {
          this.nextMemberLevelName = '钻石会员'
          this.upgradeIntegral = 10000 - data.integral
          this.protectMemberLevel = 3000 - data.integral
        } else {
          this.nextMemberLevelName = ''
          this.protectMemberLevel = 5000 - data.integral
        }
      })
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.memberGrade, {
      bounce: {
        left: true,
        right: true
      },
      scrollY: false,
      scrollX: true,
      click: true,
      startX: 0
    })
    this.dataRender()
  }
}

</script>
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
    span
      color #BA825A
      box-sizing border-box
      padding 0 20px
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
  .indexNavWrapper
    overflow hidden
    .memberGradeScroll
      width 1460px
      width calc(280px*3 + 152px*4)
      height 100%
      li
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
          background linear-gradient(90deg,rgba(201,158,135,1),rgba(237,198,162,1))
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
      li:last-child
        margin-right 0
        &:after
          display none
      li.active
        i
          width 152px
          height 174px
          position relative
          top -20px
        &:after
          background #E6E6E6
      li.active ~ li
        &:after
          background #E6E6E6
</style>
