<template>
<div class="commentCont">
  <div class="commemt" v-if="comment">
    <div class="commentItem border-bottom" v-for="item in comment.list" :key="item.id">
      <div class="top">
        <div class="name">{{item.goodsName}}</div>
        <span class="time">{{item.createTime.split('T')[0]}}</span>
      </div>
      <div class="text">{{item.comments}}</div>
      <div class="goodsItemSpec" v-for="(itemC,indexC) in JSON.parse(item.goodsItemSpec)" :key="indexC">
        <span>{{itemC.key}}:{{itemC.value}}</span>
      </div>
      <div class="imgContent">
        <img :src="imageUrl+itemImg" alt="" v-for="itemImg in item.commentsPics.split(',')" :key="itemImg">
      </div>
    </div>
  </div>
  <common-empty v-else :emptyObj="emptyObj"/>
</div>

</template>

<script>
import {
  storage
} from 'util/storage.js'
import {
  config
} from 'util/config.js'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
export default {
  name: 'Comment',
  data () {
    return {
      imageUrl: config.imageUrl,
      comment: null,
      emptyObj: {
        emptyImg: '/static/images/commentEmpty.png',
        emptyBold: '暂无评论',
        emptyP: '该商品还没有人写评价',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    CommonEmpty
  },
  mounted () {
    const commemt = storage.getLocalStorage('commemt')
    if (commemt.totals) {
      this.comment = commemt
    }
    console.log(this.comment)
  }
}
</script>

<style lang="stylus" scoped>
.commentCont
  height 100%
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
</style>
