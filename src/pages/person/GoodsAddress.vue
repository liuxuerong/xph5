<template>
  <div class="wrapper">
    <userinfo-header title="新增地址" oper=""></userinfo-header>
    <div class="addressConter">
      <div class="addressItem border-bottom">
        <span>联系人</span>
        <input type="text" v-model="receiverName" placeholder="联系人姓名">
      </div>
      <div class="addressItem border-bottom">
        <span>电话</span>
        <input type="text" v-model="phone" placeholder="手机号码">
      </div>
      <div class="addressItem border-bottom">
        <span>地址</span>
        <input type="text" placeholder="选择收货地址" readonly @click="addAddress" v-model="addressName">
      </div>
      <div class="addressItem border-bottom">
        <span>详细地址</span>
        <input type="text" v-model="detailedAddr" placeholder="填写详细地址">
      </div>
      <div class="addressItem border-bottom">
        <span>设为默认</span>
        <input type="checkbox" v-model="idDefault">
      </div>
      <button class="addressSubmit" @click="addressSubmit">确定</button>
      <mt-popup
        v-model="popupVisible"
        class="addressBox"
        position="bottom">
        <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
      </mt-popup>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './ComUserSetHeader'
import { Picker, Popup, Toast } from 'mint-ui'
import { addDelivery } from 'util/netApi'
import { http } from 'util/request'
const cityJson = require('./address.json')
export default {
  data () {
    return {
      receiverName: '',
      province: '',
      city: '',
      area: Object,
      detailedAddr: '',
      addressName: '',
      phone: '',
      idDefault: '',
      postalCode: '',
      popupVisible: false,
      addressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(cityJson),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      streetSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  computed: {
    rigthData: function () {
      let phone = /^1\d{10}$/gi.test(this.phone)
      let addressName = !/[@#$%^&*]+/gi.test(this.province)
      let receiverName = !/[@#$%^&*]+/gi.test(this.receiverName)
      let detailedAddr = !/[@#$%^&*]+/gi.test(this.detailedAddr)
      return phone && addressName && receiverName && detailedAddr
    },
    rigthNull: function () {
      return this.phone !== '' && this.province !== '' && this.receiverName !== '' && this.detailedAddr !== ''
    }
  },
  components: {
    UserinfoHeader,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  methods: {
    addressSubmit () {
      let param = {
        receiverName: this.receiverName,
        province: this.province,
        city: this.city,
        area: this.area,
        detailedAddr: this.detailedAddr,
        addressName: this.addressName,
        phone: this.phone,
        idDefault: this.idDefault ? 1 : 0,
        postalCode: this.postalCode
      }
      if (this.rigthData && this.rigthNull) {
        http(addDelivery, param).then((response) => {
          console.log(response)
        })
      } else {
        Toast({
          message: '请确认填写信息是否正确',
          position: 'bottom',
          duration: 5000
        })
      }
    },
    // 添加地址
    addAddress () {
      this.popupVisible = true
    },
    onAddressChange (picker, values) {
      let shi = Object.keys(cityJson[values[0]])
      let index = shi.indexOf(values[1])
      let xian = cityJson[values[0]][shi[index]]
      this.xianObj = xian
      picker.setSlotValues(1, shi)
      this.province = values[0]
      this.city = values[1]
      this.area = values[2]
      picker.setSlotValues(2, Object.keys(xian))
      this.addressName = this.province + ' / ' + this.city + ' / ' + this.area
    }
  },
  watch: {
    'area': {
      handler (val, oval) {
        let street = this.xianObj[this.area]
        this.streetSlots[0].values = street
      }
    }
  },
  created () {

  },
  mounted () {
    // this.$nextTick(() => {
    //   setTimeout(() => { // 这个是一个初始化默认值的一个技巧
    //     this.addressSlots[0].defaultIndex = 0
    //   }, 100)
    // })
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    background #F5F5F5
  .addressConter
    width 100%
    background #ffffff
    margin-top 30px
    overflow hidden
  .addressItem
    width 100%
    height 138px
    line-height 138px
    box-sizing border-box
    padding 0 100px 0 52px
    margin-top 1px
    span
      float left
      width 200px
      font-size 40px
      font-weight bold
      color #000000
    input[type="text"]
      float left
      width 75%
      font-size 40px
      color #808080
      height 134px
      line-height 134px
      border none
  .addressSubmit
    display block
    width 86%
    height 148px
    line-height 148px
    margin 50px auto 0
    font-size 46px
    text-align center
    color #BA825A
    font-weight bold
    background #F0F0F0
  .addressBox
    width 100%
  ::-webkit-input-placeholder {
    color: #ccc;
    font-size 40px
  }
  ::-moz-placeholder {
    color: #ccc;
    font-size 40px
  }
  :-ms-input-placeholder {
    color: #ccc;
    font-size 40px
  }
  :-moz-placeholder {
    color: #ccc;
    font-size 40px
  }
</style>
