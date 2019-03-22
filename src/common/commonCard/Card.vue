<template>
  <div
    class="cardVouItem"
    :class="[index ===0?'':'grayCardVouItem','cardVouItem'+item.type]"
  >
    <div
      class="cover"
      v-if="(index !==0||(item.useStatus == '2' && item.display=='1'))&&showOperate"
    ></div>
    <div class="top">
      <div class="left">
        <span v-if="item.type == '1' || item.type == '3'||item.type == '4'">￥<i>{{item.subMoney}}</i></span>
        <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 2"><i>{{parseInt(item.discount.toString().replace(".", ""))}}</i> 折</span>
        <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 3"><i>{{item.discount.toString().replace(".", "")/10}}</i> 折</span>
        <p v-if="item.type == '1'">满减券</p>
        <p v-if="item.type == '2'">折扣券</p>
        <p v-if="item.type == '3'">立减券</p>
        <p v-if="item.type == '4'">免邮券</p>
      </div>
      <div class="right">
        <div class="name">
          <h3>{{item.name}}</h3>
          <!-- 未使用 -->
          <div
            class="cardVoucherOper"
            v-if="index === 0&&showOperate"
          >
            <span
              class="operBtn newReceive"
              v-if="item.useStatus == '1'"
              @click.stop="receiveCard(item.id)"
            >立即领取</span>
            <span
              class="operBtn newUse"
              v-if="item.useStatus == '2'"
              @click="useClick(item)"
            >立即使用</span>
            <!-- <span class="operBtn newUse" v-if="type == '2'||type == '3'" @click="useCoupon(item,item.type)">立即使用</span> -->
            <span
              class="operBtn noReceive"
              v-if="item.useStatus == '3'"
            >抢光了</span>
          </div>
           <!-- 已使用 -->
          <div
            class="cardVoucherOper"
            v-if="index ===1&&showOperate"
          >
            <span class="operBtn noReceive">已使用</span>
          </div>
          <!-- 已失效 -->
          <div
            class="cardVoucherOper"
            v-if="index ===2&&showOperate"
          >
            <span class="operBtn noReceive">已失效</span>
          </div>
        </div>

        <div class="displayBtn">
          <div
            class="fullSub"
          >
            <span v-if="item.applyType == '1'">[通用券]</span>
            <span v-if="item.applyType == '2'">[app专享]</span>
            <span v-if="item.applyType == '3'">[门店专享]</span>
            <span v-if="item.range == '1'">限定商品</span>
            <span v-else-if="item.range == '2'">限定门店</span>
            <span v-else-if="item.range == '3'">限指分类</span>
            <span v-else-if="item.range == '4'">全品类通用</span>
          </div>
        </div>
        <!-- 未使用 -->
        <div
          class="activityTime"
          v-if="index == 0"
        >
          <!-- 立即领取 可以领取-->
          <!-- 领光了 -->
          <span
            v-if="item.useStatus == '1'||item.useStatus == '3'"
            class="activityTime"
          >领取时限:{{item.activityStart|timeFilter}} - {{item.activityEnd|timeFilter}}</span>
          <!-- 立即使用  到达使用时间-->
          <span v-else-if="item.useStatus == '2'">使用时限:{{item.overdueStart|timeFilter}} - {{item.overdueEnd|timeFilter}}</span>
          <span
            v-else-if="item.useStatus == '2' && item.invalidDay"
            class="countDown"
          >{{item.invalidDay>0?item.invalidDay+'天后过期':'1天后过期'}}</span>
          <span
            class="cardDetails"
            v-if="showOperate"
            @click.stop="cardDetailsPages"
          >详情&nbsp;></span>
        </div>
        <div
          class="activityTime"
          v-else
        >
          <span class="activityTime">{{item.activityStart|timeFilter}} - {{item.activityEnd|timeFilter}}</span>
          <span
            class="cardDetails"
            v-if="showOperate"
            @click.stop="cardDetailsPages"
          >详情&nbsp;></span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import {storage} from 'util/storage'
export default {
  name: 'Card',
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number,
      default: 0
    },
    showOperate: {
      // 是否显示按钮和详情文字
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  filters: {
    timeFilter: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('T')[0].replace(/-/gi, '.')
    }
  },
  methods: {
    // 领取优惠券
    receiveCard (id) {
      this.$emit('receiveCard')
    },
    // 使用按钮点击
    useClick (item) {
      this.$emit('useClick', item)
    },
    // 卡券详情
    cardDetailsPages () {
      storage.setLocalStorage('card', this.item)
      this.$router.push(`/cardDetails/${this.item.useStatus}/0/${this.item.id}`)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'

.cardVouItem
  width 100%
  height 280px
  margin-bottom 50px
  position relative
  background url('../../images/card_bg1.png') no-repeat center center / 100% 100%
  .cover
    position absolute
    top 0
    left 0
    background rgba(255, 255, 255, 0.5)
    width 100%
    height 100%
    z-index 1
  .left
    float left
    width 300px
    height 280px
    box-sizing border-box
    padding-top 60px
    span
      display block
      width 100%
      height 80px
      line-height 80px
      font-size 40px
      font-weight bold
      text-align center
      color #333333
      i
        display inline-block
        font-size 80px
        color #333333
        font-weight bold
    p
      display block
      width 180px
      height 52px
      line-height 52px
      text-align center
      font-size 30px
      margin 30px auto 0
      background rgba(255, 255, 255, 1)
      opacity 0.4
      color #79A299
  .right
    float left
    width 70%
    box-sizing border-box
    padding 30px 40px 0
    .name
      display flex
    h3
      flex 1
      font-size 42px
      font-weight bold
      color #333333
    .displayBtn
      width 100%
      div
        display inline-block
.cardVouItem2
  background url('../../images/card_bg2.png') no-repeat center center / 100% 100%
  .activityTime, .left p, .cardDetails
    color #C18C8C
.cardVouItem4
  background url('../../images/card_bg4.png') no-repeat center center / 100% 100%
  .activityTime, .left p, .cardDetails
    color #B59677
.operBtn
  float right
  width 160px
  height 60px
  text-align center
  line-height 60px
  font-size 30px
  border-radius 30px
.newUse
  background-color #333333
  color #fff
.newReceive
  border 2px solid rgba(51, 51, 51, 1)
  background-color #fff
  color #333333
.noReceive
  color #fff
  background rgba(51, 51, 51, 1)
  opacity 0.4
.activityTime
  width 100%
  margin-top 30px
  font-size 30px
  color #5A9E8F
.countDown
  color #CC6E6E
.fullSub
  font-size 32px
  color #333333
.cardDetails
  float right
  font-size 30px
  color #5A9E8F
.cardVoucherOper
  width 160px
</style>
