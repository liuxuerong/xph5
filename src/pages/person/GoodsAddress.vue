<template>
  <div class="wrapper goodsAddressWrapper">
    <userinfo-header :title="title" :oper="oper" @operComplete="sureDel"></userinfo-header>
    <div class="addressConter">
      <div class="addressItem">
        <span>联系人</span>
        <x-input placeholder="联系人姓名" v-model.trim="user.receiverName"
        ></x-input>
      </div>
      <div class="addressItem">
        <span>电话</span>
        <x-input placeholder="手机号码" v-model.trim="user.phone" ></x-input>
      </div>
      <div class="addressItem">
        <span>地址</span>
        <group class="changeAddress" v-if="type=='1'">
          <x-address title="" @on-show="logShow" v-model="user.value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="地址" :show.sync="showAddress"></x-address>
        </group>
        <group class="changeAddress" v-else>
          <x-address title="" @on-show="logShow" v-model="user.value" :list="addressData" @on-shadow-change="onShadowChange" :inline-desc="placeholder" :show.sync="showAddress"></x-address>
        </group>
      </div>

      <div class="addressItem details clearfix">
        <span>详细地址</span>
         <CommonTextarea placeholder="填写详细地址" v-model="user.detailedAddr" @input="changeDesc" :max="100"></CommonTextarea>
        <!-- <x-input placeholder="填写详细地址" v-model.trim="user.detailedAddr"></x-input> -->
      </div>
      <div class="cutOffLine30"></div>
      <div class="addressItem">
        <span class="bold">设为默认</span>
        <em class="checkboxInput" :class="{active:idDefault}"><input type="checkbox" v-model="idDefault"></em>
      </div>
      <button class="addressSubmit" @click="addressSubmit">保存</button>
    </div>
  </div>
</template>

<script>
import UserinfoHeader from './components/ComUserSetHeader'
import CommonTextarea from 'common/commonTextarea/CommonTextarea'
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
import { required, maxLength } from 'vuelidate/lib/validators'
import {fromRoute} from 'util/const.js'
import {
  storage
} from 'util/storage'
const isPhone = (value) => /^1\d{10}$/gi.test(value)
export default {
  name: 'GoodsAddress',
  data () {
    return {
      title: '',
      user: {
        phone: '',
        receiverName: '',
        value: [],
        names: [],
        detailedAddr: ''
      },
      idDefault: '',
      placeholder: '',
      popupVisible: false,
      type: '',

      addressData: ChinaAddressV4Data,
      showAddress: false,
      oper: '',
      fromRoute: null
    }
  },
  components: {
    UserinfoHeader,
    Group,
    XAddress,
    XButton,
    Cell,
    XInput,
    CommonTextarea
  },
  validations: {
    user: {
      phone: {
        required,
        isPhone
      },
      receiverName: {
        required,
        maxLength: maxLength(25)
      },
      detailedAddr: {
        required
      }

    }
  },
  beforeRouteEnter (to, from, next) {
    // 如果是从创建订单页面进入的话，新增地址保存之后跳转至创建订单页面
    if (from.path.indexOf('/createOrder') !== -1) {
      console.log(this)
      storage.setLocalStorage(fromRoute, from.path)
    }
    next()
  },

  methods: {
    changeDesc (v) {
      this.user.detailedAddr = v
    },
    // 修改地址渲染
    addressRender () {
      let id = this.$route.params.id
      http(idDelivery, [id]).then((response) => {
        if (response.data.code === 0) {
          let data = response.data.body
          this.user.receiverName = data.receiverName
          this.user.phone = data.phone
          this.placeholder = data.province + '  ' + data.city + '  ' + data.area
          this.user.names[0] = data.province
          this.user.names[1] = data.city
          this.user.names[2] = data.area
          this.user.detailedAddr = data.detailedAddr
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
      this.user.names = names
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
    toastFn (message) {
      Toast({
        message,
        position: 'bottom',
        duration: 2000
      })
    },
    // 地址提交
    addressSubmit () {
      this.$v.$touch()
      let type = this.$route.params.type
      let id = this.$route.params.id
      let params = {
        receiverName: this.user.receiverName,
        province: this.user.names[0],
        city: this.user.names[1],
        area: this.user.names[2],
        detailedAddr: this.user.detailedAddr,
        addressName: '',
        phone: this.user.phone,
        idDefault: this.idDefault ? 1 : 0,
        id: id
      }
      if (!this.$v.$invalid) {
        // 1  新增加地址
        // 2  修改地址
        if (type === '1') {
          console.log(this.user.value)
          if (!this.user.value.length) {
            return this.toastFn('请选择地址')
          }
          http(addDelivery, params).then((response) => {
            let _this = this
            if (response.data.code === 0) {
              notice.toast('添加地址成功', '1000', 'success', function () {
                setTimeout(() => {
                  _this.fromRoute = storage.getLocalStorage(fromRoute) || '/addressAdmin'
                  _this.$router.push(_this.fromRoute)
                }, 1000)
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
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
        }
      } else {
        if (!this.$v.user.receiverName.required) {
          return this.toastFn('请填写联系人')
        }
        if (!this.$v.user.receiverName.maxLength) {
          return this.toastFn('联系不要超过25个字')
        }
        if (!this.$v.user.phone.required) {
          return this.toastFn('请填写电话号码')
        }
        if (!this.$v.user.phone.isPhone) {
          return this.toastFn('请填写一个正确的手机号码')
        }

        // if (!this.$v.user.names.required) {
        //   return this.toastFn('请选择地址')
        // }
        if (!this.$v.user.detailedAddr.required) {
          return this.toastFn('请填写详细地址')
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
.addressConter
  .addressItem
    textarea
      font-weight 600 !important
      padding 36px 0 0 0  !important
      font-size 46px !important
      color #333333 !important
    textarea::-webkit-input-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    textarea::-moz-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    textarea:-ms-input-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    textarea:-moz-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
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
    font-weight normal
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
    input::-webkit-input-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    input::-moz-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    input:-ms-input-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
    input:-moz-placeholder {
        color: #ccc;
        font-size 46px
        font-weight normal
      }
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
      vertical-align middle
      display inline-block
      min-height 134px
      line-height 134px
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
