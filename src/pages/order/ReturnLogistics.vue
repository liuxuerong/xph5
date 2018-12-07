<template>
  <div class="logisticsWrapper">
    <search-title :title="title"></search-title>
    <div class="logisticsCon">
      <div class="logisticsNum">
        <input type="number" placeholder="在此填写物流单号" id="" v-model="logisticsNum">
      </div>
      <div class="logisticsTitle">请选择快递</div>
      <ul class="logisticsName">
        <li class="logisticsItem border-bottom" v-for="(item,index) in list" :key="item.id" @click="logisticsNameClick(index,item.name)">
          {{item.name}}
          <em class="checkboxInput" :class="{active:isActive === index}"></em>
        </li>
      </ul>
      <div class="logisticsSubmit" @click="logisticsSubmit">提交</div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import { logisticsCompany } from 'util/netApi'
import {Toast} from 'mint-ui'
import { http } from 'util/request'
import {storage} from 'util/storage'
import {retrunLogistics} from 'util/const.js'
export default {
  data () {
    return {
      title: '填写物流单号',
      list: [],
      isActive: Number,
      logisticsName: '',
      logisticsNum: ''
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    logisticsRender () {
      http(logisticsCompany).then((response) => {
        if (response.data.code === 0) {
          this.list = response.data.body
        }
      })
    },
    // 物流名称
    logisticsNameClick (index, name) {
      this.isActive = index
      this.logisticsName = name
    },
    // 物流确认
    logisticsSubmit () {
      let _this = this
      if (!this.logisticsNum) {
        Toast({
          message: '请填写物流单号',
          position: 'bottom',
          duration: 2000
        })
      } else if (!this.logisticsName) {
        Toast({
          message: '请选择物流',
          position: 'bottom',
          duration: 2000
        })
      } else {
        let params = {
          logisticsName: this.logisticsName,
          logisticsNum: this.logisticsNum
        }
        storage.setLocalStorage(retrunLogistics, params)
        _this.$router.back(-1)
      }
    }
  },
  mounted () {
    this.logisticsRender()
  }
}
</script>
<style lang="stylus">
  @import "~styles/mixins.styl";
  .logisticsWrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    padding-bottom 200px
    background #fff
  .logisticsCon
    width 100%
    .logisticsNum
      width 100%
      height 240px
      box-sizing border-box
      padding 50px
      input
        display block
        width 100%
        height 136px
        line-height 136px
        box-sizing border-box
        padding 0 40px
        font-size 46px
        color #262626
        background #f5f5f5
  .logisticsTitle
    width 100%
    height 170px
    line-height 170px
    box-sizing border-box
    padding 0 50px
    font-size 42px
    background #F5F5F5
    color #808080
  .logisticsName
    width 100%
    box-sizing border-box
    padding 0 50px
    .logisticsItem
      width 100%
      height 148px
      line-height 148px
      font-size 46px
      color #262626
  .logisticsSubmit
    width 100%
    height 148px
    line-height 148px
    position fixed
    bottom 0px
    font-size 46px
    color #BA825A
    text-align center
    background #F0F0F0
  .checkboxInput
    float right
    width 50px
    height 50px
    line-height 50px
    margin-top 42px
    bgImage('/static/icons/payUnchecked')
  .checkboxInput.active
    bgImage('/static/icons/paySelect')
</style>
