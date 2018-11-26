<template>
  <div class="wrapper userDataSet">
    <!-- 个人资料设置头部 -->
    <userinfo-header title="个人资料" oper="完成" @operComplete="onOperComplete"></userinfo-header>
    <div class="userInfoSetCon">
      <!-- 头像设置 -->
      <div class="headerCon">
        <div class="headerSet border-bottom">
          <span class="setProperty">头像</span>
          <div class="headerImg">
            <img v-if="headImage === ''" src="/static/images/personalHeader.png">
            <img v-else :src="imageUrl+headImage">
            <input type="file" name="" class="headerImgFile" @change="headerUpfile($event)">
          </div>
        </div>
        <userinfo-popset setPro="会员等级" :inputData="memberLevelName+'会员'" @click.native="memberGrade"></userinfo-popset>
        <userinfo-popset setPro="我的收货地址" @click.native="addressAdmin"></userinfo-popset>
      </div>

      <!-- 基础设置 -->
      <userinfo-popset setPro="绑定手机号" :inputData="phone"></userinfo-popset>
      <div class="setItemPop border-bottom">
        <span class="setProperty">昵称</span>
        <input type="text" class="setInfoInput" v-model="name">
      </div>
      <userinfo-popset setPro="性别" :inputData="sex" @click.native="sexChangeShow"></userinfo-popset>
      <!-- <userinfo-popset setPro="出生日期" :inputData="age" @click.native="ageChangeShow"></userinfo-popset> -->
      <group class="setBirthdayPop">
        <datetime
          class="setBirthday"
          title="出生日期"
          :readonly="readonly"
          v-model="age"
          @on-clear="ageChangeShow"
          :min-year='1960'
          @on-change="change"
          @on-show="ageChangeShow"
          @on-confirm="onConfirm"></datetime>
      </group>
      <mt-popup
        class="sexPopWrapper"
        v-model="popupVisible"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <change-item v-for="(item , index) of popData" :key="index" :content="item" :index="index" @sendValueToParent = "getValueFromChild"></change-item>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import UserinfoHeader from './components/ComUserSetHeader'
