<template>
  <div class="wrapper">
    <search-title :title="title" :oper="false"></search-title>
    <div class="refundCon">
      <div class="refundGoodsItem"></div>
      <div class="refundTitle">详细信息</div>
      <div class="refundOper border-bottom" @click="refundReason">
        <span>退款原因</span>
        <input type="text" v-model="reason" placeholder="请选择" readonly>
      </div>
      <div class="refundOper border-bottom">
        <span>退款金额</span>
      </div>
      <div class="refundOper border-bottom">
        <span>退款说明</span>
        <input type="text" placeholder="选填" v-model="desc">
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
import { deliverAfterSales } from 'util/netApi'
import { http } from 'util/request'
import { Popup, Toast } from 'mint-ui'
export default {
  data () {
    return {
      title: '',
      reason: '', // 退款理由
      desc: '', // 退款描述
      popData: ['7天无理由退换货', '颜色/尺寸/参数不符', '商品瑕疵', '质量问题', '少件/漏发', '发票问题 '],
      popupVisible: false // 退款理由显示问题
    }
  },
  components: {
    SearchTitle,
    'mt-popup': Popup
  },
  computed: {
    // 非空判断方法
  },
  methods: {
    // 页面初始化渲染
    applyRefundRender () {
      let type = this.$route.params.type
      if (type === '1') {
        this.title = '仅退款'
      }
    },
    sureRefundOper () {
      let orderId = this.$route.params.orderId
      let params = {
        orderId: orderId,
        reason: this.reason,
        desc: this.desc
      }
      if (this.reason !== '') {
        http(deliverAfterSales, params).then((response) => {
          console.log()
        })
      } else {
        Toast({
          message: '请选择退款原因',
          position: 'bottom',
          duration: 5000
        })
      }
    },
    refundReason () {
      this.popupVisible = true
    },
    // 退货理由选择
    reasonChoice (index) {
      console.log(index)
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
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #fff
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
    margin 46% auto 0
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
</style>
