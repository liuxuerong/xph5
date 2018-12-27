<template>
  <div class="commonTextarea">
    <textarea name="" id="" cols="cols" rows="rows" :placeholder="placeholder" v-model="currentValue"></textarea>
    <icon type="clear" @click.native="clear" v-if="clearShow"/>
  </div>
</template>
<script>
import { Icon } from 'vux'
import {
  Toast
} from 'mint-ui'
export default {
  name: 'CommonTextarea',
  props: {
    value: String,
    placeholder: String,
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 30
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  components: {
    Icon,
    Toast
  },
  created () {
    this.currentValue = this.value
  },
  data () {
    return {
      currentValue: '',
      clearShow: false
    }
  },
  mounted () {
    // this.value = this.vModel
    console.log(this.value)
  },
  watch: {
    value (val) {
      this.currentValue = val
      if (val.length) {
        this.clearShow = true
      }
    },
    currentValue (newVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
        Toast({
          message: `备注最多支持${this.max}字`,
          position: 'center',
          duration: 2000
        })
      }
      if (newVal.length) {
        this.clearShow = true
      } else {
        this.clearShow = false
      }
      this.$emit('input', this.currentValue)
    }
  },
  methods: {
    clear () {
      this.currentValue = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.commonTextarea >>> .weui-icon-clear
  padding-top 56px
.commonTextarea
  flex 1
  display flex
  vertical-align middle
  textarea
      height 148px
      line-height 70px
      padding 40px 50px 0
      flex 1
      color #333
      font-size 40px
      background-color #fff
      font-weight normal
textarea::-webkit-input-placeholder
  color #CCCCCC
  font-size 40px
textarea:-moz-placeholder
  color #CCCCCC
  font-size 40px
textarea::-moz-placeholder
  color #CCCCCC
  font-size 40px
textarea:-ms-input-placeholder
  color #CCCCCC
  font-size 40px
</style>
