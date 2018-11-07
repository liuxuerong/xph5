import Vue from 'vue'
import notice from '../util/notice'
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
import Comment from '@/pages/comment/Comment'
import Goods from '@/pages/goods/Goods'
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
      path: '/search',
      name: 'Search',
      component: Search
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
      path: '/goodsAddress/:type/:id',
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
      path: '/cardDetails/:type/:id',
      name: 'cardDetails',
      component: CardDetails
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem('loginUserBaseInfo')) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
        1000
      let nowTime = (new Date()).getTime() // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next()
      } else {
        notice.errorModal('未授权，请重新登录', function () {
          router.push({path: '/login'})
        })
        next({
          path: '/login'
        })
      }
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
