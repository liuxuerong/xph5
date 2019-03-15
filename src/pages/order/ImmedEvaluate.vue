<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="evaluateCon">
      <div class="goodsItem" v-for="(item,index) in list" :key="item.goodsItemId">
        <div class="evaluateTop clearfix">
          <img v-if="item.pic != ''" :src="imageUrl+item.pic+imageAfterUrl" alt="">
          <img v-else src="../../images/personalHeader.png">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              {{formatSpec(item.spec)}}
            </div>
            <!-- <span class="goodsPrice">￥ {{item.price}}</span> -->
          </div>
        </div>
        <div class="evaluateText">
          <textarea class="evaluateArea" :maxlength="300" ref="evaluateText"  v-model="item.evaluateText" placeholder="宝贝满足您的期待吗？说说他的优点和美中不足的地方吧。还可以上传最多5张图片哦~" cols="30" rows="10"></textarea>
          <span class="fontNum"><i>{{item.evaluateText.length}}</i>/300</span>
        </div>
        <div class="uploadWrapper" @click="checkLength(index)">
           <div class="uploadPicBtn">
            <input name="file" @change="uploadPic($event,index)" ref="inputer"  type="file" v-if="!objImgs[index]||objImgs[index]&&objImgs[index].length<5"/>
          </div>
          <div class="uploadItem" v-for="(childImg,j) in objImgs[index]" :key="j">
            <img :src="imageUrl+childImg+imageAfterUrl" alt="">
            <span class="deletePic" @click="deletePic(index,j)"></span>
          </div>
        </div>
      </div>

    </div>
      <div class="submitBtn" @click="commentSubmit">提交评价</div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import { orderDetails, comment } from 'util/netApi'
