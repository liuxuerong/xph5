<template>
  <div class="hallAtlas">
    <common-nav-header :title="title" />
    <div class="xpAtlasTop border-bottom" ref="xpAtlasTop">
      <div class="xpAtlasTopContent" ref="xpAtlasTopContent">
        <tab v-if="hallAtlasData.length>1">
          <tab-item v-for="(item,i) in hallAtlasData" :selected="i==index" @on-item-click="onItemClick" :key="i" :id="i" ref="tabItem">{{item.name}}
          </tab-item>
          <tab-item></tab-item>
        </tab>
      </div>
    </div>
    <div ref="xpHallContent" class="xpHallContent">
      <div>
        <ul class="goodsContainer" v-if="imgsList.length">
          <li v-for="item in imgsList" v-if="imgsList.length" :key="item.index">
              <router-link :to="'/hallDetails/'+index">
                <img :src="imageUrl+item.img" alt="">
              </router-link>
            </li>
            <li class="emptyBox"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import {
  config
} from 'util/config.js'
import {
  experience
} from 'util/const.js'
import {
  storage
} from 'util/storage.js'
import {
  Tab,
  TabItem
} from 'vux'
import notice from 'util/notice'
export default {
  name: 'HallAtlas',
  components: {
    CommonNavHeader,
    Tab,
    TabItem
  },
  data () {
    return {
      title: '图集',
      imageUrl: config.imageUrl,
      imgsList: [],
      hallAtlasData: [{
        name: '全部',
        experienceCategoryId: '全部',
        list: []
      }],
      index: 0
    }
  },
  methods: {
    initHallAtlasData (index) {
      for (let i = 0; i < this.experience.length; i++) {
        let flag = true
        for (let j = 0; j < this.hallAtlasData.length; j++) {
          if (this.hallAtlasData[j].experienceCategoryId === this.experience[i].experienceCategoryId) {
            this.hallAtlasData[j].list.push({
              img: this.experience[i].experienceCoverImage,
              index: i
            })
            flag = false
            break
          }
        };
        if (flag) {
          this.hallAtlasData.push({
            name: this.experience[i].categoryName,
            experienceCategoryId: this.experience[i].experienceCategoryId,
            list: [{
              img: this.experience[i].experienceCoverImage,
              index: i
            }]
          })
        }
        this.hallAtlasData[0].list.push({
          img: this.experience[i].experienceCoverImage,
          index: i
        })
      }
      this.getImgsList(index)
      // this.scrollInitTopBar()
      // console.log(this.$refs.xpAtlasTopContent.getElementsByClassName('vux-tab-erap'))
    },
    onItemClick (index) {
      this.index = index
      this.getImgsList(index)
    },
    getImgsList (i) {
      this.imgsList = this.hallAtlasData[i].list
    }
  },
  created () {
    this.index = this.$route.params.index
    const _this = this
    if (!storage.getLocalStorage(experience)) {
      notice.errorModal('未授权，请重新登录', function () {
        _this.$router.push({path: '/login'})
      })
    } else {
      this.experience = storage.getLocalStorage(experience)
    }
  },
  mounted () {
    this.initHallAtlasData(this.index)
  }
}
</script>

<style lang="stylus" scoped>
  .vux-tab-wrap
    height 106px
  .xpAtlasTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
    font-weight 600
    position relative
  .xpAtlasTop>>>.vux-tab .vux-tab-item.vux-tab-selected::before
    content ""
    position absolute
    bottom 0
    left 50%
    transform translateX(-50%)
    width 88px
    background-color #262626
    height 8px
.xpAtlasTop>>>.vux-tab-ink-bar
    display none !important
.xpAtlasTop>>>.vux-tab-container
    height 108px
.xpAtlasTop>>>.vux-tab
    height 108px
.xpAtlasTop>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 46px
    flex none
    display inline-block
    width: auto;
    margin-right 100px
.hallAtlas
  height 100%
  padding-top 202px
  .xpAtlasTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
    z-index 9999999
    padding 0 50px
    background-color #fff
.xpHallContent
  ul
    display flex
    flex-wrap wrap
    padding 50px
    justify-content space-between
    height 100%
    li
      width 488px
      height 450px
      margin-bottom 50px
      img
        width 488px
        height 450px
    .emptyBox
      width 488px
      height 0
</style>
