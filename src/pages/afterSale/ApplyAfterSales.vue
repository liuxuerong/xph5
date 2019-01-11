<template>
  <div class="wrapper">
    <common-nav-header :title="title" />
    <div class="refundCon" v-if="goodsData">
      <goods-item :goodsData="goodsData"></goods-item>
      <div class="wrap">
        <div class="cellLink" @click="changePopStatus('statusVisible')" v-if="this.orderStatus!=2&&this.params.type!=3">
          <div class="text">货物状态<span class="fr placeholder" v-if="params.goodsType==''">请选择</span><em v-else>{{params.goodsType==1?'已收到货':'未收到货'}}</em></div>
        </div>
        <div class="cellLink" @click="changePopStatus('reasonVisible')" v-if="this.params.type!=3">
          <div class="text">退款原因<span class="fr placeholder" v-if="params.reason==''">请选择</span><em v-else>{{params.reason}}</em>
            <p class="tip" v-if="params.reason!=''">请在退款说明处填写具体情况</p>
          </div>
        </div>
        <div class="cellLink" @click="changePopStatus('reasonVisible')" v-if="this.params.type==3">
          <div class="text">维修原因<span class="fr placeholder" v-if="params.reason==''">请选择</span><em v-else>{{params.reason}}</em>
            <p class="tip" v-if="params.reason!=''">请在问题描述处填写具体情况</p>
          </div>
        </div>
        <div class="cellLink" v-if="params.type!=3">
          <div>商品数量
            <span class="modify fr">
              <div class="num" ref="num">
                <span class="sub fl" @click="subCount" :class="{disable:subDisabled}">_</span>
            <input type="text" class="fl" v-model="params.num" @keyup="changeStyle">
            <span class="add fr" @click="addCount" ref="add" :class="{disable:addDisabled}">+</span>
          </div>
          </span>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="moneyWrap clearfix">
        <span class="fl">退款金额 </span>
        <span class="money fr">￥{{(goodsData.actualPrice*params.num).toFixed(2)}}</span>
      </div>
      <p class="info">最多退款 <i> ￥{{(goodsData.actualPrice*params.num).toFixed(2)}}</i>元，不包含运费</p>
    </div>
    <div class="wrap">
      <div class="padding50">
        <div class="titleWrap" v-if="this.params.type!=3">退款说明</div>
        <div class="titleWrap" v-else>问题描述</div>
        <div class="evaluateText">
          <textarea class="evaluateArea" :maxlength="300" ref="evaluateText" v-model="params.desc" placeholder="请描述申请售后服务的具体原因，还可上传最多5张图片哦~（选填）~" cols="30" rows="10"></textarea>
          <span class="fontNum"><i>{{params.desc.length}}</i>/300</span>
        </div>
      </div>
      <div class="uploadWrapper" >
        <div class="uploadPicBtn" @click="checkLength">
            <input name="file" @change="uploadPic($event)" ref="inputer" type="file" v-if="objImgs.length<5"/>
          </div>
        <div class="uploadItem" v-for="(childImg,j) in objImgs" :key="j">
          <img :src="imageUrl+childImg" alt="">
          <span class="deletePic" @click="deletePic(j)"></span>
        </div>
      </div>
    </div>
    <div class="wrap">
     <div class="cellLink" v-if="this.params.type==3">
        <div>联系人<input type="text" placeholder="请填写联系人姓名" class="fr" v-model="params.contactName"></div>
    </div>
    <div class="cellLink" v-if="this.params.type==3">
        <div>联系电话 <input type="text" placeholder="请填写联系电话" class="fr" v-model="params.contactNumber"></div>
    </div>
    </div>
    <div class="refundOperBtn" @click="sureRefundOper">提交</div>
  </div>

  <!-- 货物状态 -->
  <mt-popup position="bottom" v-model="statusVisible" @touchmove.prevent>
    <div class="popWrap">
      <div class="title">
        货物状态
        <div class="close" @click="changePopStatus('statusVisible')">×</div>
      </div>
      <ul>
        <li v-for="(item,index) in statusData" :key="index">
          <label for="">
            <div class="top">
              <h3 class="name">{{item.value}}</h3>
              <span class="radioWrap">
                <icon :type="params.goodsType===item.type?'success':'circle'"></icon>
                <input type="radio" :value="item.type" v-model="params.goodsType">
              </span>
            </div>
          </label>
        </li>
      </ul>
      <div class="bottomClose" @click="changePopStatus('statusVisible')">
        提交
      </div>
    </div>
  </mt-popup>
  <!-- 退款原因 -->
  <mt-popup position="bottom" v-model="reasonVisible" @touchmove.prevent>
    <div class="popWrap">
      <div class="title">
        退款原因
        <div class="close" @click="changePopStatus('reasonVisible')">×</div>
      </div>
      <ul>
        <li v-for="(item,index) in reasonData" :key="index">
          <label for="">
            <div class="top">
              <h3 class="name">{{item}}</h3>
              <span class="radioWrap">
                <icon :type="params.reason===item?'success':'circle'"></icon>
                <input type="radio" :value="item" v-model="params.reason">
              </span>
            </div>
          </label>
        </li>
      </ul>
      <div class="bottomClose" @click="changePopStatus('reasonVisible')">
        提交
      </div>
    </div>
  </mt-popup>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import GoodsItem from './components/GoodsItem'
