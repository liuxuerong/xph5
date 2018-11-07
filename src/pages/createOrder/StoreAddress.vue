<template>
  <div class="storeAddress">
    <common-nav-header :title="title" />
    <ul class="storeAddressWrap">
      <li class="border-bottom">
        <p class="name">深圳福田店</p>
        <p class="phone">电话：0755-8686856</p>
        <p class="address">广东省深圳市福田区国都高尔夫花园二期二层星品优汇科技有限 公司产品部
        </p>
      </li>
      <li class="border-bottom">
        <p class="name">深圳福田店</p>
        <p class="phone">电话：0755-8686856</p>
        <p class="address">广东省深圳市福田区国都高尔夫花园二期二层星品优汇科技有限 公司产品部
        </p>
      </li>
      <li class="border-bottom">
        <p class="name">深圳福田店</p>
        <p class="phone">电话：0755-8686856</p>
        <p class="address">广东省深圳市福田区国都高尔夫花园二期二层星品优汇科技有限 公司产品部
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  http
} from 'util/request'
import {
  storeAddr
} from 'util/netApi'
export default {
  name: 'StoreAddress',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      title: '选择地址'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    getAddress () {
      http(storeAddr).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getAddress()
  }
}
</script>

<style lang="stylus" scoped>
  .storeAddress
    height 100%
    padding-top 120px
  .storeAddressWrap
    color #262626
    font-size 36px
    line-height 50px
    li
      padding 60px 50px
    .name
      color #000000
      font-size 46px
      height 80px
      line-height 80px
      font-weight 600
    .phone
      padding 20px 0
    li:last-child:before
      display none

</style>
