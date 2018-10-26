<template>
  <div class="hallDetails">
    <!-- <div v-transfer-dom> -->
<div>
  <h2 style="z-index:9999999999999999">4.54564453</h2>
  <previewer :list="list" :options="options" ref="previewer" v-if="list.length" @on-close="show">
<h1>  1531435435453</h1>
</previewer>
</div>
  <!-- </div> -->
  </div>
</template>
<script>
import { Previewer } from 'vux'
import {
  config
} from 'util/config.js'
import {
  experience
} from 'util/const.js'
import {
  storage
} from 'util/storage.js'
export default {
  name: 'HallDetails',
  components: {
    Previewer
  },
  directives: {
    // TransferDom
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      experience: null,
      list: [],
      options: {
        tapToToggleControls: false,
        isClickableElement: function (el) {
          console.log(document.getElementsByClassName('pswp'))
          document.getElementsByClassName('pswp')[0].setAttribute('style', 'display:block !important')
          // this.$refs.previewer.show(0)
        }
      }
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
    show () {
      console.log(document.getElementsByClassName('pswp')[0])
      this.$refs.previewer.show(0)
      // document.getElementsByClassName('pswp')[0].style.display = 'block'
    }
  },
  created () {
    this.experience = storage.getLocalStorage(experience)
    console.log(this.$route)
    console.log(this.experience)
    const index = this.$route.params.index
    const picture = this.imageUrl + this.experience[index].experienceCoverImage
    this.list.push({'msrc': picture, 'src': picture})
  },
  mounted () {
    // console.log(this.$refs.previewer)
    this.$refs.previewer.show(0)
  }
}
</script>
<style lang="stylus" scoped>
// .previewer-delete-icon-box

</style>
<style lang="stylus">
.hallDetails
  .pswp
    // display block !important
  .pswp__bg
    background-color #fff
  .pswp__top-bar
    // display none
</style>