import {
  Icon
} from 'vux'
import {
  applyAfterSales
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  Popup,
  Toast
} from 'mint-ui'
import {
  config
} from 'util/config' // 图片路径
import {
  storage
} from 'util/storage'
import {
  aftersale,
  accessToken
} from 'util/const'
import axios from 'axios'
export default {
  name: 'ApplyAfterSales',
  data () {
    return {
      title: '',
      goodsData: null, // 页面渲染数据
      statusVisible: false, // 货物状态弹窗状态
      reasonVisible: false, // 退款原因弹窗状态
      subDisabled: false,
      addDisabled: false,
      orderStatus: '',
      reasonData: ['多拍/错拍/不想要', '协商一致退款', '未按照指定时间发货', '其他'], // 退款原因
      statusData: [{
        type: 1,
        value: '已收到货'
      },
      {
        type: 2,
        value: '未收到货'
      }
      ],
      params: {
        orderItemId: '',
        type: '',
        goodsType: '',
        num: 1,
        reason: '',
        desc: '',
        pic: '',
        contactNumber: '',
        contactName: ''
      },
      imageUrl: config.imageUrl,
      objImgs: []
    }
  },
  components: {
    CommonNavHeader,
    GoodsItem,
    Icon,
    'mt-popup': Popup
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'ApplyAfterSales') {
        this.applyRefundRender()
      }
    }
  },
  methods: {
    // 页面初始化渲染
    applyRefundRender () {
      this.params.type = this.$route.params.type
      this.params.orderItemId = this.$route.params.orderItemId
      this.goodsData = storage.getLocalStorage(aftersale)
      this.params.num = this.goodsData.num
      this.orderStatus = this.$route.params.orderStatus
      if (this.params.type == 1) { // 仅退款
        if (this.orderStatus == 2) {
          this.reasonData = ['错拍/多拍/不想要', '协商一致退款', '未按照指定时间发货', '其他'] // 待发货
        } else if (this.orderStatus == 3) {
          this.reasonData = ['不喜欢/不想要', '空包裹', '未按约定时间发货', '快递物流无跟踪记录', '货物破损已拒收'] // 已发货-未收到货（包含未签收）
        } else {
          this.reasonData = ['退运费', '实物与商品描述不符', '质量问题', '少件/漏发', '包装/商品破损/污渍', '未按约定时间发货'] // 已发货-已收到货
        }
      } else if (this.params.type == 2) { // 退货退款
        this.reasonData = ['个人原因', '实物与商品描述不符', '质量问题', '少件/漏发', '包装/商品破损/污渍', '未按约定时间发货', '假冒品牌', '发票问题', '发错货']
      } else { // 维修
        this.reasonData = ['商品故障', '保质期外问题', '其他']
      }
      console.log(this.goodsData)

      if (this.params.type == '1') {
        this.title = '申请退款'
      } else if (this.params.type == '2') {
        this.title = '申请退款'
      } else {
        this.title = '申请维修'
      }
    },
    addCount () {
      this.params.num++
      this.changeStyle()
    },

    subCount () {
      this.params.num--
      this.changeStyle()
    },
    changeStyle () {
      if (this.params.num > this.goodsData.num) {
        this.addDisabled = true
        Toast({
          message: '数量超出购买数量',
          position: 'center',
          duration: 1000
        })
        this.params.num = this.goodsData.num
      } else {
        if (this.params.num < 2) {
          this.subDisabled = true
          this.params.num = 1
          Toast({
            message: '不能再少了',
            position: 'center',
            duration: 2000
          })
        } else {
          this.subDisabled = false
        }
      }
    },
    // 检查已上传图片
    checkLength () {
      if (this.objImgs.length > 4) {
        Toast({
          message: '最多上传五张图片',
          position: 'center',
          duration: 2000
        })
      }
    },
    uploadPic (e) {
      let ss = e.target.files
      let formData = new FormData()
      formData.append('file', ss[0])
      let cf = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': storage.getLocalStorage(accessToken)
        }
      }
      axios.post(config.baseUrl + 'file/upload', formData, cf).then((response) => {
        if (response.data.code === 0) {
          this.objImgs.push(response.data.body.key)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 图片删除
    deletePic (index) {
      this.objImgs.splice(index, 1)
    },
    // 退款数据提交
    sureRefundOper () {
      this.params.pic = this.objImgs.join(',')
      //  orderItemId: '',
      // type: '',
      // goodsType: '',
      // num: 1,
      // reason: '',
      // desc: '',
      // pic: '',
      // contactNumber: '',
      // contactName: ''

      // 未发货仅退款
      if (this.orderStatus == 2 && this.params.type == 1) {
        if (this.params.reason == '') {
          Toast({
            message: '请选择退款原因',
            position: 'center',
            duration: 2000
          })
          return
        }
        // 退货退款
      } else if (this.orderStatus != 2 && this.params.type != 3) {
        if (this.params.goodsType == '') {
          Toast({
            message: '请选择货物状态',
            position: 'center',
            duration: 2000
          })
          return
        }
        if (this.params.reason == '') {
          Toast({
            message: '请选择退款原因',
            position: 'center',
            duration: 2000
          })
          return
        }
        // 维修
      } else {
        if (this.params.reason == '') {
          Toast({
            message: '请选择维修原因',
            position: 'center',
            duration: 2000
          })
          return
        }
        if (this.params.contactName == '') {
          Toast({
            message: '请填写联系人姓名',
            position: 'center',
            duration: 2000
          })
          return
        }
        if (this.params.contactNumber == '') {
          Toast({
            message: '请填写联系电话',
            position: 'center',
            duration: 2000
          })
          return
        }
        const isPhone = (value) => /^1\d{10}$/gi.test(value)
        if (this.params.contactNumber !== '' && !isPhone(this.params.contactNumber)) {
          Toast({
            message: '请填写一个正确的手机号码',
            position: 'center',
            duration: 2000
          })
          return
        }
      }

      http(applyAfterSales, this.params).then((response) => {
        if (response.data.code === 0) {
          Toast({
            message: '提交成功',
            position: 'center',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push(`/personCenter`)
          }, 1000)
        }
      })
    },
    // 弹窗显示与隐藏
    changePopStatus (v) {
      this[v] = !this[v]
    },
    // 退货理由选择
    reasonChoice (index) {
      this.reason = this.popData[index]
      this.popupVisible = false
    }
  },
  mounted () {
    this.applyRefundRender()
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
.wrapper
  min-height 100%
.refundCon
  width 100%
  background-color #f5f5f5
  padding 148px 50px 0
  min-height 100vh
.uploadWrapper
    width 100%
    height 230px
    padding 50px 50px
    .uploadPicBtn
      float left
      width 130px
      height 130px
      background url(/static/images/upLoadPic.png) no-repeat center center/70%
      input[type="file"]
        display block
        width 130px
        height 130px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      position relative
      height 190px
      img
        float left
        width 130px
        height 130px
        margin-right 24px
      img:nth-of-type
        margin-right 0px
    .deletePic
      display block
      width 40px
      height 40px
      position absolute
      right 5px
      top -20px
      bgImage('/static/icons/deletePic')
 .wrap
    background-color #fff
    border-radius 20px
    margin-top 30px
.cellLink
  line-height 148px
  padding 0 50px
  display inline-block
  width 100%
  div
    line-height 148px
    position relative
    width 100%
    font-size 40px
    color #262626
    font-weight 600
    input
      width 80%
      height 1.315556rem
      line-height 1.315556rem
    .placeholder
      position absolute
      right 0px
      color #ccc
      font-weight normal
    em
      position absolute
      right 40px
      color #333
      font-weight normal
    .tip
      position absolute
      left 0
      font-size 32px
      color #999
      line-height 42px
      font-weight normal
      top 110px
  .text
    span
      position absolute
      right 40px
  .text::after
    content ''
    position absolute
    right 10px
    top 50%
    margin-top -12px
    width 24px
    height 24px
    border-right 2px solid #B3B3B3
    border-top 2px solid #B3B3B3
    transform rotate(45deg)
.popWrap
  .bottomClose
    height 250px
    line-height 250px
    background-color #F0F0F0
    font-size 50px
    color #BA825A
    text-align center
  .title
    height 190px
    line-height 190px
    color #333333
    font-size 50px
    font-weight 600
    text-align center
    position relative
    .close
      position absolute
      right 0
      top 0
      color #999999
      font-weight normal
      width 100px
      height 190px
  ul
    padding 0 50px
    li
      line-height 148px
      .top
        display flex
        justify-content space-between
        align-items center
      label
        display inline-block
        width 100%
        height 100%
      .name
        font-size 46px
        color #333333
        line-height 148px
        display inline-block
        opacity 1
  .radioWrap
    position relative
    width 80px
    height 80px
    overflow hidden
    display inline-block
    input
      position absolute
      top 0
      left 0
      z-index 999999
      opacity 0
      width 60px
      height 60px
.padding50
  padding 50px 50px 0
.moneyWrap
  font-size 46px
  color #262626
  font-weight 600
  padding 50px 50px 0
  line-height 66px
.wrap
  .info
    font-size 36px
    color #999999
    line-height 78px
    padding 0 50px 40px
.cellLink
  .num
    height 60px
    line-height 60px
    color #262626
    font-size 40px
    width 260px
    span
      display inline-block
      width 60px
      height 60px
      line-height 60px
      font-size 36px
      text-align center
      color #262626
      background-color #F5F5F5
      border-radius 50%
      vertical-align middle
    .sub
      line-height 34px
    span.disable
      color #ccc
    input
      width 134px
      height 60px
      line-height 60px
      margin-top 2px
      outline none
      text-align center
.evaluateText
    display block
    width 100%
    height 320px
    background #F5F5F5
    position relative
    padding 50px 30px
    .evaluateArea
      width 100%
      height 100%
      box-sizing border-box
      font-size 36px
      background #F5F5F5
      color #262626
      resize none
    .fontNum
      position absolute
      margin-right 40px
      font-size 40px
      color #999
      bottom 10px
      right 0
      i
        color #333333
.refundOperBtn
  width 100%
  margin-top 100px
  background-color #fff
  font-size 46px
  color #333
  text-align center
  line-height 148px
  height 148px
  font-weight 600
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-size 36px
  color #CCCCCC
}
::-moz-placeholder { /* Firefox 19+ */
  font-size 36px
  color #CCCCCC
}
:-ms-input-placeholder { /* IE 10+ */
  font-size 36px
  color #CCCCCC
}
:-moz-placeholder { /* Firefox 18- */
  font-size 36px
  color #CCCCCC
}
.titleWrap
  color #262626
  font-size 46px
  font-weight 600
  margin-bottom 50px
</style>

<style lang="stylus">
.wrapper
  .mint-popup
    width 100%
    z-index 999999 !important
  .v-modal
    z-index 9999 !important
  .radioWrap
    .weui-icon
      width 60px
      height 60px
      font-size 50px
      line-height 70px
      position absolute
      top 0
      left 0
    .weui-icon-success
      color #BA825A
</style>
