<template>
  <div class="wrapper">
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
        <userinfo-popset setPro="会员等级" :inputData="memberLevelName+'会员'"></userinfo-popset>
        <userinfo-popset setPro="我的收获地址" @click.native="addressAdmin"></userinfo-popset>
      </div>

      <!-- 基础设置 -->
      <userinfo-popset setPro="绑定手机号" :inputData="phone"></userinfo-popset>
      <div class="setItemPop border-bottom">
        <span class="setProperty">昵称</span>
        <input type="text" class="setInfoInput" v-model="name">
      </div>
      <userinfo-popset setPro="性别" :inputData="sex" @click.native="sexChangeShow"></userinfo-popset>
      <userinfo-popset setPro="年龄段" :inputData="age" @click.native="ageChangeShow"></userinfo-popset>
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
import UserinfoHeader from './ComUserSetHeader'
import UserinfoPopset from './ComSetInfoPop'
import ChangeItem from './ComChangeItem'
import CropperHeader from './ComCropperHeader'
import { setMemberData, memberData } from 'util/netApi'
import { http } from 'util/request'
import { Popup } from 'mint-ui'
import notice from 'util/notice.js'
import { config } from 'util/config' // 图片路径
// import { storage } from 'util/storage.js'
// import { accessToken } from 'util/const.js'
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
      memberLevelName: ''
    }
  },
  components: {
    'mt-popup': Popup,
    UserinfoHeader,
    UserinfoPopset,
    'change-item': ChangeItem,
    CropperHeader
  },
  methods: {
    // 获取页面资料信息
    getUserInfo: function () {
      http(memberData).then((response) => {
        let data = response.data.body
        this.memberLevelName = data.memberLevelName
        console.log(data)
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
    // 年龄选择
    ageChangeShow () {
      this.popupVisible = true
      this.popType = 2
      // 改变数据
      this.popData = ['10后', '00后', '90后', '80后', '70后', '60后']
    },
    // 收货地址
    addressAdmin () {
      router.push('./addressAdmin')
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
    }
  },
  // 事件监听
  watch: {
    sex: {
      handler: function (val, oldVal) {
        if (this.sex !== '' && this.sex != null) {
          this.sexShow = true
        }
      }
    },
    age: {
      handler: function (val, oldVal) {
        if (this.age !== '' && this.age != null) {
          this.ageShow = true
        }
      }
    }

  },
  mounted: function () {
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
  .setIcon
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
</style>
