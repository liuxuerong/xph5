<template>
  <div class="xpSearch">
    <div class="xpSearchTop border-bottom " :class="{active:hasSearch}">
      <div class="back" @click="goBack" v-show="hasSearch"></div>
      <div class="search">
        <form action="javascript:return true;">
        <input type="search" placeholder="搜索" v-model.trim="searchVal" @keyup.13="getSearchVal" autofocus="true">
        </form>
        <div class="icon glass" v-show="!hasSearch" @click="getSearchVal"></div>
        <div class="icon close" v-show="hasSearch" @click="emptySearchVal">×</div>
      </div>
      <div class="cancel" v-show="!hasSearch" @click="emptySearchVal">取消</div>
    </div>
   <div class="mainSearch" ref="mainSearch">
        <search-history :searchHistoryStorage = "searchHistoryStorage" v-if="searchHistoryStorage.length&&!hasSearch" @removeOneHistory="removeOneHistory" @removeAllHistory="removeAllHistory" @doSearch="doSearch"/>
        <SearchItem :searchHistoryStorage="searchHistoryStorage" :searchVal="searchVal"  v-if="hasSearch"/>
   </div>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchItem from './components/SearchItem'
import {searchHistory} from 'util/const'
import {storage} from 'util/storage'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchItem
  },
  data () {
    return {
      hasSearch: false,
      searchVal: '',
      searchHistoryStorage: []
    }
  },
  props: {
    searchName: {
      type: String,
      default: ''
    }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },

    // 获取input的value
    getSearchVal () {
      this.hasSearch = true
      this.saveSearchHistory()
    },
    // 重新输入
    emptySearchVal () {
      this.searchVal = ''
      this.hasSearch = false
      this.$router.back(-1)
    },
    saveSearchHistory () {
      this.searchHistoryStorage = storage.getLocalStorageLong(searchHistory)
      this.searchHistoryStorage = this.searchHistoryStorage || []
      let index = ''
      if (this.searchVal.trim() !== '') {
        for (let i = 0; i < this.searchHistoryStorage.length; i++) {
          if (this.searchVal === this.searchHistoryStorage[i]) {
            index = i
            this.searchHistoryStorage.splice(index, 1)
          }
        }
        this.searchHistoryStorage.push(this.searchVal)
        storage.setLocalStorage(searchHistory, this.searchHistoryStorage)
      }
    },
    removeOneHistory (index) {
      this.searchHistoryStorage.splice(index, 1)
      storage.setLocalStorage(searchHistory, this.searchHistoryStorage)
    },
    removeAllHistory () {
      this.searchHistoryStorage = []
      storage.setLocalStorage(searchHistory, this.searchHistoryStorage)
    },
    doSearch (item) {
      this.hasSearch = true
      let index = ''
      for (let i = 0; i < this.searchHistoryStorage.length; i++) {
        if (item === this.searchHistoryStorage[i]) {
          index = i
          this.searchHistoryStorage.splice(index, 1)
          this.searchHistoryStorage.push(item)
          storage.setLocalStorage(searchHistory, this.searchHistoryStorage)
          break
        }
      }
    }
  },
  created () {
    this.saveSearchHistory()
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.xpSearch
  width 100%
  height 100%
  padding-top 120px
.mainSearch
  height calc(100%)
  background #fff
.xpSearchTop
  width 100%
  display flex
  padding 10px 50px 20px
  position fixed
  top 0
  background-color #fff
  z-index 999999
  .search
    flex 1
    height 100px
    line-height 100px
    font-size 46px
    color #4D4D4D
    position relative
    form
      height 100%
    input
      height 100%
      background-color #F5F5F5
      width 100%
      padding-right 106px
      padding-left 30px
      font-size 40px
    input::-webkit-input-placeholder
      color #4D4D4D
      font-size 40px
    input:-moz-placeholder
      color #4D4D4D
      font-size 40px
    input::-moz-placeholder
      color #4D4D4D
      font-size 40px
    input:-ms-input-placeholder
      color #4D4D4D
      font-size 40px
    .icon
      position absolute
    .glass
      width 80px
      height 80px
      bgImage("/static/icons/serch_icon")
      top 14px
      right 50px
    .close
      color #9D9D9D
      font-size 60px
      top 0
      right 20px
  .cancel
    width 130px
    text-align right
    height 100px
    line-height 100px
    font-size 40px
    color #808080
  .back
    padding-right 30px
    width 40px
    height 40px
    border-left 4px solid #262626
    border-top 4px solid #262626
    transform rotate(-45deg) translate(-45px)
.xpSearchTop.active
  padding-left 70px
input::-webkit-search-decoration,
input::-webkit-search-cancel-button
  display none

</style>
