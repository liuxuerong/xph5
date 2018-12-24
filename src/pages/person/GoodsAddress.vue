<template>
  <div class="wrapper goodsAddressWrapper">
    <userinfo-header :title="title" :oper="oper" @operComplete="sureDel"></userinfo-header>
    <div class="addressConter">
      <div class="addressItem">
        <span>联系人</span>
        <x-input placeholder="联系人姓名" v-model.trim="receiverName"></x-input>
        <!-- <input type="text" v-model="receiverName" placeholder="联系人姓名"> -->
      </div>
      <div class="addressItem">
        <span>电话</span>
        <x-input placeholder="手机号码" v-model.trim="phone"></x-input>
      </div>
      <div class="addressItem">
        <span>地址</span>
        <group class="changeAddress" v-if="type=='1'">
          <x-address title="" @on-show="logShow" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="地址" :show.sync="showAddress"></x-address>
        </group>
        <group class="changeAddress" v-else>
          <x-address title="" @on-show="logShow" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" :inline-desc="placeholder" :show.sync="showAddress"></x-address>
        </group>
      </div>

      <div class="addressItem details clearfix">
        <span>详细地址</span>
        <x-input placeholder="填写详细地址" v-model.trim="detailedAddr"></x-input>
      </div>
      <div class="cutOffLine30"></div>
      <div class="addressItem">
        <span class="bold">设为默认</span>
        <em class="checkboxInput" :class="{active:idDefault}"><input type="checkbox" v-model="idDefault"></em>
      </div>
      <button class="addressSubmit" @click="addressSubmit">确定</button>
    </div>
  </div>
</template>

<script>
import UserinfoHeader from './components/ComUserSetHeader'
import {
  Toast
} from 'mint-ui'
import {
  addDelivery,
  updateDelivery,
  idDelivery,
  delDelivery
} from 'util/netApi'
import {
  http
} from 'util/request'
import notice from 'util/notice'
import {
  XInput,
  Group,
  XAddress,
  ChinaAddressV4Data,
  XButton,
  Cell,
  Value2nameFilter as value2name
} from 'vux'
export default {
  name: 'GoodsAddress',
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
      addressData: ChinaAddressV4Data,
      showAddress: false,
      oper: ''
    }
  },
  computed: {
    rigthData: function () {
      let phone = /^1\d{10}$/gi.test(this.phone)
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
    Cell,
    XInput
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
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    logShow (str) {
      this.placeholder = ''
    },
    // 页面返回提示
    addressSubmitSure () {

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
            let _this = this
            if (response.data.code === 0) {
              notice.toast('添加地址成功', '1000', 'success', function () {
                setTimeout(() => {
                  _this.$router.push('/addressAdmin')
                }, 1000)
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Toast({
            message: '请确认填写信息是否正确',
            position: 'bottom',
            duration: 2000
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
            let _this = this
            if (response.data.code === 0) {
              notice.toast('修改地址成功', '1000', 'success', function () {
                setTimeout(() => {
                  _this.$router.push('/addressAdmin')
                }, 1000)
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Toast({
            message: '请确认填写信息是否正确',
            position: 'bottom',
            duration: 2000
          })
        }
      }
    },
    // 添加地址
    addAddress () {
      this.popupVisible = true
    },
    sureDel () {
      notice.confirm('确定删除该地址？', '地址删除后，将无法恢复', this.del)
    },
    // 删除地址
    del () {
      let id = this.$route.params.id
      http(delDelivery, [id]).then(res => {
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
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
      // if (to.name === 'goodsAddress') {
      //   console.log(1111)
      //   this.addressRender()
      // }
    }
  },
  mounted () {
    let type = this.$route.params.type
    if (type === '1') {
      this.type = 1
      this.title = '新增地址'
      this.oper = ''
    } else if (type === '2') {
      this.title = '编辑收货地址'
      this.type = 2
      this.addressRender()
      this.oper = '删除'
    }
  }
}
</script>

<style lang="stylus">
.vux-popup-picker-container
  .vux-no-group-title
    margin-top 0
  .vux-popup-header
    height 130px
    line-height 130px
    font-size 40px
  .vux-popup-header-right
    color #ba825a
  .vux-popup-picker-value
    float left
    color #808080
    font-size 40px
.goodsAddressWrapper
  .vux-label-desc
    font-size 46px
    color #333333
    font-weight 600
  .weui-cell_access
    height 134px
    padding 0
  .weui-cells
    margin-top 0
  .weui-input
    height auto
  .weui-cells:after,.weui-cell_access .weui-cell__ft:after,.weui-cells:before,.weui-cell:after,.weui-cell:before
    display none
  .vux-popup-picker-placeholder
    float left
    color #cccccc
    font-size 46px
  .vux-popup-picker-value
    font-size 46px
    font-weight 600
    color #333333
    text-align left
    display inline-block
    width 100%
  .weui-cell
    padding 0
    font-size 46px
    font-weight 600
    color #333333
    input
      font-weight 600
</style>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    background #F5F5F5
    box-sizing border-box
    padding-top 130px
    min-height 100vh
    position relative
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
    padding 0 50px 0 52px
    margin-top 1px
    .bold
      color #333333
      font-weight 600
    span
      float left
      width 200px
      font-size 46px
      color #666666
      margin-right 40px
    input[type="text"]
      float left
      width 75%
      font-size 46px
      font-weight 600
      color #333333
      height 134px
      line-height 134px
      border none
  .addressItem.details
    min-height 138px
    height auto
    line-height 70px
  .addressSubmit
    position absolute
    display block
    width 86%
    height 148px
    line-height 148px
    font-size 46px
    text-align center
    color #BA825A
    font-weight bold
    background #fff
    bottom 110px
    left 7%
  .addressBox
    width 100%
  .checkboxInput
    float right
    width 60px
    height 60px
    line-height 60px
    margin-top 37px
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
    font-size 46px
    font-weight normal
  }
  ::-moz-placeholder {
    color: #ccc;
    font-size 46px
    font-weight normal
  }
  :-ms-input-placeholder {
    color: #ccc;
    font-size 46px
    font-weight normal
  }
  :-moz-placeholder {
    color: #ccc;
    font-size 46px
    font-weight normal
  }
  .changeAddress
    float left
    width 75%
    font-size 40px
    color #808080
    height 134px
    line-height 134px
    border none
    position relative
  .changeAddress:before
    border: solid 0.017778rem #b3b3b3;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    z-index:2
    right: 0;
    position: absolute;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    width: 0.22444rem;
    height: 0.22444rem;
</style>
