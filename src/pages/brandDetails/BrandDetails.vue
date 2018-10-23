<template>
  <div class="brandDetails" ref="brandDetails">
    <div>
      <div class="topBgImg">
        <img :src="imageUrl+details.articleCoverImage" alt="" class="articleCoverImage">
      </div>
      <details-header v-if="details!=={}" :details="details" />
      <common-content v-if="details!=={}" :goodsItems="goodsItems" :details="details" />
      <div class="cutOffLine30"></div>
      <common-article-rec v-if="details!=={}" :articleRecommends="details.articleRecommends" />
    </div>
  </div>
</template>

<script>
import {
  http
} from 'util/request'
import {
  hotelDetailList
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import BScroll from 'better-scroll'
import DetailsHeader from './components/DetailsHeader'
import CommonContent from '@/common/commonContent/CommonContent'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
export default {
  name: 'BrandDetails',
  components: {
    DetailsHeader,
    CommonContent,
    CommonArticleRec
  },
  data () {
    return {
      id: '',
      imageUrl: config.imageUrl,
      details: {}, // 详情
      goodsItems: []

    }
  },
  computed: {},
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    getBrandDetail () {
      const id = this.$route.params.id
      http(hotelDetailList, [id])
        .then(res => {
          this.details = res.data.body
          this.goodsItems = res.data.body.goodsItems
          this.scrollInit()
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollInit () {
      return (this.scroll = new BScroll(this.$refs.brandDetails, {
        scrollY: true,
        click: true,
        bounce: {
          top: true,
          bottom: true
        }
      }))
    }

  },
  mounted () {
    this.getBrandDetail()
  }
}
</script>

<style lang="stylus" scoped>
.brandDetails
  height 100%
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
</style>
