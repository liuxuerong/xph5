<template>
  <div class="memberCenter">
    <div class="topMember">
      <CommonOpaHeader>
        <span class="about">关于会员卡</span>
      </CommonOpaHeader>
      <div class="swiperOut">
        <swiper ref="mySwiper" :options="swiperOption" class="swiperCont">
          <swiper-slide class="cardWrap">
            <div class="top">
              <div class="status">已升级</div>
              <div class="no">NO.370010100001</div>
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
            <div class="top">
              <div class="status">已升级</div>
              <div class="no">NO.370010100001</div>
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
            <div class="top">
              <div class="status">已升级</div>
              <div class="no">NO.370010100001</div>
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
        </swiper>
      </div>
    </div>
    <div class="bottomMember">
      <div class="privilege">
        <h4 class="title">专享以下特权</h4>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="buy">
        <h4 class="title">
          会员套餐
        </h4>
        <div class="wrap">
          <span class="name">两年黑金卡会员</span>
          <em>尊享全部特权</em>
          <span class="price fr">￥<strong>99</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import CommonOpaHeader from 'common/commonHeader/CommonOpaHeader'
export default {
  name: 'MemberCenter',
  components: {
    swiper,
    swiperSlide,
    CommonOpaHeader
  },
  data () {
    return {
      swiperOption: {
        direction: 'horizontal',
        spaceBetween: 15,
        notNextTick: true,
        on: {
          slideChangeTransitionEnd: () => {
            // alert(this.activeIndex)
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
  created () {}
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
.cardWrap
  height 470px
.cardWrap:nth-child(1)
  background url('https://resource.upinstar.com/part1_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(2)
  background url('https://resource.upinstar.com/part2_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(3)
  background url('https://resource.upinstar.com/part3_card.png') no-repeat center center / 100% 100%
.cardWrap:nth-child(4)
  background url('https://resource.upinstar.com/part4_card.png') no-repeat center center / 100% 100%
.privilege
  width 100%
  background-color #fff
  ul
    padding 0 90px
    font-size 0
    // display flex
    // justify-content space-between
    // flex-wrap wrap
  li
    width 180px
    height 345px
    background pink
    display inline-block
    margin-right 200px
  li:nth-child(3n)
    margin-right 0
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
      background linear-gradient(-51deg,rgba(193,153,114,1),rgba(238,190,147,1))
    .price
      color #CC986E
      font-size 30px
      strong
        font-size 66px
.bottomMember
  .title
    color #333333
    font-size 50px
    padding 0 50px
    line-height 158px
    padding-top 30px
    font-weight 600

</style>
