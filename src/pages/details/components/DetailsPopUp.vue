<template>
  <div class="detailsPopUp">
    <mt-popup v-model="details.popupVisible" position="bottom" @touchmove.prevent>
      <DetailsImgPrice :goods="goods" />
      <div class="cutOffLine"></div>
      <div id="goodsinfo">
        <div class="num">
          <span class="sub fl" @click="subCount">_</span>
          <input type="text" class="fl" v-model="cartCount">
          <span class="add fr" @click="addCount">+</span>
        </div>
        <div ref="tabWrap">
          <div class="tabContent" v-for="(item,index) in sku.keys" :key="index">
            <div class="tabContentName">{{item.name}}</div>
            <input type="button" class="skuItem" @click="tabInfoChange(index,cindex,citem.id,$event)" v-for="(citem,cindex) in item.value" :class="{notClick:citem.notClick,active:citem.isActiveC}" :attr_id="citem.id" :value="citem.cname" :key="cindex" />
          </div>
        </div>
      </div>
      <div class="goodsInfoBottm border-top" v-if="from==1">
        <router-link class="buy" to="/">立即购买</router-link>
        <span class="addCart" @click="addCart()">
              加入购物车
            </span>
      </div>
      <div class="goodsInfoBottm border-top" v-else>
        <div class="addSure" @click="addCart()">确认加入</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {
  Popup,
  Toast
} from 'mint-ui'
import {
  mapState,
  mapMutations
} from 'vuex'
import {
  addCart
} from 'util/netApi'
import {
  http
} from 'util/request'
import DetailsImgPrice from './DetailsImgPrice'
export default {
  name: 'DetailsPopUp',
  components: {
    'mt-popup': Popup,
    DetailsImgPrice
  },
  props: {
    sku: Object,
    goods: Object
  },
  data () {
    return {
      SKUResult: {},
      cartCount: 1,
      type: 1,
      goodsItemsId: '',
      coverImage: ''
    }
  },
  computed: mapState({
    details: state => state.details,
    maxCount: state => state.details.maxCount,
    from: state => state.cart.from
  }),
  methods: {
    ...mapMutations(['changeNowPrice', 'changeMaxCount']),
    addCount () {
      this.cartCount++
      if (this.cartCount > this.maxCount) {
        this.cartCount = this.maxCount
      }
    },

    subCount () {
      this.cartCount--
      if (this.cartCount < 2) {
        this.cartCount = 1
      }
    },
    //     getCartNum () {
    //   http(cartNum).then(res => {
    //     console.log(res)
    //     this.changeCartNum(res.data.body)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    addCart () {
      const tabWrapChild = this.$refs.tabWrap.childNodes
      let allFlag = true
      for (let i = 0; i < tabWrapChild.length; i++) {
        let input = this.children(tabWrapChild[i], 'input')
        let flag = false
        for (let j = 0; j < input.length; j++) {
          if (input[j].classList.contains('active')) {
            flag = true
            break
          }
        }
        if (!flag) {
          allFlag = false
          break
        }
      }
      if (!allFlag) {
        Toast({
          message: '请选择商品属性',
          position: 'bottom',
          duration: 500
        })
      } else {
        if (!tabWrapChild.length) {
          this.goodsItemsId = this.sku.data[''].goodsItemsId
        }
        const params = {
          goodsItemId: this.goodsItemsId,
          num: this.cartCount
        }
        http(addCart, params).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: '添加购物车成功',
              position: 'bottom',
              duration: 500
            })
          // this.getCartNum()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    children (curEle, tagName) {
      let nodeList = curEle.childNodes
      let ary = []
      if (/MSIE(6|7|8)/.test(navigator.userAgent)) {
        for (let i = 0; i < nodeList.length; i++) {
          let curNode = nodeList[i]
          if (curNode.nodeType === 1) {
            ary[ary.length] = curNode
          }
        }
      } else {
        ary = Array.prototype.slice.call(curEle.children)
      }

      // 获取指定子元素
      if (typeof tagName === 'string') {
        for (let k = 0; k < ary.length; k++) {
          let curTag = ary[k]
          if (curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
            ary.splice(k, 1)
            k--
          }
        }
      }

      return ary
    },
    /* 商品详情数据 */
    queryDGoodsById () {
      this.initSKU() // 初始化，得到SKUResult
      /* 根据SKUResult得到初始化的时候哪些不能点击 */
      for (let i = 0; i < this.sku.keys.length; i++) {
        for (let j = 0; j < this.sku.keys[i].value.length; j++) {
          if (this.SKUResult[this.sku.keys[i].value[j].id] == null) {
            this.sku.keys[i].value[j].notClick = true
          }
        }
      }
    },
    // 获得对象的key
    getObjKeys (obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object')
      let keys = []
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          keys[keys.length] = key
        }
      }
      return keys
    },

    // 把组合的key放入结果集SKUResult
    add2SKUResult (combArrItem, sku) {
      let key = combArrItem.join(';')
      if (this.SKUResult[key]) {
        // SKU信息key属性·
        this.SKUResult[key].count += sku.count
        this.SKUResult[key].prices.push(sku.price)
        this.SKUResult[key].goodsItemsId = sku.goodsItemsId
      } else {
        this.SKUResult[key] = {
          count: sku.count,
          prices: [sku.price],
          goodsItemsId: sku.goodsItemsId
        }
      }
    },

    // 初始化得到结果集
    initSKU () {
      let i = this.getObjKeys(this.sku.data)
      let j = this.getObjKeys(this.sku.data)
      let skuKeys = this.getObjKeys(this.sku.data)
      for (i = 0; i < skuKeys.length; i++) {
        let skuKey = skuKeys[i] // 一条SKU信息key
        let sku = this.sku.data[skuKey] // 一条SKU信息value
        let skuKeyAttrs = skuKey.split(';') // SKU信息key属性值数组
        skuKeyAttrs.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })

        // 对每个SKU信息key属性值进行拆分组合
        let combArr = this.combInArray(skuKeyAttrs)
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku)
        }

        // 结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(';')] = {
          count: sku.count,
          prices: [sku.price],
          goodsItemsId: sku.goodsItemsId
        }
      }
    },

    /**
       * 从数组中生成指定长度的组合
       * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
       */
    combInArray (aData) {
      if (!aData || !aData.length) {
        return []
      }

      let len = aData.length
      let aResult = []

      for (let n = 1; n < len; n++) {
        let aaFlags = this.getCombFlags(len, n)
        while (aaFlags.length) {
          let aFlag = aaFlags.shift()
          let aComb = []
          for (let i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i])
          }
          aResult.push(aComb)
        }
      }

      return aResult
    },

    /**
       * 得到从 m 元素中取 n 元素的所有组合
       * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
       */
    getCombFlags (m, n) {
      if (!n || n < 1) {
        return []
      }

      let aResult = []
      let aFlag = []
      let bNext = true
      let i, j, iCnt1

      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0
      }

      aResult.push(aFlag.concat())

      while (bNext) {
        iCnt1 = 0
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] === 1 && aFlag[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0
            }
            aFlag[i] = 0
            aFlag[i + 1] = 1
            let aTmp = aFlag.concat()
            aResult.push(aTmp)
            if (
              aTmp
                .slice(-n)
                .join('')
                .indexOf('0') === -1
            ) {
              bNext = false
            }
            break
          }
          aFlag[i] === 1 && iCnt1++
        }
      }
      return aResult
    },
    /* 商品条件筛选 */
    tabInfoChange (index, cindex, cid, e) {
      // let orderInfo = this.keys /* 所有规格 */
      let orderInfoChild = this.sku.keys[index]
        .value /* 当前点击的规格的所有子属性内容 */
        // 选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick !== true) {
        if (orderInfoChild[cindex].isActiveC === true) {
          orderInfoChild[cindex].isActiveC = false
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false
          }
          orderInfoChild[cindex].isActiveC = true
        }
      }

      // 已经选择的节点
      let haveChangedId = []
      for (let i = 0; i < this.sku.keys.length; i++) {
        for (let j = 0; j < this.sku.keys[i].value.length; j++) {
          if (this.sku.keys[i].value[j].isActiveC === true) {
            if (this.sku.keys[i].value[j].pic !== '') {
              this.goods.coverImage = this.sku.keys[i].value[j].pic
            } else {
              this.goods.coverImage = this.coverImage
            }
            haveChangedId.push(this.sku.keys[i].value[j].id)
          }
        }
      }

      if (haveChangedId.length) {
        // 获得组合key价格及数量
        haveChangedId.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })
        let len = haveChangedId.length
        var prices = this.SKUResult[haveChangedId.join(';')].prices
        const nowCount = this.SKUResult[haveChangedId.join(';')].count
        this.goodsItemsId = this.SKUResult[haveChangedId.join(';')].goodsItemsId

        this.changeMaxCount(nowCount)
        if (this.cartCount > nowCount) {
          this.cartCount = nowCount
        }
        var maxPrice = Math.max.apply(Math, prices)
        var minPrice = Math.min.apply(Math, prices)
        this.changeNowPrice(maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice)
        // this.nowPrice =
        //     maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice /* 筛选价格 */

        // 用已选中的节点验证待测试节点
        let daiceshi = [] // 待测试节点
        let daiceshiId = []
        for (let i = 0; i < this.sku.keys.length; i++) {
          for (let j = 0; j < this.sku.keys[i].value.length; j++) {
            if (
              this.sku.keys[index].value[cindex].id !== this.sku.keys[i].value[j].id
            ) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.sku.keys[i].value[j].id
              })
              daiceshiId.push(this.sku.keys[i].value[j].id)
            }
          }
        }
        for (let i = 0; i < haveChangedId.length; i++) {
          let indexs = daiceshiId.indexOf(haveChangedId[i])
          if (indexs > -1) {
            daiceshi.splice(indexs, 1)
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = [] // 从选中节点中去掉选中的兄弟节点
          let siblingsId = ''
          for (let m = 0; m < this.sku.keys[daiceshi[i].index].value.length; m++) {
            if (this.sku.keys[daiceshi[i].index].value[m].isActiveC === true) {
              siblingsId = this.sku.keys[daiceshi[i].index].value[m].id
            }
          }
          if (siblingsId !== '') {
            for (let j = 0; j < len; j++) {
              haveChangedId[j] !== siblingsId &&
                  testAttrIds.push(haveChangedId[j])
            }
          } else {
            testAttrIds = haveChangedId.concat()
          }
          testAttrIds = testAttrIds.concat(
            this.sku.keys[daiceshi[i].index].value[daiceshi[i].cindex].id
          )
          testAttrIds.sort(function (value1, value2) {
            return parseInt(value1) - parseInt(value2)
          })
          if (!this.SKUResult[testAttrIds.join(';')]) {
            this.sku.keys[daiceshi[i].index].value[daiceshi[i].cindex].notClick = true
            this.sku.keys[daiceshi[i].index].value[daiceshi[i].cindex].isActiveC = false
          } else {
            this.sku.keys[daiceshi[i].index].value[daiceshi[i].cindex].notClick = false
          }
        }
      } else {
        // 设置属性状态
        for (let i = 0; i < this.sku.keys.length; i++) {
          for (let j = 0; j < this.sku.keys[i].value.length; j++) {
            if (this.SKUResult[this.sku.keys[i].value[j].id]) {
              this.sku.keys[i].value[j].notClick = false
            } else {
              this.sku.keys[i].value[j].notClick = true
              this.sku.keys[i].value[j].isActiveC = false
            }
          }
        }
      }
    }
  },
  created () {
    this.queryDGoodsById()
  },
  mounted () {
    this.coverImage = this.goods.coverImage
  }
}
</script>

