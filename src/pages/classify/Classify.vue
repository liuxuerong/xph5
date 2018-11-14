<template>
  <div class="xpClassify">
    <common-header :isScan="false"></common-header>
    <div class="xpClassifyWrap">
      <ul class="xpClassifyWrapUl">
        <li class="xpClassifyWrapli" v-for="(item,index) in classfiyData" :key="index" :item="item">
          <div class="top" @click="changeToggle(index)">
            <div class="name">
              <p class="title">家具</p>
              <p class="subTitle">Furniture</p>
            </div>
            <img src="/static/images/appLogo@3x.png" alt="">
          </div>
            <ul class="classifyDetails" :class="{active:showIndex==index}">
              <li class="border-bottom">
                <router-link to="/goods" class="nav">沙发</router-link>
              </li>
              <li class="border-bottom">
                <router-link to="/goods" class="nav">沙发</router-link>
              </li>
              <li class="border-bottom">
                <router-link to="/goods" class="nav">沙发</router-link>
              </li>
              <li class="border-bottom">
                <router-link to="/goods" class="nav">沙发</router-link>
              </li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'common/commonHeader/CommonHeader'
export default {
  name: 'Classify',
  components: {
    CommonHeader
  },
  data () {
    return {
      showIndex: null,
      classfiyData: [{

      }, {}]
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    changeToggle (index) {
      this.showIndex = index
    }
  }
}
</script>

<style lang="stylus" scoped>
  .xpClassify
    padding-top 160px
    height 100%
    .xpClassifyWrap
      padding 0 50px
    .xpClassifyWrapli
      width 100%
      margin-bottom 60px
      .top
        width 100%
        height 300px
        background-color #F5F5F5
        display flex
        align-items center
        justify-content space-around
        img
          width 260px
          height 260px
        .name
          min-width 260px
          text-align center
          .title
            color #333333
            font-size 56px
            line-height 80px
          .subTitle
            color #999999
            font-size 46px
            line-height 60px
    .xpClassifyWrapli:nth-child(2n)
      .top
        flex-direction row-reverse
  .classifyDetails
    transform scale(1,0)
    overflow hidden
    height 0
    transform-origin 0 0
    li
      line-height 148px
      font-size 46px
      width 100%
      .nav
        color #333
        width 100%
        position relative
        display inline-block
      .nav:before
        border: solid 0.017778rem #B3B3B3;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 0.177778rem;
        position: absolute;
        transform: translateY(-50%) rotate(45deg);
        width: 0.22444rem;
        height: 0.22444rem;

  .classifyDetails.active
    height 100%
    transform scale(1,1)
    animation: toggle 0.2s;
   @keyframes toggle {
     0% {
       transform scale(1,0)
       opacity 0
     }
     100%{
       transform scale(1,1)
       opacity 1
     }
   }
    </style>
