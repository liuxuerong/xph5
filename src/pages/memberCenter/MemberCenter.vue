<template>
  <div class="memberCenter">
    <div class="topMember">
      <CommonOpaHeader>
        <span class="about">关于会员卡</span>
      </CommonOpaHeader>
      <div class="swiperOut">
        <swiper ref="mySwiper" :options="swiperOption" class="swiperCont">
          <swiper-slide class="cardWrap">
            <div class="top clearfix">
              <div class="status statusOther fl">已升级</div>
              <div class="no fr no1">NO.370010100001</div>
            </div>
            <div class="name">普卡会员</div>
            <div class="time">有效期至2019-12-31</div>
            <ul class="integral">
              <li>
                <span class="num">12555</span>
                <em>剩余积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>当前积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>距升级积分</em>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide class="cardWrap">
            <div class="top clearfix">
              <div class="status statusNow fl">当前等级</div>
              <div class="no fr no2">NO.370010100001</div>
            </div>
            <div class="name">金卡会员</div>
            <div class="time time2">有效期至2019-12-31</div>
            <ul class="integral integral2">
              <li>
                <span class="num">12555</span>
                <em>剩余积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>当前积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>距升级积分</em>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide class="cardWrap">
            <div class="top clearfix">
              <div class="status statusOther fl">待升级</div>
              <div class="no fr no3">NO.370010100001</div>
            </div>
            <div class="name">白金卡会员</div>
            <div class="time time3">有效期至2019-12-31</div>
            <ul class="integral integral3">
              <li>
                <span class="num">12555</span>
                <em>剩余积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>当前积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>距升级积分</em>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide class="cardWrap">
            <div class="top clearfix">
              <div class="status statusOther fl">待升级</div>
              <div class="no fr no4">NO.370010100001</div>
            </div>
            <div class="name name4">黑金卡会员</div>
            <router-link to="/transactionRecord" class="time time4">有效期至2019-12-31 <span class="arrow"></span> </router-link>
            <ul class="integral integral4">
              <li>
                <span class="num">12555</span>
                <em>剩余积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>当前积分</em>
              </li>
              <li>
                <span class="num">12555</span>
                <em>距升级积分</em>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="bottomMember">
      <div class="privilege">
        <h4 class="title">专享以下特权</h4>
        <ul v-show="activeIndex===0">
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege1.png" alt>
              <p>2倍</p>
            </div>
            <span>生日积分</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2.png" alt>
              <p>4张</p>
            </div>
            <span>现金抵用券</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2-3.png" alt>
            </div>
            <span>免费送货</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege4.png" alt>
              <p>2小时/年</p>
            </div>
            <span>免费停车</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2-5.png" alt>
            </div>
            <span>特色服务</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege6.png" alt>
            </div>
            <span>VIP客服</span>
          </li>
        </ul>
        <ul v-show="activeIndex===1">
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege1.png" alt>
              <p>2倍</p>
            </div>
            <span>生日积分</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2.png" alt>
              <p>4张</p>
            </div>
            <span>现金抵用券</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege3.png" alt>\
              <p>1次/年</p>
            </div>
            <span>免费送货</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege4.png" alt>
              <p>2小时/年</p>
            </div>
            <span>免费停车</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2-5.png" alt>
            </div>
            <span>特色服务</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege6.png" alt>
            </div>
            <span>VIP客服</span>
          </li>
        </ul>
        <ul v-show="activeIndex===2">
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege1.png" alt>
              <p>2倍+礼物</p>
            </div>
            <span>生日积分</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2.png" alt>
              <p>5张</p>
            </div>
            <span>现金抵用券</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege3.png" alt>
              <p>2次/年</p>
            </div>
            <span>免费送货</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege4.png" alt>
              <p>2小时/年</p>
            </div>
            <span>免费停车</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege5.png" alt>
              <p>干洗1次/年</p>
            </div>
            <span>特色服务</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege6.png" alt>
            </div>
            <span>VIP客服</span>
          </li>
        </ul>
        <ul v-show="activeIndex===3">
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege1.png" alt>
              <p>2倍+礼物</p>
            </div>
            <span>生日积分</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege2.png" alt>
              <p>6张</p>
            </div>
            <span>现金抵用券</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege3.png" alt>\
              <p>3次/年</p>
            </div>
            <span>免费送货</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege4.png" alt>
              <p>2小时/年</p>
            </div>
            <span>免费停车</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege5.png" alt>
              <p>干洗+除螨(1+2)次/年</p>
            </div>
            <span>特色服务</span>
          </li>
          <li class="item">
            <div class="img">
              <img src="../../icons/privilege6.png" alt>
            </div>
            <span>VIP客服</span>
          </li>
        </ul>
      </div>
      <div class="buy">
        <h4 class="title">会员套餐</h4>
        <div class="wrap">
          <span class="name">两年黑金卡会员</span>
          <em>尊享全部特权</em>
          <span class="price fr">￥
            <strong>99</strong>
          </span>
        </div>
        <div class="agree">
          <div class="checkIconMember">
            <check-icon :value.sync="check" ></check-icon>
          </div>
          <span>我已阅读并同意</span>
          <router-link to="/aboutMember" class="link">《星品优汇会员服务说明》</router-link>
        </div>
        <div class="btnOpen">立即开通</div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  CheckIcon
} from 'vux'
import 'swiper/dist/css/swiper.css'
import CommonOpaHeader from 'common/commonHeader/CommonOpaHeader'
export default {
  name: 'MemberCenter',
  components: {
    swiper,
    swiperSlide,
    CommonOpaHeader,
    CheckIcon
  },
  data () {
    return {
      check: false,
      activeIndex: 0,
      swiperOption: {
        direction: 'horizontal',
        spaceBetween: 15,
        notNextTick: true,
        on: {
          slideChangeTransitionEnd: () => {
            this.activeIndex = this.swiper.activeIndex
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
  watch: {},
  methods: {},
  created () {

  }
}
</script>
<style lang="stylus" scoped>
.topMember
  background-color #252525
  height 666px
  padding-top 196px
  .about
    font-size 40px
    color #fff
    font-weight normal
    float right
.swiperOut
  padding 0 50px
.swiperCont
  width 94%
  margin 0 auto
  overflow visible
.cardWrap:nth-child(1)
  background url('https://resource.upinstar.com/part1_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(2)
  background url('https://resource.upinstar.com/part2_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(3)
  background url('https://resource.upinstar.com/part3_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(4)
  background url('https://resource.upinstar.com/part4_card.png') no-repeat center center / 100% 100%
.cardWrap
  height 470px
  .status
    font-size 36px
    height 80px
    line-height 80px
    padding-left 33px
    padding-right 50px
    border-bottom-right-radius 80px
    display inline-block
    background-color #333333
  .status.statusOther
    color #B77C58
  .status.statusNow
    opacity 0.3
    color #fff
  .no
    padding-right 50px
    font-size 36px
    line-height 80px
  .no1
    color #8E92A1
  .no2
    color #C08663
  .no3
    color #97999B
  .no4
    color #262626
  .name
    color #333333
    font-size 66px
    font-weight 600
    padding 32px 0 0 55px
    line-height 102px
  .name4
    color #FFFFFF
  .time
    font-size 32px
    color #8E92A1
    line-height 50px
    padding-left 55px
  .time2
    color #C08663
  .time3
    color #97999B
  .time4
    color #262626
  .integral
    padding-top 60px
    padding-left 55px
    font-size 0
    li
      display inline-block
      padding-right 150px
      .num
        font-size 56px
        color #333333
        font-weight 600
        line-height 60px
        display block
      em
        line-height 50px
        font-size 32px
        color #8E92A1
        display block
    li:last-child
      padding-right 0
  .integral2
    li
      em
        color #C08663
  .integral3
    li
      em
        color #97999B
  .integral4
    li
      .num
        color #FFFFFF
      em
        color #262626
.privilege
  width 100%
  background-color #fff
  ul
    padding 0 90px
    font-size 0
  li
    width 180px
    height 345px
    display inline-block
    margin-right 200px
  li:nth-child(3n)
    margin-right 0
  li
    .img
      width 180px
      height 180px
      position relative
      img
        width 100%
        height 100%
    p
      position absolute
      top 140px
      height 42px
      line-height 42px
      padding 0 22px
      min-width 160px
      text-align center
      background linear-gradient(-51deg, rgba(193, 153, 114, 1), rgba(238, 190, 147, 1))
      border-radius 21px
      color #fff
      left 50%
      transform translateX(-50%)
      font-size 30px
      white-space nowrap
    span
      display inline-block
      color #333333
      font-size 36px
      text-align center
      line-height 97px
      width 100%
.buy
  .wrap
    background #F5F5F5
    padding 0 34px
    margin-left 34px
    margin-right 64px
    height 150px
    line-height 150px
    .name
      color #333333
      font-size 42px
      font-weight 600
    em
      width 222px
      height 46px
      line-height 46px
      text-align center
      display inline-block
      color #fff
      font-size 30px
      border-radius 23px
      background linear-gradient(-51deg, rgba(193, 153, 114, 1), rgba(238, 190, 147, 1))
    .price
      color #CC986E
      font-size 30px
      vertical-align middle
      line-height 150px
      strong
        font-size 66px
.bottomMember
  padding-bottom 150px
  .title
    color #333333
    font-size 50px
    padding 0 50px
    line-height 158px
    padding-top 30px
    font-weight 600
.agree
  padding 40px 0 132px 30px
  .checkIconMember
    width 60px
    height 60px
    margin-right 14px
    display inline-block
  span
    font-size 36px
    color #808080
  .link
    font-size 36px
    color #CC986E
.btnOpen
  width 90%
  margin 0 auto
  height 150px
  line-height 150px
  background #333333
  text-align center
  font-size 56px
  color #CD996E
  position fixed
  bottom 0
  left 5%
.arrow
  width 0
  height 0
  border 16px solid transparent
  border-left 16px solid #333
  display inline-block
  position relative
  top 2px
</style>
<style lang="stylus">
 .checkIconMember .vux-check-icon
    line-height 60px
    width 60px
    height 60px
  .checkIconMember .weui-icon-circle
    font-size 50px
  .checkIconMember .weui-icon-success
    color #BA825A
    font-size 50px
  .checkIconMember [class^="weui-icon-"]:before,.checkIcon [class*=" weui-icon-"]:before
    margin 0
  .checkIconMember .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before
    color #BA825A
</style>
