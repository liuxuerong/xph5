<template>
  <div class="wrapper">
    <userinfo-header :title="title" oper=""></userinfo-header>
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
        <em class="checkboxInput" :class="{active:idDefault}"><input type="checkbox" v-model="idDefault"></em>
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
import { addDelivery, updateDelivery, idDelivery } from 'util/netApi'
import { http } from 'util/request'
import router from '@/router/index.js'
import notice from 'util/notice.js'
const cityJson = require('./address.json')
export default {
  data () {
    return {
      title: '',
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
      type: Number,
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
    // 修改地址渲染
    addressRender () {
      let id = this.$route.params.id
      http(idDelivery, [id]).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          let data = response.data.body
          this.receiverName = data.receiverName
          this.phone = data.phone
          this.addressName = data.province + ' / ' + data.city + ' / ' + data.area
          this.detailedAddr = data.detailedAddr
          if (data.idDefault === 1) {
            this.idDefault = true
          } else {
            this.idDefault = false
          }
        }
      })
    },
    // 地址提交
    addressSubmit () {
      let type = this.$route.params.type
      // 1  新增加地址
      // 2  修改地址
      if (type === 1) {
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
            if (response.data.code === 0) {
              notice.toast('添加地址成功', '2000', 'success', function () {
                router.pash('./personCenter')
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Toast({
            message: '请确认填写信息是否正确',
            position: 'bottom',
            duration: 5000
          })
        }
      } else {
        let id = this.$route.params.id
        let params = {
          receiverName: this.receiverName,
          province: this.province,
          city: this.city,
          area: this.area,
          detailedAddr: this.detailedAddr,
          addressName: this.addressName,
          phone: this.phone,
          idDefault: this.idDefault ? 1 : 0,
          id: id,
          postalCode: this.postalCode

        }
        if (this.rigthData && this.rigthNull) {
          http(updateDelivery, params).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              notice.toast('修改地址成功', '2000', 'success', function () {
                router.pash('./personCenter')
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Toast({
            message: '请确认填写信息是否正确',
            position: 'bottom',
            duration: 5000
          })
        }
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
    },
    // 监测路由发生变化  则刷新页面
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  mounted () {
    console.log(9999)
    let type = this.$route.params.type
    if (type === '1') {
      this.title = '新增地址'
    } else if (type === '2') {
      this.title = '修改地址'
      this.type = 2
      this.addressRender()
    }
    // this.$nextTick(() => {
    //   setTimeout(() => { // 这个是一个初始化默认值的一个技巧
    //     this.addressSlots[0].defaultIndex = 0
    //   }, 100)
    // })
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    background #F5F5F5
    box-sizing border-box
    padding-top 100px
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
  .checkboxInput
    float right
    width 50px
    height 50px
    line-height 50px
    margin-top 42px
    bgImage('/static/icons/payUnchecked')
    input
      display block
      width 100%
      height 100%
      opacity 0
  .checkboxInput.active
    bgImage('/static/icons/paySelect')

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
