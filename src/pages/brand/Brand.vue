<template>
  <div class="xpBrand">
    <common-header :isScan="false" ref="commonHeader"><h1 class="title fl">国际品牌</h1></common-header>
    <brand-img-name :articles="articles" v-if="articles.length" ref="brandImgName"/>
  </div>
</template>

<script>
import CommonHeader from 'common/commonHeader/CommonHeader'
import BrandImgName from './components/BrandImgName'
import { http } from 'util/request'
import { brandList } from 'util/netApi'
export default {
  name: 'Brand',
  components: {
    CommonHeader,
    BrandImgName
  },
  data () {
    return {
      articles: []
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    getBrandList () {
      const parmas = {
        page: 1,
        rows: 20
      }
      http(brandList, parmas).then(res => {
        console.log(res)
        this.articles = res.data.body.articles
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getBrandList()
  }
}
</script>

<style lang="stylus" scoped>
.xpBrand
  height 100%
  h1.title
    font-size 56px
</style>
