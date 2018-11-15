<template>
  <div class="wrapper">
    <search-title :title="title" :oper='3' @commentSubmit="commentSubmit"></search-title>
    <div class="evaluateCon">
      <div class="goodsItem" v-for="(item,index) in list" :key="item.goodsItemId">
        <div class="evaluateTop clearfix">
          <img :src="imageUrl+item.pic" alt="">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(item.spec)" :key="n">{{spec.value}}</span>
            </div>
            <span class="goodsPrice">￥ {{item.price}}</span>
          </div>
        </div>
        <div class="evaluateText">
          <textarea class="evaluateArea" ref="phoneNum" placeholder="宝贝满足您的期待吗？说说他的优点和美中不足的地方吧。" cols="30" rows="10"></textarea>
          <span class="fontNum">{{fontNum}}/100</span>
        </div>
        <div class="uploadWrapper">
          <div class="uploadItem" v-for="(childImg,j) in objImgs[index]" :key="j">
            <img :src="imageUrl+childImg" alt="">
          </div>
          <div class="uploadPicBtn" v-if="(!objImgs[index]) || ( objImgs[index].length < 5)">
            <input name="file" @change="uploadPic($event,index)" ref="inputer"  type="file"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import { subOrderDetail, comment } from 'util/netApi'
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
      fontNum: 0,
      objImgs: []
    }
  },
  components: {
    SearchTitle
  },
  watch: {
    objImgs: function () {
      // console.log(45465)
    }
  },
  methods: {
    // 页面初始化渲染
    evaluateRender () {
      let orderCode = this.$route.params.orderCode
      this.orderCode = orderCode
      http(subOrderDetail, [orderCode]).then((response) => {
        let data = response.data.body.memberOrderGoods
        this.list = data
      })
    },
    uploadPic (e, index) {
      console.log(index)
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
      // https://api.test.jdhoe.com/file/upload
      axios.post(config.baseUrl + 'file/upload', formData, cf).then((response) => {
        console.log(response)
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
    // 评论数据提交
    commentSubmit () {
      console.log(this.list)
      console.log(9999)
      console.log(this.$refs.phoneNum[0].value)
      let goodsComments = []
      for (let i = 0; i < this.list.length; i++) {
        let con = {}
        con['goodsItemId'] = this.list[i].goodsItemId
        con['comments'] = this.$refs.phoneNum[i].value
        con['commentsPics'] = JSON.stringify(this.objImgs[i])
        if (this.objImgs[i] !== undefined) {
          con['commentsPics'] = this.objImgs[i] + ','
          con['commentsPics'] = con['commentsPics'].substr(0, con['commentsPics'].length - 1)
        } else {
          con['commentsPics'] = ''
        }
        console.log(con['commentsPics'])
        con['start'] = ''
        goodsComments[i] = con
      }
      console.log(goodsComments)
      let params = {
        orderItemSn: this.orderCode,
        goodsComments: goodsComments
      }
      console.log(params)
      http(comment, params).then((response) => {
        console.log(response)
        if (response.body === true) {
          location.reload() // 刷新页面
          console.log('评论完成')
        }
      })
    }
  },
  mounted () {
    this.evaluateRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  body, html
    background #F5F5F5!important
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .evaluateCon
    width 100%
    background #F5F5F5
    .goodsItem
      width 100%
      box-sizing border-box
      padding 50px
      background #fff
      margin-bottom 30px
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
        padding-top 50px
        position relative
        .goodsName
          width 100%
          line-height 40px
          font-size 40px
          color #262626
          margin-bottom 30px
          font-weight blod
        .goodsPrice
          display block
          width 100%
          font-size 40px
          color #000000
          position absolute
          bottom 20px
          left 0
  .evaluateText
    display block
    width 100%
    height 320px
    margin 70px auto 50px
    background #F5F5F5
    position relative
    .evaluateArea
      width 100%
      height 260px
      box-sizing border-box
      padding 50px 30px
      background #F5F5F5
      font-size 36px
      color #262626
      resize none
    .fontNum
      float right
      margin-right 40px
      font-size 36px
      color #CCCCCC
  .uploadWrapper
    width 100%
    height 190px
    .uploadPicBtn
      float left
      width 185px
      height 185px
      bgImage('/static/images/upLoadPic')
      input[type="file"]
        display block
        width 185px
        height 185px
        overflow hidden
        opacity 0
    .uploadItem
      float left
      width auto
      height 190px
      img
        float left
        width 180px
        height 180px
        margin-right 24px
      img:nth-of-type
        margin-right 0px
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size 36px
    color #999999
  }
  ::-moz-placeholder { /* Firefox 19+ */
    font-size 36px
    color #999999
  }
  :-ms-input-placeholder { /* IE 10+ */
    font-size 36px
    color #999999
  }
  :-moz-placeholder { /* Firefox 18- */
    font-size 36px
    color #999999
  }
</style>
