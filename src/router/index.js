import Vue from 'vue'
import Router from 'vue-router'
import { accessToken } from 'util/const'
import { storage } from 'util/storage'

// meta: { requireLogin: true }
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/hall',
      component: resolve => require(['@/pages/Index'], resolve),
      children: [
        {name: 'Find', path: '/find', component: resolve => require(['@/pages/find/Find'], resolve)},
        {name: 'Classify', path: '/classify', component: resolve => require(['@/pages/classify/Classify'], resolve)},
        {name: 'Hall', path: '/hall', component: resolve => require(['@/pages/hall/Hall'], resolve)},
        {name: 'Story', path: '/story', component: resolve => require(['@/pages/story/Story'], resolve)},
        {name: 'PersonCenter', path: '/personCenter', meta: { requireLogin: true }, component: resolve => require(['@/pages/person/PersonCenter'], resolve)}
      ]
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: resolve => require(['@/pages/hotel/Hotel'], resolve)
    },
    {
      path: '/hallDetails/:index',
      name: 'HallDetails',
      component: resolve => require(['@/pages/hall/HallDetails'], resolve)
    },
    {
      path: '/hallAtlas/:index',
      name: 'HallAtlas',
      component: resolve => require(['@/pages/hall/HallAtlas'], resolve)
    },
    {
      path: '/details/:goodsId',
      name: 'Details',
      component: resolve => require(['@/pages/details/Details'], resolve)
    },
    {
      path: '/hotGoods',
      name: 'HotGoods',
      component: resolve => require(['@/pages/hotGoods/HotGoods'], resolve)
    },
    {
      path: '/comment/:goodsId',
      name: 'Comment',
      component: resolve => require(['@/pages/comment/Comment'], resolve)
    },
    {
      path: '/brandDetails/:id',
      name: 'BrandDetails',
      component: resolve => require(['@/pages/brandDetails/BrandDetails'], resolve)
    },
    {
      path: '/storyDetails/:id',
      name: 'StoryDetails',
      component: resolve => require(['@/pages/storyDetails/StoryDetails'], resolve)
    },
    {
      path: '/hotelDetails/:id',
      name: 'HotelDetails',
      component: resolve => require(['@/pages/storyDetails/HotelDetails'], resolve)
    },
    {
      path: '/goods/:index/:innerIndex',
      name: 'Goods',
      component: resolve => require(['@/pages/goods/Goods'], resolve)
    },
    {
      path: '/createOrder/:info?', // 创建订单
      name: 'CreateOrder',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/createOrder/CreateOrder'], resolve)
    },
    {
      path: '/sendWay',
      name: 'SendWay',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/createOrder/SendWay'], resolve)
    },
    {
      path: '/storeAddress',
      name: 'StoreAddress',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/createOrder/StoreAddress'], resolve)
    },
    {
      path: '/invoiceApply/:info?', // 申请开票
      name: 'InvoiceApply',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/invoice/InvoiceApply'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['@/pages/search/Search'], resolve)
    },
    {
      path: '/invoice',
      name: 'Invoice',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/invoice/Invoice'], resolve)
    },
    {
      path: '/idCodeExplain',
      name: 'IdCodeExplain',
      component: resolve => require(['@/pages/invoice/IdCodeExplain'], resolve)
    },
    {
      path: '/invoiceInfo/:invoiceType/:invoiceStatus/:from', // from 1设置页面 2创建订单3.申请开票
      name: 'invoiceInfo',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/invoice/InvoiceInfo'], resolve)
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: resolve => require(['@/pages/invoice/Instructions'], resolve)
    },
    {
      path: '/cart/:flag?',
      name: 'Cart',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/cart/Cart'], resolve)
    },
    {
      path: '/collect/:index',
      name: 'Collect',
      // meta: { requireLogin: true },
      component: resolve => require(['@/pages/collect/Collect'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/login/PhoneCode'], resolve)
    },
    {
      path: '/phoneCode',
      name: 'phoneCode',
      component: resolve => require(['@/pages/login/Login'], resolve)
    },
    {
      path: '/remberPassword',
      name: 'remberPassword',
      component: resolve => require(['@/pages/login/RemberPassword'], resolve)
    },
    {
      path: '/userName',
      name: 'userName',
      component: resolve => require(['@/pages/login/UserName'], resolve)
    },
    {
      path: '/userPassword/:type',
      name: 'userPassword',
      component: resolve => require(['@/pages/login/UserPassword'], resolve)
    },
    {
      path: '/userInfoSet/:type?',
      name: 'userInfoSet',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/UserDataSet'], resolve)
    },
    {
      path: '/goodsAddress/:type/:id?',
      name: 'goodsAddress',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/GoodsAddress'], resolve)
    },
    {
      path: '/addressAdmin/:need?',
      name: 'addressAdmin',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/AddressAdmin'], resolve)
    },
    {
      path: '/toolCenter',
      name: 'toolCenter',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/ToolCenter'], resolve)
    },
    {
      path: '/aboutMember',
      name: 'aboutMember',
      component: resolve => require(['@/pages/person/AboutMember'], resolve)
    }, {
      path: '/orderIndex',
      name: 'orderIndex',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/OrderIndex'], resolve)
    },
    {
      path: '/orderList1/:type',
      name: 'orderList1',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/OrderList'], resolve)
    },
    {
      path: '/orderList',
      name: 'orderList',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/orderM/OrderList'], resolve),
      children: [
        {name: 'orderListStatus', path: ':status', component: resolve => require(['@/pages/orderM/OrderListStatus'], resolve)}
      ]
    },
    {
      path: '/orderDetails1/:type/:orderCode',
      name: 'orderDetails1',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/OrderDetails'], resolve)
    },
    {
      path: '/orderDetails/:orderSn',
      name: 'orderDetails',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/orderM/OrderDetails'], resolve)
    },
    {
      path: '/immedPayment/:orderCode',
      name: 'immedPayment',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ImmedPayment'], resolve)
      // meta: {
      //   isKeepAlive: false
      // }
    },
    {
      path: '/afterSaleOrder/:type/:orderId',
      name: 'afterSaleOrder',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/AfterSaleOrder'], resolve)
    },
    {
      path: '/applyRefund/:type/:orderId',
      name: 'applyRefund',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ApplyRefund'], resolve)
    },
    {
      path: '/immedEvaluate/:orderCode',
      name: 'immedEvaluate',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ImmedEvaluate'], resolve)
    },
    {
      path: '/softwareSeting',
      name: 'softwareSeting',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/SoftwareSeting'], resolve)
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: resolve => require(['@/pages/person/Agreement'], resolve)
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/FeedBack'], resolve)
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/AboutUs'], resolve)
    },
    {
      path: '/memberCode',
      name: 'memberCode',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/MemberCode'], resolve)
    },
    {
      path: '/integralDetails',
      name: 'integralDetails',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/IntegralDetails'], resolve)
    },
    {
      path: '/integralRule',
      name: 'integralRule',
      component: resolve => require(['@/pages/person/IntegralRule'], resolve)
    },
    {
      path: '/cardVoucher',
      name: 'cardVoucher',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/CardVoucher'], resolve)
    },
    {
      path: '/cardDetails/:type/:mainType/:id',
      name: 'cardDetails',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/CardDetails'], resolve)
    },
    {
      path: '/chooseCoupons/:type',
      name: 'chooseCoupons',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/createOrder/ChooseCoupons'], resolve)
    },
    {
      path: '/toolStore',
      name: 'toolStore',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/person/ToolStore'], resolve)
    },
    {
      path: '/watchLogistics/:orderSn',
      name: 'watchLogistics',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/WatchLogistics'], resolve)
    },
    {
      path: '/appDownload',
      name: 'appDownload',
      component: resolve => require(['@/pages/download/AppDownload'], resolve)
    },
    {
      path: '/returnGoods/:orderId',
      name: 'returnGoods',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ReturnGoods'], resolve)
    },
    {
      path: '/accountSecurity',
      name: 'accountSecurity',
      component: resolve => require(['@/pages/person/AccountSecurity'], resolve)
    },
    {
      path: '/userPhonecode/:type',
      name: 'userPhonecode',
      component: resolve => require(['@/pages/person/userSetup/UserPhonecode'], resolve)
    },
    {
      path: '/searchOrder',
      name: 'searchOrder',
      component: resolve => require(['@/pages/order/SearchOrder'], resolve)
    },
    {
      path: '/paymentSucc',
      name: 'paymentSucc',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/PaymentSucc'], resolve)
    },
    // ActivitysList
    {
      path: '/activitysList',
      name: 'activitysList',
      component: resolve => require(['@/pages/activitys/ActivitysList'], resolve)
    },
    {
      path: '/returnGoodsMoney/:type/:orderId',
      name: 'returnGoodsMoney',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ReturnGoodsMoney'], resolve)
    },
    {
      path: '/returnLogistics1',
      name: 'returnLogistics1',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/order/ReturnLogistics1'], resolve)
    },
    {
      path: '/touristToolCenter',
      name: 'touristToolCenter',
      component: resolve => require(['@/pages/person/TouristToolCenter'], resolve)
    },
    {
      path: '/userNamePer',
      name: 'userNamePer',
      component: resolve => require(['@/pages/person/UserNamePer'], resolve)
    },
    {
      path: '/activitiesInterest',
      name: 'activitiesInterest',
      component: resolve => require(['@/pages/activitys/ActivitiesInterest'], resolve)
    },
    {
      path: '/classfiyGoods/:classfiyId',
      name: 'classfiyGoods',
      component: resolve => require(['@/pages/activitys/ClassfiyGoods'], resolve)
    },

    // 售后
    {
      path: '/afterSaleSelect/:orderStatus/:orderItemId', //  orderStatus:// 2: 待发货// 3: 待收货// 5: 交易成功
      name: 'AfterSaleSelect', // 选择售后类型
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/AfterSaleSelect'], resolve)
    },
    {
      path: '/applyAfterSales/:orderStatus/:orderItemId/:type', //  orderStatus:主订单状态 orderItemId:子订单编号 type:服务类型; 1=仅退款 2=退货退款 3=维修
      name: 'ApplyAfterSales', // 会员申请售后
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/ApplyAfterSales'], resolve)
    },
    {
      path: '/modifyAfterSales',
      name: 'ModifyAfterSales', // 会员修改售后
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/ModifyAfterSales'], resolve)
    },
    {
      path: '/afterSaleList',
      name: 'AfterSaleList', // 售后列表
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/AfterSaleList'], resolve)
    },
    {
      path: '/record/:saleSn',
      name: 'Record', // 操作记录
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/Record'], resolve)
    },

    {
      path: '/returnLogistics/:saleSn',
      name: 'ReturnLogistics', // 填写物流信息
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/ReturnLogistics'], resolve)
    },
    {
      path: '/appeal/:saleSn',
      name: 'Appeal', // 申诉
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/Appeal'], resolve)
    },
    {
      path: '/afterEvaluation/:saleSn',
      name: 'AfterEvaluation', // 售后评价
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/AfterEvaluation'], resolve)
    },
    {
      path: '/afterSaleDetails/:saleSn',
      name: 'AfterSaleDetails', // 售后详情
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/afterSale/AfterSaleDetails'], resolve)
    },
    {
      path: '/activityTemps/:id',
      name: 'ActivityTemps', // 活动
      component: resolve => require(['@/pages/activityTemps/ActivityTemps'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (!storage.getLocalStorage(accessToken)) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
