import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/Index'
// import Find from '@/pages/find/Find'
// import Classify from '@/pages/classify/Classify'
// import Hotel from '@/pages/hotel/Hotel'
// import Brand from '@/pages/brand/Brand'
// import BrandDetails from '@/pages/brandDetails/BrandDetails'
// import Hall from '@/pages/hall/Hall'
// import HallDetails from '@/pages/hall/HallDetails'
// import HallAtlas from '@/pages/hall/HallAtlas'
// import Story from '@/pages/story/Story'
// import StoryDetails from '@/pages/storyDetails/StoryDetails'
// import HotelDetails from '@/pages/storyDetails/HotelDetails'
// import Details from '@/pages/details/Details'
// import Instructions from '@/pages/invoice/Instructions'
// import Invoice from '@/pages/invoice/Invoice'
// import Cart from '@/pages/cart/Cart'
// import Collect from '@/pages/collect/Collect'
// import Comment from '@/pages/comment/Comment'
// import Goods from '@/pages/goods/Goods'
// import CreateOrder from '@/pages/createOrder/CreateOrder'
// import SendWay from '@/pages/createOrder/SendWay'
// import StoreAddress from '@/pages/createOrder/StoreAddress'
// import Search from '@/pages/search/Search'
// import Login from '@/pages/login/Login'
// import PhoneCode from '@/pages/login/PhoneCode'
// import RemberPassword from '@/pages/login/RemberPassword'
// import UserName from '@/pages/login/UserName'
// import UserPassword from '@/pages/login/UserPassword'
// import PersonCenter from '@/pages/person/PersonCenter'
// import PerUserInfoSet from '@/pages/person/UserDataSet'
// import GoodsAddress from '@/pages/person/GoodsAddress'
// import AddressAdmind from '@/pages/person/AddressAdmin'
// import ToolCenter from '@/pages/person/ToolCenter'
// import AboutMember from '@/pages/person/AboutMember'
// import OrderIndex from '@/pages/order/OrderIndex'
// import OrderList from '@/pages/order/OrderList'
// import OrderDetails from '@/pages/order/OrderDetails'
// import ImmedPayment from '@/pages/order/ImmedPayment'
// import AfterSaleOrder from '@/pages/order/AfterSaleOrder'
// import ApplyRefund from '@/pages/order/ApplyRefund'
// import ImmedEvaluate from '@/pages/order/ImmedEvaluate'
// import SoftwareSeting from '@/pages/person/SoftwareSeting'
// import Agreement from '@/pages/person/Agreement'
// import FeedBack from '@/pages/person/FeedBack'
// import AboutUs from '@/pages/person/AboutUs'
// import MemberCode from '@/pages/person/MemberCode'
// import IntegralDetails from '@/pages/person/IntegralDetails'
// import IntegralRule from '@/pages/person/IntegralRule'
// import CardVoucher from '@/pages/person/CardVoucher'
// import CardDetails from '@/pages/person/CardDetails'
// import ChooseCoupons from '@/pages/createOrder/ChooseCoupons'
// import WatchLogistics from '@/pages/order/WatchLogistics'
// import AppDownload from '@/pages/download/AppDownload'
// import ToolStore from '@/pages/person/ToolStore'
// import ReturnGoods from '@/pages/order/ReturnGoods'
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
      path: '/cardDetails/:type/:id',
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
<<<<<<< HEAD
      component: resolve => require(['@/pages/order/ReturnGoods'], resolve)
=======
      component: ReturnGoods
    },
    {
      path: '/accountSecurity',
      name: 'accountSecurity',
      component: AccountSecurity
    },
    {
      path: '/userPhoneCode/:type',
      name: 'userPhoneCode',
      component: UserPhoneCode
>>>>>>> bd010bae3cf210559be38dc1c6b242b4366d2e24
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
