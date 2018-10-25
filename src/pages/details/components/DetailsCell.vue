<template>
  <div class="detailsCell">
    <mt-cell :title="cellInfo.title" :value="cellInfo.value" is-link >
    </mt-cell>
  </div>
</template>

<script>
import {
  Cell
} from 'mint-ui'
export default {
  name: 'DetailsCell',
  props: {
    cellInfo: Object
  },
  components: {
    'mt-cell': Cell
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="stylus">
  .detailsCell
    height 146px
    padding 0 50px
    .mint-cell
      height 100%
    .mint-cell-wrapper
      height 100%
    .mint-cell-title
      flex none
      -webkit-box-flex none
      margin-right 160px
    .mint-cell-text
      display inline-block
      height 146px
      line-height 146px
      font-size 40px
      font-weight 600
    .mint-cell-value
      color #808080
      font-size 40px
      font-weight 600
    .mint-cell-allow-right::after
      border-color #808080
      width: 0.22444rem;
      height: 0.22444rem;
    .mint-cell-mask:active::after
      opacity 0
</style>
