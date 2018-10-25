<template>
  <div class="commonCollection">
  </div>
</template>

<script>
export default {
  name: 'CommonCollection',
  components: {},
  props: {
    collectionType: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
  mounted () {
    this.id = this.$route.params.id
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
