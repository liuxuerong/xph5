<template>
  <div class="searchHistory">
    <div class="title clearfix">
      <h2>历史搜索</h2>
      <div class="btn" @click="removeAllHistory">清空</div>
    </div>
    <ul>
      <li class="border-bottom" v-for="(item,index) in searchHistoryStorage" :key="index" @click="doSearch(item)">
        <div class="name fl">{{item}}</div>
        <div class="close fr" @click.stop="removeOneHistory(index)">
          ×
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import {searchHistory} from 'util/const'
// import {storage} from 'util/storage'
export default {
  name: 'SearchHistory',
  components: {},
  data () {
    return {

    }
  },
  props: {
    searchHistoryStorage: Array
  },
  computed: {

  },
  watch: {

  },
  methods: {

    removeOneHistory (index) {
      this.$emit('removeOneHistory', index)
    },
    removeAllHistory () {
      this.$emit('removeAllHistory')
    },
    doSearch (item) {
      this.$emit('doSearch', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .searchHistory
    width 100%
    padding 140px 50px
    .title
      h2
        font-size 56px
        font-weight 600
        float left
        line-height 80px
      .btn
        float right
        color #808080
        font-size 40px
        line-height 80px
    ul
      li
        line-height 182px
        height 182px
        position relative
        .name
          font-size 40px
          color #262626
        .close
          font-size 60px
          color #9d9d9d
</style>
