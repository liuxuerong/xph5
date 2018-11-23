<template>
  <div class="wrapper">
    <search-title :title="title" :oper="false"></search-title>
    <div class="refundCon">
      <!-- 未发货退款 -->
      <div class="orderGoodsInfo" v-if="type=='1'">
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index" @click="goodsDetails(item.goodsId)">
          <img v-if="item.pic != ''" :src="imageUrl+item.pic" alt="">
          <img v-else src="/static/images/personalHeader.png">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(item.spec)" :key="n">{{spec.value}}</span>
            </div>
            <span class="goodsPrice">￥ {{item.price}}</span>
            <span class="goodsNum">×{{item.num}}</span>
          </div>
        </div>
      </div>
      <!-- 退货退款 -->
      <div v-if="type=='2'">
        <goods-item :goodsData="list"></goods-item>
      </div>
      <div class="refundTitle">详细信息</div>
      <div class="refundOper border-bottom" @click="refundReason">
        <span>退款原因</span>
        <input type="text" v-model="reason" placeholder="请选择" readonly>
      </div>
      <div class="refundOper border-bottom">
        <span>退款金额</span><span v-if="type=='1'">￥{{list.actualPrice}}</span><span v-else>￥{{list.needPayAmount}}</span>
        <span>退款金额</span><span v-if="type=='2'">￥{{list.actualPrice}}</span><span v-else>￥{{list.totalAmount}}</span>
      </div>
      <div class="refundOper border-bottom">
        <span>退款说明</span>
        <input type="text" placeholder="选填" v-model="desc">
      </div>
      <div class="refundTitle" v-if="type=='2'">上传凭证</div>
      <div class="uploadWrapper" v-if="type=='2'">
        <div class="uploadItem" v-for="(childImg,j) in objImgs" :key="j">
          <img :src="imageUrl+childImg" alt="">
          <span class="deletePic" @click="deletePic(j)"></span>
        </div>
        <div class="uploadPicBtn" v-if="(!objImgs) || ( objImgs.length < 3)">
          <input name="file" @change="uploadPic($event)" ref="inputer"  type="file"/>
        </div>
        <span class="uploadPicTips">最多3张</span>
      </div>
    </div>
    <div class="refundOperBtn" @click="sureRefundOper">提交</div>
    <mt-popup
       class="reasonPopWrapper"
        v-model="popupVisible"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <!-- <change-item v-for="(item , index) of popData" :key="index" :content="item" :index="index" @sendValueToParent = "getValueFromChild"></change-item> -->
        <span class="reasonItem border-bottom" v-for="(item , index) of popData" :key="index" @click="reasonChoice(index)">{{item}}</span>
      </mt-popup>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import goodsItem from './components/goodsItem'