import UserinfoPopset from './ComSetInfoPop'
import ChangeItem from './ComChangeItem'
import CropperHeader from './ComCropperHeader'
import { Datetime, Group } from 'vux'
import { setMemberData, memberData } from 'util/netApi'
import { http } from 'util/request'
import { Popup, DatetimePicker, Toast } from 'mint-ui'
import notice from 'util/notice.js'
import { config } from 'util/config' // 图片路径
import axios from 'axios'
import {uploadPic} from '@/func/upload'
export default {
  data () {
    return {
      name: '',
      imageUrl: config.imageUrl,
      headImage: '',
      sexIndex: '',
      phone: '',
      sex: '', // 1、男 2、女 3、保密
      age: '',
      popupVisible: false,
      popType: 0,
      popData: [],
      memberLevelName: '',
      readonly: false,
      birthdayStatus: 1
    }
  },
  components: {
    'mt-popup': Popup,
    UserinfoHeader,
    UserinfoPopset,
    'change-item': ChangeItem,
    CropperHeader,
    Datetime,
    Group,
    'mt-datetime-picker': DatetimePicker
  },
  methods: {
    // 获取页面资料信息
    getUserInfo () {
      http(memberData).then((response) => {
        console.log(response)
        let data = response.data.body
        this.memberLevelName = data.memberLevelName
        this.name = data.name
        if (data.headImage !== '' && data.headImage != null) {
          this.headImage = data.headImage
        }
        if (data.phone !== '' && data.phone != null) {
          this.phoneShow = true
          this.phone = data.phone.substring(0, 3) + '****' + data.phone.substring(7, 11)
        }
        if (data.ageGroup !== '' && data.ageGroup != null) {
          this.ageShow = true
          this.age = data.ageGroup
          if (data.birthdayStatus === 2) {
            this.birthdayStatus = 2
          }
        }
        if (data.sex !== '' && data.sex != null) {
          this.sexIndex = data.sex
          let sexArr = ['男', '女', '保密']
          this.sex = sexArr[data.sex - 1]
        }
      })
    },
    headerUpfile (e) {
      let fileKey = uploadPic(e, axios.post)
      let key = ''
      fileKey.then(res => {
        key = res.data.body.key
        this.headImage = key
      })

      // this.headImage = fileKey.data.key
      // console.log(fileKey)
      // let ss = e.target.files
      // let formData = new FormData()
      // formData.append('file', ss[0])
      // let cf = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': storage.getLocalStorage(accessToken)
      //   }
      // }
      // axios.post(config.baseUrl + 'file/upload', formData, cf).then((response) => {
      //   if (response.data.code === 0) {
      //     this.headImage = response.data.body.key
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    // 性别选择
    sexChangeShow () {
      // 弹窗显示
      this.popupVisible = true
      this.popType = 1
      // 改变数据
      this.popData = ['男', '女', '保密']
    },
    change (value) {
      console.log('change', value)
    },
    // 年龄选择
    ageChangeShow () {
      this.popType = 2
      if (this.birthdayStatus === 2) {
        this.readonly = true
        Toast({
          message: '生日信息修改，请联系在线客服，谢谢',
          position: 'middle',
          duration: 2000
        })
      }
    },
    onConfirm (val) {
      this.popType = 2
      this.ageGroup = val
    },
    // 收货地址
    addressAdmin () {
      router.push('/addressAdmin')
    },
    // 获取弹窗子组件数据选择
    getValueFromChild (val1, val2, val3) {
      if (this.popType === 1) {
        this.sexIndex = val1
        this.sex = val2
      } else if (this.popType === 2) {
        this.age = val2
      }
      this.popupVisible = val3
    },
    // 完善资料信心  完成点击事件
    onOperComplete () {
      let param = {
        headImage: this.headImage,
        name: this.name,
        sex: this.sexIndex,
        ageGroup: this.age
      }
      http(setMemberData, param).then((response) => {
        if (response.data.code === 0) {
          notice.toast('设置成功', '2000', 'success')
        }
      })
    },
    // 会员等级页面跳转
    memberGrade () {
      this.$router.push('/toolCenter')
    }
  },
  // 事件监听
  watch: {
    '$route' (to, from) {
      if (to.name === 'userInfoSet') {
        this.getUserInfo()
      }
    },
    sex: {
      handler (val, oldVal) {
        if (this.sex !== '' && this.sex != null) {
          this.sexShow = true
        }
      }
    },
    age: {
      handler (val, oldVal) {
        if (this.age !== '' && this.age != null) {
          this.ageShow = true
        }
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  // 计算属性
  computed: {
    p: {
      get () {
        return this.num
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~styles/mixins.styl";
  .vux-no-group-title
    margin-top 0!important
  .dp-header .dp-item
    font-size 46px!important
  .weui-cell
    p
      font-size 46px!important
      color #262626!important
    .vux-cell-value
      font-size 46px!important
      color #808080!important
  .weui-cell_access .weui-cell__ft:after
    display none!important
  .dp-container
    width 100%
    height 500px!important
  .dp-header
    height 130px
    line-height 130px
    font-size 46px!important
    box-sizing border-box
    padding 0 50px
  .setItemPop
    width 100%
    height 148px
    line-height 148px
    background #fff
    box-sizing border-box
    padding 0 70px 0 50px
    margin-top 1px
  .setProperty
    width auto
    height 148px
    line-height 148px
    font-size 46px
    color #262626
  .
    float right
    width 24px
    height 45px
    bgImage('/static/icons/enterNextGray')
    margin-top 51px
  .setInfoInput
    width auto
    height 146px
    line-height 140px
    font-size 46px
    color #808080
    float right
    text-align right
  ::-webkit-input-placeholder {
      color: #CCCCCC;
  }
  ::-moz-placeholder {
      color: #CCCCCC;
  }
  :-ms-input-placeholder {
      color: #CCCCCC;
  }
  :-moz-placeholder {
      color: #CCCCCC;
  }
.dp-container
  .scroller-component
    height 400px
  .scroller-item
    font-size 46px
  .scroller-item,.scroller-indicator
    height 80px
    line-height 80px
  .scroller-indicator
    top 160px
    border 1px solid #ccc
    border-left 0 solid #000
    border-right 0 solid #000
  .scroller-mask
    background-size: 100% 1.206667rem;

</style>
<style lang="stylus" scoped>
.wrapper
  width 100%
  box-sizing border-box
  padding-top 132px
  background #fff
.userInfoSetCon
  width 100%
  background #F5F5F5
.headerCon
  width 100%
  margin-bottom 30px
  background #fff
.headerSet
  width 100%
  height 300px
  box-sizing border-box
  padding 0 70px 0 50px
  .headerImg
    display block
    width 200px
    height 200px
    float right
    margin-top 50px
    position relative
    overflow hidden
    .headerImgFile
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      opacity 0
    img
      display block
      width 100%
      height 100%
  span
    height 300px
    line-height 300px
.setProperty
  width auto
  font-size 46px
  color #262626
.sexPopWrapper
  width 100%
  height auto
.setBirthdayPop
  width 100%
.setBirthday
  width 100%
  height 148px
  line-height 148px
  box-sizing border-box
  padding 0 70px 0 50px
  margin-top 1px
  p
    width auto
    height 148px
    line-height 148px
    font-size 46px
    color #262626
</style>
