<template>
  <div class="commentCont">
    <common-nav-header :title="title" />
    <div class="commemt" v-if="comments">
      <div class="commentItem border-bottom" v-for="(item,i) in comments.list" :key="item.id">
        <div class="top">
          <div class="name">{{item.memberName.substr(0, 3) + '****' + item.memberName.substr(7)}}</div>
          <span class="time" v-if="item.createTime">{{item.createTime.split('T')[0]}}</span>
        </div>
        <div class="text">{{item.comments}}</div>
        <div class="goodsItemSpec" v-for="(itemC,indexC) in JSON.parse(item.goodsItemSpec)" :key="indexC">
          <span>{{itemC.key}}:{{itemC.value}}</span>
        </div>
        <div class="imgContent">
          <img :src="imageUrl+itemImg" alt="" v-for="(itemImg,index) in item.commentsPics.split(',')" :key="itemImg" @click="show(i,index)" class="previewer-demo-img">
          <div v-transfer-dom>
            <previewer :list="list[i]" ref="previewer" :options="options"></previewer>
          </div>
        </div>
      </div>
    </div>
    <common-empty v-else :emptyObj="emptyObj" />
  </div>
</template>

<script>
import {
  storage
} from 'util/storage.js'
import {
  config
} from 'util/config.js'
import {
  comment
} from 'util/const'
import {
  getList
} from '@/func/preview'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import CommonNavHeader from '@/common/commonHeader/CommonNavHeader'
import {
  Previewer,
  TransferDom
} from 'vux'
export default {
  name: 'Comment',
  directives: {
    TransferDom
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      comments: null,
      title: '评论',
      emptyObj: {
        emptyImg: '/static/images/commentEmpty.png',
        emptyBold: '暂无评论',
        emptyP: '该商品还没有人写评价',
        buttonText: null,
        buttonRouter: null
      },
      list: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      }
    }
  },
  components: {
    CommonEmpty,
    CommonNavHeader,
    Previewer
  },
  methods: {
    show (i, index) {
      this.$refs.previewer[i].show(index)
    }
  },
  mounted () {
    const commemts = storage.getLocalStorage(comment)
    if (commemts.totals) {
      this.comments = commemts
      this.list = getList(commemts.list)
    }
  }
}
</script>

<style lang="stylus" scoped>
.commentCont
  height 100%
  padding-top 140px
.commemt
  padding 0 50px
.commentItem
  .top
    display flex
    justify-content space-between
    .name
      height 146px
      line-height 146px
      color #262626
      font-size 46px
      font-weight 600
    .time
      height 146px
      line-height 146px
      color #808080
      font-size 36px
  .text
    line-height 70px
    color #262626
    font-size 40px
    margin-bottom 30px
  .goodsItemSpec
    span
      color #808080
      font-size 36px
      display inline-block
      margin-right 40px
      margin-bottom 30px
.imgContent
  padding-bottom 100px
  width 100%
  img
    width 197px
    height 197px
    border 1px solid #E6E6E6
    margin-right 10px
</style>
