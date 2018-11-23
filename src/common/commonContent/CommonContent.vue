<template>
  <div class="commonContent">
    <div class="goodsItemsContainer" ref="goodsItemsContainer">
      <div v-for="item in goodsItems" :key="item.id">
        <div class="goodsItems" @click="linkDetails">
          <!-- <router-link :to="'/details/'+item.id"  tag="div" class="goodsItems" > -->
          <!-- <a :href="'/details/'+item.id" class="goodsItems"> -->
          <router-link :to="'/details/'+item.id">
            <img :src="imageUrl+item.coverImage" alt="">
          </router-link>
          <div class="right">
            <router-link :to="'/details/'+item.id" class="name">{{item.name}}</router-link>
            <div class="price">
              <router-link :to="'/details/'+item.id">
                <span>￥{{item.minPrice}}</span>
                <del>￥{{item.marketPrice}}</del>
              </router-link>
            </div>
            <div class="promotion" v-if="item.activityLabels&&item.activityLabels.length>0">
              <span class="promotionItem" :class="{gray:lables.color==2}" v-for="(lables,index) in item.activityLabels" :key="index">{{lables.labelName}}</span>
            </div>
            <router-link :to="'/details/'+item.id" class="seeMore">查看详情</router-link>

          </div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div class="detailsContent" v-html="content" v-if="content!==''">
    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config.js'
export default {
  name: 'CommonContent',
  components: {},
  data () {
    return {
      content: '',
      contentArr: [],
      imageUrl: config.imageUrl
    }
  },
  props: {
    goodsItems: Array,
    details: Object
  },
  methods: {
    updateContent () {
      const goodsItems = this.$refs.goodsItemsContainer.children
      this.contentArr = this.details.content.split('{')
      let newArr = []
      for (let i = 0; i < this.contentArr.length; i++) {
        let innerArr = this.contentArr[i].split('}')
        for (let j = 0; j < innerArr.length; j++) {
          if (innerArr[j] !== '') {
            newArr.push(innerArr[j])
          }
        }
      }
      for (let i = 0; i < newArr.length; i++) {
        let j = 0
        if (!isNaN(newArr[i])) {
          let goods = goodsItems[j].innerHTML
          newArr[i] = goods
          j++
        }
      }
      this.content = newArr.join('')
    },
    linkDetails (id) {
      console.log(777)
      this.$route.push(`/details/${id}`)
    }
  },
  mounted () {
    this.updateContent()
  },
  updated () {
    this.updateContent()
  }
}
</script>

<style lang="stylus" scoped>
  .goodsItemsContainer
    display none
  .goodsItems
    display flex
    padding 30px
    background-color #FAFAFA
    margin-bottom 50px
    img
      width 230px
      height 230px
      margin-right 35px
    .right
      flex 1
      position relative
      .name
        font-size 40px
        font-weight 600
        margin-bottom 40px
        color #333
      .price
        span
          font-size 40px
          display inline-block
          margin-right 20px
          color #333
        del
          color #999999
      .seeMore
        position absolute
        width 200px
        height 80px
        line-height 80px
        text-align center
        border 1px solid #BA825A
        color #BA825A
        font-size 40px
        right 0
        bottom 0
.promotion
  font-size 0
  display inline-block
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 0 20px
    height 50px
    line-height 50px
    border 1px solid #D54B4B
    display inline-block
    margin 0 12px
    margin-top 23px
    font-weight normal
  .promotionItem.gray
    background-color  #F5F5F5
    border none
    color #999999
</style>

<style lang="stylus">
  .detailsContent
    text-align left
    padding 100px 50px 0px
    color #262626
    font-size 40px
    line-height 70px
    p
      text-align left!important
      color #262626
      font-size 40px
      line-height 70px
    img
      width 100%
</style>
