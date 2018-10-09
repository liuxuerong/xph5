<template>
  <div class="home">
    <CommonHeader/>
    <IndexHeader/>
  </div>
</template>
<script>
import CommonHeader from 'common/commonHeader/CommonHeader'
import IndexHeader from './components/IndexHeader'
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  components: {
    CommonHeader,
    IndexHeader
  }
}
</script>

<style lang="stylus" scoped>
div{
  font-size 80px
}
</style>
