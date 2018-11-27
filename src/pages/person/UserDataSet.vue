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
            <img v-if="!headImage" src="/static/images/personalHeader.png">
            <img v-else :src="imageUrl+headImage">
            <input type="file" name="" class="headerImgFile" @change="headerUpfile($event)">
          </div>
        </div>
        <div class="setItemPop border-bottom" v-for="(item,index) in title1" :key="index" @click="greadAddress(index)">
          <span class="setProperty">{{item.name}}</span>
          <input type="text" class="setInfoInput" v-if="index===0" v-model="memberLevelName" readonly>
          <i class="setIcon" v-if="item.showIcon"></i>
        </div>
      </div>
      <!-- 基础设置 -->
      <div class="setItemPop border-bottom" v-for="(item,index) in title2" :key="index" @click="userBasicInfo(index)">
        <span class="setProperty">{{item.name}}</span>
        <i class="setIcon" v-if="index!==0"></i>
        <input type="text" class="setInfoInput" v-if="index===0" v-model="phone" readonly>
        <input type="text" class="setInfoInput" v-if="index===1" v-model="modifyName" readonly>
        <input type="text" class="setInfoInput" v-if="index===2" v-model="sex" readonly>
        <input type="text" class="setInfoInput" v-if="index===3" v-model="age" readonly>
      </div>
      <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
        :endDate="endDate"
        >
      </mt-datetime-picker>
      <mt-popup
        class="sexPopWrapper"
        v-model="popupVisible"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <change-item v-for="(item , index) of popData" :key="index" :content="item" :index="index" @sendValueToParent="getValueFromChild"></change-item>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import UserinfoPopset from './ComSetInfoPop'
import ChangeItem from './ComChangeItem'
import CropperHeader from './ComCropperHeader'
import { setMemberData, memberData } from 'util/netApi'
import { http } from 'util/request'
import { Popup, DatetimePicker, Toast } from 'mint-ui'
import moment from 'moment'// 格式化时间
import notice from 'util/notice.js'
import { config } from 'util/config' // 图片路径
import {
  storage
} from 'util/storage'
import axios from 'axios'
import {uploadPic} from '@/func/upload'
export default {
  data () {
    return {
      name: '',
      headImage: '',
      sexIndex: '',
      phone: '',
      sex: '', // 1、男 2、女 3、保密
      age: '',
      modifyName: '',
      popupVisible: false,
      popData: [],
      memberLevelName: '',
      birthdayStatus: 1,
      imageUrl: config.imageUrl,
      startDate: new Date('1940-01-01'),
      endDate: new Date(),
      list: [],
      title1: [
        {name: '会员等级', inputShow: true, showIcon: false},
        {name: '我的收货地址', inputShow: false, showIcon: true}
      ],
      title2: [
        {name: '绑定手机号', inputShow: false},
        {name: '昵称', inputShow: true},
        {name: '性别', inputShow: true},
        {name: '出生日期', inputShow: true}
      ]
    }
  },
  components: {
    'mt-popup': Popup,
    UserinfoHeader,
    UserinfoPopset,
    'change-item': ChangeItem,
    CropperHeader,
    'mt-datetime-picker': DatetimePicker
  },
  methods: {
    // 获取页面资料信息
    getUserInfo () {
      http(memberData).then((response) => {
        console.log(response)
        let data = response.data.body
        this.memberLevelName = data.memberLevelName + '会员'
        this.name = data.name
        let type = this.$route.params.type
        if (type === undefined) {
          this.modifyName = this.name
        } else {
          this.modifyName = storage.getLocalStorage('modifyName')
        }
        if (data.headImage !== '' && data.headImage != null) {
          this.headImage = data.headImage
        }
        if (data.phone !== '' && data.phone != null) {
          this.phone = data.phone.substring(0, 3) + '****' + data.phone.substring(7, 11)
        }
        if (data.ageGroup !== '' && data.ageGroup != null) {
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
    // 头像上传
    headerUpfile (e) {
      let fileKey = uploadPic(e, axios.post)
      let key = ''
      fileKey.then(res => {
        key = res.data.body.key
        this.headImage = key
      })
    },
    // 会员等级 收货地址
    greadAddress (index) {
      if (index === 0) {
        this.$router.push('/toolCenter')
      } else if (index === 1) {
        this.$router.push('/addressAdmin')
      }
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      this.age = date
    },
    // 手机号 昵称 性别 出生日期
    userBasicInfo (index) {
      console.log(index)
      if (index === 0) {
        // 手机号显示
      } else if (index === 1) {
        // 昵称
        this.$router.push('/userNamePer')
      } else if (index === 2) {
        // 性别
        this.popupVisible = true
        this.popData = ['男', '女', '保密']
      } else if (index === 3) {
        // 出生日期
        if (this.birthdayStatus === 1) {
          this.openPicker()
        } else {
          Toast({
            message: '生日信息修改，请联系在线客服，谢谢',
            position: 'middle',
            duration: 2000
          })
        }
      }
    },
    // 获取弹窗子组件数据选择
    getValueFromChild (val1, val2, val3) {
      this.sex = val2
      this.sexIndex = val1
      this.popupVisible = val3
    },
    // 完善资料信心  完成点击事件
    onOperComplete () {
      let _this = this
      let param = {
        headImage: this.headImage,
        name: this.modifyName,
        sex: this.sexIndex,
        ageGroup: this.age
      }
      http(setMemberData, param).then((response) => {
        if (response.data.code === 0) {
          notice.toast('设置成功', '2000', 'success')
          storage.delLocalStorage('modifyName')
          _this.$router.push('/personCenter')
        }
      })
    }
  },
  // 事件监听
  watch: {
    '$route' (to, from) {
      if (to.name === 'userInfoSet') {
        this.getUserInfo()
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="stylus">
  @import "~styles/mixins.styl";
  .picker-toolbar
    width 100%
    height 130px
    line-height 130px
    .mint-datetime-action
      height 130px
      line-height 130px
      font-size 46px
  .picker-item
    font-size 46px!important
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
@import "~styles/mixins.styl";
.wrapper
  width 100%
  box-sizing border-box
  padding-top 132px
  background #fff
  .setIcon
    float right
    width 24px
    height 45px
    margin-left 30px
    margin-top 50px
    bgImage('/static/icons/enterNextGray')
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
