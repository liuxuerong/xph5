<template>
  <div class="wrapper">
    <!-- 个人资料设置头部 -->
    <userinfo-header title="个人资料" oper="完成" @operComplete="onOperComplete"></userinfo-header>

    <div class="userInfoSetCon">
      <!-- 头像设置 -->
      <!-- <div class="headerSet">
        <span class="setProperty">头像</span>
        <img src="/static/images/personalHeader@3x.png" class="headerImg" alt="" @click="headerUpfile">
      </div> -->
      <header-upload></header-upload>
      <!-- <cropper-header  :headerImage="headerImage"  @getHeaderImage="newHeaderImage"></cropper-header> -->
      <!-- 基础设置 -->
      <userinfo-popset setPro="昵称" :inputShow="nameShow" :inputData="name" @sendNameToParent="sendNameToParent"></userinfo-popset>
      <userinfo-popset setPro="绑定手机号" :inputShow="phoneShow" :inputData="phone"></userinfo-popset>
      <userinfo-popset setPro="性别" :inputShow="sexShow" :inputData="sex" @click.native="sexChangeShow"></userinfo-popset>
      <userinfo-popset setPro="年龄段" :inputShow="ageShow" :inputData="age" @click.native="ageChangeShow"></userinfo-popset>
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
import UserinfoHeader from './ComUserSetHeader'
import UserinfoPopset from './ComSetInfoPop'
import ChangeItem from './ComChangeItem'
import HeaderUpload from './ComHeaderUpload'
import CropperHeader from './ComCropperHeader'
import { setMemberData, memberData } from 'util/netApi'
import { http } from 'util/request'
import { Popup } from 'mint-ui'
export default {
  data () {
    return {
      headImage: '',
      name: '',
      sexIndex: '',
      sex: '', // 1、男 2、女 3、保密
      age: '',
      phone: '',
      nameShow: true,
      phoneShow: true,
      sexShow: true,
      ageShow: true,
      popupVisible: false,
      popType: 0,
      popData: []
    }
  },
  components: {
    'mt-popup': Popup,
    UserinfoHeader,
    UserinfoPopset,
    'change-item': ChangeItem,
    HeaderUpload,
    CropperHeader
  },
  methods: {
    // 获取页面资料信息
    getUserInfo: function () {
      console.log(4444)
      http(memberData).then((response) => {
        console.log(response)
        let data = response.data.body
        if (data.name !== '' && data.name != null) {
          this.nameShow = true
          this.name = data.name
        }
        if (data.phone !== '' && data.phone != null) {
          this.phoneShow = true
          this.phone = data.phone.substring(0, 3) + '****' + data.phone.substring(7, 11)
        }
        if (data.ageGroup !== '' && data.ageGroup != null) {
          this.ageShow = true
          this.age = data.ageGroup
        }
        if (data.sex !== '' && data.sex != null) {
          this.sexShow = true
          let sexArr = ['男', '女', '保密']
          this.sex = sexArr[data.sex - 1]
        }
      })
    },
    // 头像上传
    headerUpfile () {

    },
    newHeaderImage (newImg) {
      this.headerImage = newImg
    },
    // 性别选择
    sexChangeShow () {
      // 弹窗显示
      this.popupVisible = true
      this.popType = 1
      // 改变数据
      this.popData = ['男', '女', '保密']
    },
    // 年龄选择
    ageChangeShow () {
      this.popupVisible = true
      this.popType = 2
      // 改变数据
      this.popData = ['10后', '00后', '90后', '80后', '70后', '60后']
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
    // 获取属性名
    sendNameToParent (val) {
      console.log(val)
      this.name = val
    },
    // 完善资料信心  完成点击事件
    onOperComplete: function () {
      let param = {
        headImage: this.headImage,
        name: this.name,
        sex: this.sexIndex,
        ageGroup: this.age
      }
      console.log(param)
      http(setMemberData, param).then((response) => {
        console.log(response)
      })
    }
  },
  // 事件监听
  watch: {
    sex: {
      handler: function (val, oldVal) {
        if (this.sex !== '' && this.sex != null) {
          this.sexShow = true
          console.log('sex改变了')
        }
      }
    },
    age: {
      handler: function (val, oldVal) {
        if (this.age !== '' && this.age != null) {
          this.ageShow = true
          console.log('age改变了')
        }
      }
    }

  },
  mounted: function () {
    this.getUserInfo()
    // console.log(this.p)
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
<style lang="stylus" scoped>
.userInfoSetCon
  width 100%
  background #F5F5F5
.headerSet
  width 100%
  height 300px
  margin-bottom 30px
  background #fff
  box-sizing border-box
  padding 0 70px 0 50px
  .headerImg
    display block
    width 200px
    height 200px
    float right
    margin-top 50px
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
</style>
