<template>
  <span class="sexPopItem border-bottom" @click="sexSetChange">{{content}}</span>
</template>
<script>
export default {
  props: ['content', 'index'],
  data () {
    return {
      sex: Number,
      popupVisible: true
    }
  },
  methods: {
    sexSetChange () {
      this.sex = this.index + 1
      this.popupVisible = false
      this.$emit('sendValueToParent', this.sex, this.content, this.popupVisible, true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sexPopItem
    display block
    width 100%
    height 148px
    line-height 148px
    text-align center
    font-size 46px
    color #262626
</style>
