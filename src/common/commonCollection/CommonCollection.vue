<template>
  <div class="commonCollection" :class="{active:collect}" @click.stop="doCollection(params)">
  </div>
</template>

<script>
import {
  hasCollection,
  doCollection
} from '@/func/collection'
import {
  Toast
} from 'mint-ui'
export default {
  name: 'CommonCollection',
  props: {
    collectionType: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      id: '',
      collect: false,
      params: null
    }
  },
  methods: {
    hasCollection (params) {
      let fnType = Object.prototype.toString.call(hasCollection(params)).slice(8, -1)
      if (fnType === 'Promise') {
        hasCollection(params).then(res => {
          this.collect = res.data.body
        }).catch(err => {
          console.log(err)
        })
      }
    },
    doCollection (params) {
      doCollection(params).then(res => {
        let message = this.collect ? '取消成功' : '收藏成功'
        Toast({
          message: message,
          position: 'top',
          duration: 1000
        })
        this.hasCollection(params)
      }).catch(err => {
        console.log(err)
      })
    }

  },
  created () {
    this.params = {
      collectionType: this.collectionType,
      collectionDataId: this.$route.params.id
    }
  },
  mounted () {
    this.hasCollection(this.params)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .commonCollection
    width 52px
    height 52px
    margin-top 20px
    bgImage("/static/icons/Collection_icon")
    &.active
      bgImage("/static/icons/Collection_icon_click")
</style>
