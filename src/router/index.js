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
        {name: 'PersonCenter', path: '/personCenter', component: resolve => require(['@/pages/person/PersonCenter'], resolve)}
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
      path: '/goods',
      name: 'Goods',
      component: resolve => require(['@/pages/goods/Goods'], resolve)
    },
    {
      path: '/createOrder/:info?',
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
      path: '/instructions',
      name: 'Instructions',
      component: resolve => require(['@/pages/invoice/Instructions'], resolve)
    },
    {
      path: '/cart',
      name: 'Cart',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/cart/Cart'], resolve)
    },
    {
      path: '/collect',
      name: 'Collect',
      meta: { requireLogin: true },
      component: resolve => require(['@/pages/collect/Collect'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/login/Login'], resolve)
    },
    {
      path: '/phoneCode',
      name: 'phoneCode',
      component: resolve => require(['@/pages/login/PhoneCode'], resolve)
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
    // {
    //   path: '/personCenter',
    //   name: 'personCenter',
    //   component: resolve => require(['@/pages/person/PersonCenter'], resolve)
    // },
    {
      path: '/userInfoSet',
      name: 'userInfoSet',
      component: resolve => require(['@/pages/person/UserDataSet'], resolve)
    },
    {
      path: '/goodsAddress/:type/:id?',
      name: 'goodsAddress',
      component: resolve => require(['@/pages/person/GoodsAddress'], resolve)
    },
    {
      path: '/addressAdmin/:need?',
      name: 'addressAdmin',
      component: resolve => require(['@/pages/person/AddressAdmin'], resolve)
    },
    {
      path: '/toolCenter',
      name: 'toolCenter',
      component: resolve => require(['@/pages/person/ToolCenter'], resolve)
    },
    {
      path: '/aboutMember',
      name: 'aboutMember',
      component: resolve => require(['@/pages/person/AboutMember'], resolve)
    }, {
      path: '/orderIndex',
      name: 'orderIndex',
      component: resolve => require(['@/pages/order/OrderIndex'], resolve)
    },
    {
      path: '/orderList/:type',
      name: 'orderList',
      component: resolve => require(['@/pages/order/OrderList'], resolve)
    },
    {
      path: '/orderDetails/:type/:orderCode',
      name: 'orderDetails',
      component: resolve => require(['@/pages/order/OrderDetails'], resolve)
    },
    {
      path: '/immedPayment/:orderCode',
      name: 'immedPayment',
      component: resolve => require(['@/pages/order/ImmedPayment'], resolve)
    },
    {
      path: '/afterSaleOrder/:type/:orderId',
      name: 'afterSaleOrder',
      component: resolve => require(['@/pages/order/AfterSaleOrder'], resolve)
    },
    {
      path: '/applyRefund/:type/:orderId',
      name: 'applyRefund',
      component: resolve => require(['@/pages/order/ApplyRefund'], resolve)
    },
    {
      path: '/immedEvaluate/:orderCode',
      name: 'immedEvaluate',
      component: resolve => require(['@/pages/order/ImmedEvaluate'], resolve)
    },
    {
      path: '/softwareSeting',
      name: 'softwareSeting',
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
      component: resolve => require(['@/pages/person/FeedBack'], resolve)
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/pages/person/AboutUs'], resolve)
    },
    {
      path: '/memberCode',
      name: 'memberCode',
      component: resolve => require(['@/pages/person/MemberCode'], resolve)
    },
    {
      path: '/integralDetails',
      name: 'integralDetails',
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
      component: resolve => require(['@/pages/person/CardVoucher'], resolve)
    },
    {
      path: '/cardDetails/:type/:mainType/:id',
      name: 'cardDetails',
      component: resolve => require(['@/pages/person/CardDetails'], resolve)
    },
    {
      path: '/chooseCoupons',
      name: 'chooseCoupons',
      component: resolve => require(['@/pages/createOrder/ChooseCoupons'], resolve)
    },
    {
      path: '/toolStore',
      name: 'toolStore',
      component: resolve => require(['@/pages/person/ToolStore'], resolve)
    },
    {
      path: '/watchLogistics',
      name: 'watchLogistics',
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
