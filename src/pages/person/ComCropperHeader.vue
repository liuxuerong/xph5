<template>
  <div id="demo" class="cropperImg">
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    <div class="headerSet">
      <span class="setProperty">头像</span>
        <div class="headerShowImg">
          <div class="picture" :style="'backgroundImage:url('+headerImage+') no-repeat center center/100% 100%'">
          </div>
        </div>
        <div class="headerUploadBtn">
          <input type="file" id="change" accept="image" @change="change">
          <label for="change"></label>
        </div>
    </div>
  </div>

  <!-- <div class="headerSet">
    <span class="setProperty">头像</span>
    <div class="headerShowImg">
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'" style="height:56px;width:56px;"></div>
      </div>
      <div class="headerUploadBtn">
        <input type="file" id="change" accept="image" @change="change" style="height:56px;">
        <label for="change"></label>
      </div>
  </div> -->
</template>

<script>
import Cropper from 'cropperjs' // 引入插件
export default {
  props: {
    headerImage: { // 从user.vue父组件传过来数据库图片，即用户从本地上传的图片
      type: String,
      default: ''
    }
  },
  data () {
    return {
      picValue: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: '',
      postHeaderImg: ''
    }
  },
  mounted () {
    // 初始化这个裁剪框
    var self = this
    var image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function () {
        self.croppable = true
      }
    })
  },
  methods: {
    getObjectURL (file) {
      let url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    change (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.panel = true
      this.picValue = files[0]

      this.url = this.getObjectURL(this.picValue)
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      this.panel = true
    },
    crop () {
      this.panel = false
      var croppedCanvas
      var roundedCanvas

      if (!this.croppable) {
        return
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas()
      console.log(this.cropper)
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas)

      this.postHeaderImg = roundedCanvas.toDataURL()
      // 传递给父组件
      this.$emit('getHeaderImage', roundedCanvas.toDataURL())

      this.postImg()// 上传图片
    },
    getRoundedCanvas (sourceCanvas) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var width = sourceCanvas.width
      var height = sourceCanvas.height
      // 为了每张图片的大小不超过50k,所以不论裁剪多大，最后上传的，最大宽度不超过90。
      if (width > 90) {
        width = 90
      }
      if (height > 90) {
        height = 90
      }

      canvas.width = width
      canvas.height = height

      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
      context.fill()

      return canvas
    },
    postImg () {
      this.$http.post(
        this.http_h + 'bp/user/uploadHeadImage',
        {
          fieldName: this.postHeaderImg
        }
      ).then((res) => {
        let response = res.body
        if (response.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: '上传头像成功',
            time: 1000
          })
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: response.message,
            time: 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.headerSet
  width 100%
  height 300px
  margin-bottom 30px
  background #fff
  box-sizing border-box
  padding 0 70px 0 50px
  position relative
  span
    height 300px
    line-height 300px
.setProperty
  width auto
  font-size 46px
  color #262626
.headerShowImg
  display block
  width 200px
  height 200px
  float right
  margin-top 50px
  background red
  .picture
    width 100%
    height 100%
    background-size 100% 100%
    background-position center center
.headerUploadBtn
  width 200px
  height 200px
  float right
  margin-top 50px
  background green
  overflow hidden
  position absolute
  right 70px
  top 0px
  opacity 0
  input[type="file"]
    display block
    width 100%
    height 100%
</styles>
