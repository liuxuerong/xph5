import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Find from '@/pages/find/Find'
import Classify from '@/pages/classify/Classify'
import Hotel from '@/pages/hotel/Hotel'
// import Brand from '@/pages/brand/Brand'
import BrandDetails from '@/pages/brandDetails/BrandDetails'
import Hall from '@/pages/hall/Hall'
import HallDetails from '@/pages/hall/HallDetails'
import HallAtlas from '@/pages/hall/HallAtlas'
import Story from '@/pages/story/Story'
import StoryDetails from '@/pages/storyDetails/StoryDetails'
import HotelDetails from '@/pages/storyDetails/HotelDetails'
import Details from '@/pages/details/Details'
import Instructions from '@/pages/invoice/Instructions'
import Invoice from '@/pages/invoice/Invoice'
import Cart from '@/pages/cart/Cart'
import Collect from '@/pages/collect/Collect'
import Comment from '@/pages/comment/Comment'
import Goods from '@/pages/goods/Goods'
import CreateOrder from '@/pages/createOrder/CreateOrder'
import SendWay from '@/pages/createOrder/SendWay'
import StoreAddress from '@/pages/createOrder/StoreAddress'
import Search from '@/pages/search/Search'
import Login from '@/pages/login/Login'
import PhoneCode from '@/pages/login/PhoneCode'
import RemberPassword from '@/pages/login/RemberPassword'
import UserName from '@/pages/login/UserName'
import UserPassword from '@/pages/login/UserPassword'
import PersonCenter from '@/pages/person/PersonCenter'
import PerUserInfoSet from '@/pages/person/UserDataSet'
import GoodsAddress from '@/pages/person/GoodsAddress'
import AddressAdmind from '@/pages/person/AddressAdmin'
import ToolCenter from '@/pages/person/ToolCenter'
import AboutMember from '@/pages/person/AboutMember'
import OrderIndex from '@/pages/order/OrderIndex'
import OrderList from '@/pages/order/OrderList'
import OrderDetails from '@/pages/order/OrderDetails'
import ImmedPayment from '@/pages/order/ImmedPayment'
import AfterSaleOrder from '@/pages/order/AfterSaleOrder'
import ApplyRefund from '@/pages/order/ApplyRefund'
import ImmedEvaluate from '@/pages/order/ImmedEvaluate'
import SoftwareSeting from '@/pages/person/SoftwareSeting'
import Agreement from '@/pages/person/Agreement'
import FeedBack from '@/pages/person/FeedBack'
import AboutUs from '@/pages/person/AboutUs'
import MemberCode from '@/pages/person/MemberCode'
import IntegralDetails from '@/pages/person/IntegralDetails'
import IntegralRule from '@/pages/person/IntegralRule'
import CardVoucher from '@/pages/person/CardVoucher'
import CardDetails from '@/pages/person/CardDetails'
import ChooseCoupons from '@/pages/createOrder/ChooseCoupons'
import WatchLogistics from '@/pages/order/WatchLogistics'
import AppDownload from '@/pages/download/AppDownload'
import ToolStore from '@/pages/person/ToolStore'
import ReturnGoods from '@/pages/order/ReturnGoods'
import AccountSecurity from '@/pages/person/AccountSecurity'
import SearchOrder from '@/pages/order/SearchOrder'
import UserPhoneCode from '@/pages/person/userSetup/UserPhoneCode'
import { accessToken } from 'util/const'
import { storage } from 'util/storage'