import {Toast} from 'mint-ui'
import { http } from 'util/request'
import { config } from 'util/config' // 图片路径
import { storage } from 'util/storage.js'
import { accessToken } from 'util/const.js'
import axios from 'axios'
export default {
  data () {
    return {
      title: '评论',
      orderCode: '',
      list: [],
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      objImgs: [],
      evaluateText: '',
      Surplus: 0,
      isNotEva: true
    }
  },
  components: {
    SearchTitle
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'immedEvaluate') {
        this.evaluateRender()
      }
    }
  },
  methods: {
    // 格式化商品信息
    formatSpec: function (goodsSpec) {
      let specArr = JSON.parse(goodsSpec)
      let spec = ''
      for (let item of specArr) {
        spec += item.value + '/'
      }
      spec = spec.substring(0, spec.length - 1)
      return spec
    },
    // 页面初始化渲染
    evaluateRender () {
      let orderCode = this.$route.params.orderCode
      this.orderCode = orderCode
      http(orderDetails, [orderCode]).then((response) => {
        console.log(response)
        let data = response.data.body.memberOrderGoods
        for (let i = 0; i < data.length; i++) {
          data[i].evaluateText = ''
        }
        this.list = data
      })
    },
    // 检查已上传图片
    checkLength (index) {
      if (this.objImgs[index] && this.objImgs[index].length > 4) {
        Toast({
          message: '最多上传五张图片',
          position: 'center',
          duration: 2000
        })
      }
    },
    uploadPic (e, index) {
      let ss = e.target.files
      let formData = new FormData()
      formData.append('file', ss[0])
      if (!this.objImgs[index]) {
        this.objImgs[index] = []
      }
      let cf = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': storage.getLocalStorage(accessToken)
        }
      }
      axios.post(config.baseUrl + 'file/upload', formData, cf).then((response) => {
        if (response.data.code === 0) {
          if (this.objImgs[index]) {
            let childArr = this.objImgs[index]
            childArr.push(response.data.body.key)
            this.$set(this.objImgs, index, childArr)
          } else {
            let childArr = []
            childArr = [response.data.body.key]
            this.$set(this.objImgs, index, childArr)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 图片删除
    deletePic (index, j) {
      this.objImgs[index].splice(j, 1)
    },
    // 评论数据提交
    commentSubmit () {
      console.log(789)
      let _this = this
      let goodsComments = []
      for (let i = 0; i < this.list.length; i++) {
        let con = {}
        con['goodsItemId'] = this.list[i].goodsItemId
        con['comments'] = this.list[i].evaluateText
        con['commentsPics'] = JSON.stringify(this.objImgs[i])
        if (this.objImgs[i] === undefined || this.objImgs[i] === '') {
          con['commentsPics'] = ''
        } else {
          con['commentsPics'] = this.objImgs[i] + ','
          con['commentsPics'] = con['commentsPics'].substr(0, con['commentsPics'].length - 1)
        }
        con['start'] = ''
        goodsComments[i] = con
      }
      let params = {
        orderItemSn: this.orderCode,
        goodsComments: goodsComments
      }
      for (let i = 0; i < params.goodsComments.length; i++) {
        if (params.goodsComments[i].commentsPics != '' || params.goodsComments[i].comments != '') {
          this.isNotEva = false
          break
        }
      }
      if (!this.isNotEva) {
        http(comment, params).then((response) => {
          if (response.data.body === true) {
            Toast({
              message: '评论成功',
              position: 'center',
              duration: 2000
            })
            setTimeout(() => {
              _this.$router.push('/personCenter')
            }, 2000)
          } else {
            Toast({
              message: '请重新提交',
              position: 'center',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        Toast({
          message: '请为至少一个商品填写评论',
          position: 'center',
          duration: 2000
        })
      }
    }
  },
  mounted () {
    this.evaluateRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
  .evaluateCon
    width 100%
    min-height calc(100vh-(250px))
    background #F5F5F5
    padding 160px 50px 30px
    .goodsItem
      width 100%
      padding 50px
      background #fff
      margin-bottom 30px
      border-radius 20px
      img
        float left
        width 286px
        height 286px
        margin-right 50px
      .orderText
        float left
        width calc(100% - 336px)
        height 286px
        box-sizing border-box
        position relative
        .goodsName
          width 100%
          font-size 46px
          line-height 90px
          color #333
          ellipsis()
        .goodsPrice
          display block
          width 100%
          font-size 46px
          color #333333
          position absolute
          bottom 20px
          font-weight 600
          left 0
  .evaluateText
    display block
    width 100%
    height 320px
    margin 70px auto 50px
    background #F5F5F5
    position relative
    padding 50px 30px
    .evaluateArea
      width 100%
      height 100%
      box-sizing border-box
      font-size 36px
      background #F5F5F5
      color #262626
      resize none
    .fontNum
      position absolute
      margin-right 40px
      font-size 40px
      color #999
      bottom 10px
      right 0
      i
        color #333333
  .uploadWrapper
    width 100%
    height 130px
    .uploadPicBtn
      float left
      width 130px
      height 130px
      background url(../../images/upLoadPic.png) no-repeat center center/70%
      input[type="file"]
        display block
        width 130px
        height 130px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      position relative
      height 190px
      img
        float left
        width 130px
        height 130px
        margin-right 24px
      img:nth-of-type
        margin-right 0px
    .deletePic
      display block
      width 40px
      height 40px
      position absolute
      right 5px
      top -20px
      bgImage('../../icons/deletePic')
  .goodsSpec
    color #808080
    font-size 36px
.submitBtn
  height 250px
  line-height 250px
  background #fff
  color #333333
  font-size 50px
  width 100%
  text-align center
  font-weight 600
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-size 36px
  color #CCCCCC
}
::-moz-placeholder { /* Firefox 19+ */
  font-size 36px
  color #CCCCCC
}
:-ms-input-placeholder { /* IE 10+ */
  font-size 36px
  color #CCCCCC
}
:-moz-placeholder { /* Firefox 18- */
  font-size 36px
  color #CCCCCC
}
</style>