import { deliverAfterSales, subOrderDetail } from 'util/netApi'
import { http } from 'util/request'
import { Popup, Toast } from 'mint-ui'
import { config } from 'util/config' // 图片路径
import {storage} from 'util/storage'
import { aftersale, accessToken } from 'util/const'
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      list: [], // 页面渲染数据
      orderId: '', // 订单id
      reason: '', // 退款理由
      desc: '', // 退款描述
      popData: ['7天无理由退换货', '颜色/尺寸/参数不符', '商品瑕疵', '质量问题', '少件/漏发', '发票问题 '],
      popupVisible: false, // 退款理由显示问题
      imageUrl: config.imageUrl,
      type: '',
      objImgs: [],
      pic: ''
    }
  },
  components: {
    SearchTitle,
    goodsItem,
    'mt-popup': Popup
  },
  computed: {
    // 非空判断方法
  },
  methods: {
    // 页面初始化渲染
    applyRefundRender () {
      let type = this.$route.params.type
      this.type = type
      console.log(type)
      let orderData = this.$route.params.orderId
      if (type === '1') {
        this.title = '仅退款'
        // let orderCode = this.$route.params.orderId
        http(subOrderDetail, [orderData]).then((response) => {
          let data = response.data.body
          console.log(data)
          this.list = data
          this.orderId = data.orderId
        })
      } else if (type === '2') {
        this.title = '退货退款'
        let data = storage.getLocalStorage(aftersale)
        this.list = data
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
      console.log(index)
      this.objImgs.splice(index, 1)
      console.log(this.objImgs)
    },
    // 退款数据提交
    sureRefundOper () {
      let _this = this
      let type = this.$route.params.type
      if (type === '1') {
        let params = {
          orderId: this.orderId,
          reason: this.reason,
          desc: this.desc
        }
        if (this.reason !== '') {
          http(deliverAfterSales, params).then((response) => {
            if (response.data.code === 0) {
              Toast({
                message: '提交成功',
                position: 'bottom',
                duration: 2000
              })
              _this.$router.back(-1)
            }
          })
        } else {
          Toast({
            message: '请选择退款原因',
            position: 'bottom',
            duration: 2000
          })
        }
      } else {
        console.log(this.objImgs)
        let orderId = this.$route.params.orderId
        let params = {
          orderItemId: orderId,
          shouldRefund: this.list.actualPrice,
          num: this.list.num,
          reason: this.reason,
          desc: this.desc,
          pic: this.objImgs.join(',')
        }
        console.log(params)
        if (this.reason !== '') {
          http(deliverAfterSales, params).then((response) => {
            console.log(response)
            if (response.data.body === true) {
              Toast({
                message: '申请售后成功',
                position: 'bottom',
                duration: 5000
              })
              this.$router.push('/orderList/5')
            }
          })
        } else {
          Toast({
            message: '请选择退款原因',
            position: 'bottom',
            duration: 5000
          })
        }
      }
    },
    refundReason () {
      this.popupVisible = true
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
    width 100%
    box-sizing border-box
    padding-top 132px
    background #fff
  .refundCon
    width 100%
    box-sizing border-box
    padding-bottom 200px
  .refundTitle
    width 100%
    height 174px
    line-height 174px
    box-sizing border-box
    padding 0 50px
    font-size 46px
    color #262626
    font-weight bold
    background #F5F5F5
  .refundOper
    width 100%
    height 200px
    line-height 200px
    box-sizing border-box
    padding 0 50px
    font-size 40px
    color #262626
    span:first-child
      margin-right 60px
      font-size 40px
      color #262626
    input[type="text"]
      height 190px
      box-sizing border-box
      border none
      outline none
      text-align right
      position absolute
      right 50px
      bottom 5px
  .refundOperBtn
    width calc(100% - 100px)
    height 148px
    line-height 148px
    font-size 46px
    color #BA825A
    background #F0F0F0
    text-align center
    position fixed
    left 0
    right 0
    margin auto
    bottom 40px
  .reasonPopWrapper
    display block
    width 100%
  .reasonItem
    display block
    width 100%
    height 148px
    line-height 148px
    text-align center
    font-size 40px
    color #262626
  .orderGoodsInfo
    width 100%
    height auto
    margin-bottom 30px
    background #fff
    .orderGoods
      width 100%
      box-sizing border-box
      padding 50px
      img
        float left
        width 286px
        height 286px
        margin-right 50px
      .orderText
        float left
        width calc(100% - 336px)
        height 286px
        box-sizing border-box
        padding-top 50px
        position relative
        .goodsName
          width 100%
          line-height 40px
          font-size 40px
          color #262626
          margin-bottom 30px
          font-weight blod
        .goodsPrice
          display block
          width 100%
          font-size 40px
          color #000000
          position absolute
          bottom 20px
          left 0
        .goodsNum
          width auto
          font-size 36px
          color #262626
          position absolute
          top 50px
          right 10px
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ccc;
    font-size:40px;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #ccc;
    font-size:40px;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #ccc;
    font-size:40px;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #ccc;
    font-size:40px;
  }
  .uploadWrapper
    width 100%
    box-sizing border-box
    padding 50px
    height 290px
    position relative
    .uploadPicTips
      position absolute
      left 50px
      bottom -18px
      font-size 30px
      color #808080
    .uploadPicBtn
      float left
      width 185px
      height 185px
      bgImage('/static/images/upLoadPic')
      input[type="file"]
        display block
        width 185px
        height 185px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      position relative
      height 190px
      img
        float left
        width 180px
        height 180px
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
</style>
