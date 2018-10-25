<template>
<div>
 <div class="detailsImgTextDesc" v-html="desc" ref="detailsImgTextDesc" v-if="desc.length">
  </div>
</div>
</template>
<script>
export default {
  name: 'DetailsImgTextDesc',
  props: {
    desc: String
  }
}
</script>
<style lang="stylus">
  .detailsImgTextDesc
    width 100%
    img
      width 100%
</style>