// meta: { requireLogin: true }
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/hall',
      component: Index,
      children: [
        {name: 'Find', path: '/find', component: Find},
        {name: 'Classify', path: '/classify', component: Classify},
        {name: 'Hall', path: '/hall', component: Hall},
        {name: 'Story', path: '/story', component: Story},
        {name: 'PersonCenter', path: '/personCenter', component: PersonCenter}
      ]
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/hallDetails/:index',
      name: 'HallDetails',
      component: HallDetails
    },
    {
      path: '/hallAtlas/:index',
      name: 'HallAtlas',
      component: HallAtlas
    },
    {
      path: '/details/:goodsId',
      name: 'Details',
      component: Details
    },
    {
      path: '/comment/:goodsId',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/brandDetails/:id',
      name: 'BrandDetails',
      component: BrandDetails
    },
    {
      path: '/storyDetails/:id',
      name: 'StoryDetails',
      component: StoryDetails
    },
    {
      path: '/hotelDetails/:id',
      name: 'HotelDetails',
      component: HotelDetails
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/createOrder/:info?',
      name: 'CreateOrder',
      meta: { requireLogin: true },
      component: CreateOrder
    },
    {
      path: '/sendWay',
      name: 'SendWay',
      meta: { requireLogin: true },
      component: SendWay
    },
    {
      path: '/storeAddress',
      name: 'StoreAddress',
      meta: { requireLogin: true },
      component: StoreAddress
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/invoice',
      name: 'Invoice',
      meta: { requireLogin: true },
      component: Invoice
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: Instructions
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/collect',
      name: 'Collect',
      meta: { requireLogin: true },
      component: Collect
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/phoneCode',
      name: 'phoneCode',
      component: PhoneCode
    },
    {
      path: '/remberPassword',
      name: 'remberPassword',
      component: RemberPassword
    },
    {
      path: '/userName',
      name: 'userName',
      component: UserName
    },
    {
      path: '/userPassword/:type',
      name: 'userPassword',
      component: UserPassword
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: PersonCenter
    },
    {
      path: '/userInfoSet',
      name: 'userInfoSet',
      component: PerUserInfoSet
    },
    {
      path: '/goodsAddress/:type/:id?',
      name: 'goodsAddress',
      component: GoodsAddress
    },
    {
      path: '/addressAdmin/:need?',
      name: 'addressAdmin',
      component: AddressAdmind
    },
    {
      path: '/toolCenter',
      name: 'toolCenter',
      component: ToolCenter
    },
    {
      path: '/aboutMember',
      name: 'aboutMember',
      component: AboutMember
    }, {
      path: '/orderIndex',
      name: 'orderIndex',
      component: OrderIndex
    },
    {
      path: '/orderList/:type',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/orderDetails/:type/:orderCode',
      name: 'orderDetails',
      component: OrderDetails
    },
    {
      path: '/immedPayment/:orderCode',
      name: 'immedPayment',
      component: ImmedPayment
    },
    {
      path: '/afterSaleOrder/:type/:orderId',
      name: 'afterSaleOrder',
      component: AfterSaleOrder
    },
    {
      path: '/applyRefund/:type/:orderId',
      name: 'applyRefund',
      component: ApplyRefund
    },
    {
      path: '/immedEvaluate/:orderCode',
      name: 'immedEvaluate',
      component: ImmedEvaluate
    },
    {
      path: '/softwareSeting',
      name: 'softwareSeting',
      component: SoftwareSeting
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: FeedBack
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/memberCode',
      name: 'memberCode',
      component: MemberCode
    },
    {
      path: '/integralDetails',
      name: 'integralDetails',
      component: IntegralDetails
    },
    {
      path: '/integralRule',
      name: 'integralRule',
      component: IntegralRule
    },
    {
      path: '/cardVoucher',
      name: 'cardVoucher',
      component: CardVoucher
    },
    {
      path: '/cardDetails/:type/:mainType/:id',
      name: 'cardDetails',
      component: CardDetails
    },
    {
      path: '/chooseCoupons',
      name: 'chooseCoupons',
      component: ChooseCoupons
    },
    {
      path: '/toolStore',
      name: 'toolStore',
      component: ToolStore
    },
    {
      path: '/watchLogistics',
      name: 'watchLogistics',
      component: WatchLogistics
    },
    {
      path: '/appDownload',
      name: 'appDownload',
      component: AppDownload
    },
    {
      path: '/returnGoods/:orderId',
      name: 'returnGoods',
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
    },
    {
      path: '/searchOrder',
      name: 'searchOrder',
      component: SearchOrder
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