<style lang="stylus" scoped>
#goodsinfo
  padding 50px 50px 145px 50px
  box-sizing border-box
  overflow-y scroll
  .num
    height 100px
    line-height 100px
    width 400px
    color #262626
    font-size 46px
    border 1px solid #CCCCCC
    margin-bottom 100px
    span
      display inline-block
      width 100px
      height 100px
      line-height 100px
      font-size 80px
      text-align center
    .sub
      margin-top -36px
    .add
      margin-top 6px
    input
      width 196px
      border-left 1px solid #CCCCCC
      border-right 1px solid #CCCCCC
      height 94px
      margin-top 2px
      outline none
      text-align center
.tabContentName
  color #262626
  font-size 40px
  height 135px
  line-height 135px
  font-weight 300
.skuItem
  background none
  outline none
  border 1px solid #CCCCCC
  padding 2px 50px
  margin-right 50px
  height 120px
  line-height 120px
  margin-bottom 50px
  color #262626
  font-size 40px
.skuItem.active
  border 4px solid #BA825A
.skuItem.notClick
  border 1px dotted #CCCCCC
  color #CCCCCC
.goodsInfoBottm
  height 145px
  display flex
  font-size 46px
  position absolute
  bottom 0
  width 100%
  z-index 99999
  .buy
    display inline-block
    flex 1
    text-align center
    line-height 145px
    height 145px
    color #BA825A
    vertical-align top
  .addCart
    flex 1
    display inline-block
    text-align center
    line-height 145px
    height 145px
    color #BA825A
    background-color #F0F0F0
.goodsInfoBottm
  .addSure
    width 100%
    height 145px
    line-height 145px
    background-color #F0F0F0
    text-align center
    color #BA825A
    font-size 46px
</style>

<style lang="stylus">
.detailsPopUp
  .mint-popup
    width 100%
    height 1528px
</style>
