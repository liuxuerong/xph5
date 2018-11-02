import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Find from '@/pages/find/Find'
import Brand from '@/pages/brand/Brand'
import BrandDetails from '@/pages/brandDetails/BrandDetails'
import Hall from '@/pages/hall/Hall'
import HallDetails from '@/pages/hall/HallDetails'
import HallAtlas from '@/pages/hall/HallAtlas'
import Story from '@/pages/story/Story'
import StoryDetails from '@/pages/StoryDetails/StoryDetails'
import Details from '@/pages/details/Details'
import Instructions from '@/pages/invoice/Instructions'
import Invoice from '@/pages/invoice/Invoice'
import Cart from '@/pages/cart/Cart'
import Collect from '@/pages/collect/Collect'
import Comment from '@/pages/comment/Comment'
import Goods from '@/pages/goods/Goods'
import CreateOrder from '@/pages/createOrder/CreateOrder'
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
        {name: 'Brand', path: '/brand', component: Brand},
        {name: 'Hall', path: '/hall', component: Hall},
        {name: 'Story', path: '/story', component: Story},
        {name: 'PersonCenter', path: '/personCenter', component: PersonCenter}
      ]
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
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/createOrder',
      name: 'CreateOrder',
      meta: { requireLogin: true },
      component: CreateOrder
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/invoice',
      name: 'Invoice',
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
      path: '/userPassword',
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
      path: '/goodsAddress',
      name: 'goodsAddress',
      component: GoodsAddress
    },
    {
      path: '/addressAdmind',
      name: 'addressAdmind',
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
      path: '/orderDetails/:orderCode',
      name: 'orderDetails',
      component: OrderDetails
    },
    {
      path: '/immedPayment/:orderCode',
      name: 'immedPayment',
      component: ImmedPayment
    },
    {
      path: '/afterSaleOrder/:orderId',
      name: 'afterSaleOrder',
      component: AfterSaleOrder
    },
    {
      path: '/applyRefund/:type/:orderId',
      name: 'applyRefund',
      component: ApplyRefund
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (!storage.getLocalStorage(accessToken)) {
      // notice.errorModal('未授权，请重新登录', function () {
      //   router.push({path: '/login'})
      // })
      next({
        path: '/login'
      })
    } else {
      // 没登录则跳转到登录界面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
