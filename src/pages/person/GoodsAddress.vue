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
        <group class="changeAddress" v-if="type=='1'">
          <x-address @on-hide="logHide" title="" @on-show="logShow" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="地址" :show.sync="showAddress"></x-address>
        </group>
        <group class="changeAddress" v-else>
          <x-address @on-hide="logHide" title="" @on-show="logShow" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" :inline-desc="placeholder" :show.sync="showAddress"></x-address>
        </group>
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
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import { Toast } from 'mint-ui'
import { addDelivery, updateDelivery, idDelivery } from 'util/netApi'
import { http } from 'util/request'
import router from '@/router/index.js'
import notice from 'util/notice.js'
import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'
export default {
  data () {
    return {
      title: '',
      receiverName: '',
      detailedAddr: '',
      phone: '',
      idDefault: '',
      postalCode: '',
      placeholder: '',
      popupVisible: false,
      type: '',
      value_0_1: [],
      names: [],
      value: [],
      title2: '',
      value2: ['天津市', '市辖区', '和平区'],
      value3: ['广东省', '中山市', '--'],
      addressData: ChinaAddressV4Data,
      value4: [],
      value5: ['广东省', '深圳市', '南山区'],
      showAddress: false
    }
  },
  computed: {
    rigthData: function () {
      let phone = /^1\d{10}$/gi.test(this.phone)
      // let addressName = !/[@#$%^&*]+/gi.test(this.province)
      let receiverName = !/[@#$%^&*]+/gi.test(this.receiverName)
      let detailedAddr = !/[@#$%^&*]+/gi.test(this.detailedAddr)
      return phone && receiverName && detailedAddr
    },
    rigthNull: function () {
      return this.phone !== '' && this.province !== '' && this.receiverName !== '' && this.detailedAddr !== ''
    }
  },
  components: {
    UserinfoHeader,
    Group,
    XAddress,
    XButton,
    Cell
  },
  methods: {
    // 修改地址渲染
    addressRender () {
      let id = this.$route.params.id
      http(idDelivery, [id]).then((response) => {
        if (response.data.code === 0) {
          let data = response.data.body
          this.receiverName = data.receiverName
          this.phone = data.phone
          this.placeholder = data.province + '  ' + data.city + '  ' + data.area
          this.names[0] = data.province
          this.names[1] = data.city
          this.names[2] = data.area
          this.detailedAddr = data.detailedAddr
          if (data.idDefault === 1) {
            this.idDefault = true
          } else {
            this.idDefault = false
          }
        }
      })
    },
    // 地址选择
    doShowAddress () {
      this.showAddress = true
      setTimeout(() => {
        this.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      this.names = names
    },
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    changeDataByLabels () {
      this.value2 = ['广东省', '广州市', '天河区']
    },
    changeDataByLabels2 () {
      this.value2 = ['广东省', '中山市', '--']
    },
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      this.placeholder = ''
    },
    // 地址提交
    addressSubmit () {
      let type = this.$route.params.type
      // 1  新增加地址
      // 2  修改地址
      if (type === '1') {
        let params = {
          receiverName: this.receiverName,
          province: this.names[0],
          city: this.names[1],
          area: this.names[2],
          detailedAddr: this.detailedAddr,
          addressName: '',
          phone: this.phone,
          idDefault: this.idDefault ? 1 : 0,
          postalCode: this.postalCode
        }
        if (this.rigthData && this.rigthNull) {
          http(addDelivery, params).then((response) => {
            if (response.data.code === 0) {
              notice.toast('添加地址成功', '2000', 'success', function () {
                router.push('../../addressAdmin')
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
          province: this.names[0],
          city: this.names[1],
          area: this.names[2],
          detailedAddr: this.detailedAddr,
          addressName: '',
          phone: this.phone,
          idDefault: this.idDefault ? 1 : 0,
          id: id,
          postalCode: this.postalCode

        }
        if (this.rigthData && this.rigthNull) {
          http(updateDelivery, params).then((response) => {
            if (response.data.code === 0) {
              notice.toast('修改地址成功', '2000', 'success', function () {
                router.push('../../addressAdmin')
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
    let type = this.$route.params.type
    if (type === '1') {
      this.type = 1
      this.title = '新增地址'
    } else if (type === '2') {
      this.title = '修改地址'
      this.type = 2
      this.addressRender()
    }
  }
}
</script>
<style lang="stylus">
  html,body
    background #fff
  .vux-popup-picker-placeholder
    float left!important
    color #ccc!important
    font-size 40px!important
  .weui-cell_access
    height 134px!important
    padding 0!important
  .weui-cells:after,.weui-cell_access .weui-cell__ft:after,.weui-cells:before
    display none!important
  .vux-no-group-title
    margin-top 0!important
  .vux-popup-header
    height 130px!important
    line-height 130px!important
    font-size 40px!important
  .vux-popup-header-right
    color #ba825a!important
  .vux-popup-picker-value
    float left!important
    color #808080!important
    font-size 40px!important
</style>
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
  .changeAddress
    float left
    width 75%
    font-size 40px
    color #808080
    height 134px
    line-height 134px
    border none
    background red
</style>
