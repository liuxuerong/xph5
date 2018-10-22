<template>
  <div class="detailsPopUp">
    <mt-popup v-model="details.popupVisible" position="bottom">
      <span id="price">{{nowPrice}}</span>
      <div id="goodsinfo">
        <div class="num">
          <span class="sub fl">_</span>
          <input type="text" class="fl" value="1">
          <span class="add fr">+</span>
        </div>
        <div v-for="(item,index) in sku.keys" :key="index">
          <div class="tabContent">
            <div class="tabContentName">{{item.name}}</div>
            <input type="button" class="skuItem" @click="tabInfoChange(index,cindex,citem.id,$event)" v-for="(citem,cindex) in item.value" :class="{notClick:citem.notClick,active:citem.isActiveC}" :attr_id="citem.id" :value="citem.cname" :key="cindex" />
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {
  Popup
} from 'mint-ui'
import {
  mapState
} from 'vuex'
export default {
  name: 'DetailsPopUp',
  components: {
    'mt-popup': Popup
  },
  props: {
    sku: Object
  },
  data () {
    return {

      SKUResult: {},
      nowPrice: '--'
    }
  },
  computed: mapState({
    details: state => state.details
  }),
  watch: {},
  methods: {
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
      var keys = []
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          keys[keys.length] = key
        }
      }
      return keys
    },

    // 把组合的key放入结果集SKUResult
    add2SKUResult (combArrItem, sku) {
      var key = combArrItem.join(';')
      if (this.SKUResult[key]) {
        // SKU信息key属性·
        this.SKUResult[key].count += sku.count
        this.SKUResult[key].prices.push(sku.price)
      } else {
        this.SKUResult[key] = {
          count: sku.count,
          prices: [sku.price]
        }
      }
    },

    // 初始化得到结果集
    initSKU () {
      var i = this.getObjKeys(this.sku.data)
      var j = this.getObjKeys(this.sku.data)
      var skuKeys = this.getObjKeys(this.sku.data)
      for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i] // 一条SKU信息key
        var sku = this.sku.data[skuKey] // 一条SKU信息value
        var skuKeyAttrs = skuKey.split(';') // SKU信息key属性值数组
        skuKeyAttrs.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })

        // 对每个SKU信息key属性值进行拆分组合
        var combArr = this.combInArray(skuKeyAttrs)
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku)
        }

        // 结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(';')] = {
          count: sku.count,
          prices: [sku.price]
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

      var len = aData.length
      var aResult = []

      for (var n = 1; n < len; n++) {
        var aaFlags = this.getCombFlags(len, n)
        while (aaFlags.length) {
          var aFlag = aaFlags.shift()
          var aComb = []
          for (var i = 0; i < len; i++) {
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

      var aResult = []
      var aFlag = []
      var bNext = true
      var i, j, iCnt1

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
            var aTmp = aFlag.concat()
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
            haveChangedId.push(this.sku.keys[i].value[j].id)
          }
        }
      }
      if (haveChangedId.length) {
        // 获得组合key价格
        haveChangedId.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })
        var len = haveChangedId.length
        var prices = this.SKUResult[haveChangedId.join(';')].prices
        var maxPrice = Math.max.apply(Math, prices)
        var minPrice = Math.min.apply(Math, prices)
        this.nowPrice =
            maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice /* 筛选价格 */

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
          var indexs = daiceshiId.indexOf(haveChangedId[i])
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
        // 设置默认价格
        this.nowPrice = '--'
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
    console.log(this.sku)
  }
}
</script>

<style lang="stylus" scoped>
#goodsinfo
  padding 50px
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
</style>
<style lang="stylus">
  .mint-popup
    height 1572px
    width 100%
</style>
