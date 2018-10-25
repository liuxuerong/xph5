import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Login'
import Details from '@/pages/details/Details'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/details/:goodsId',
      name: 'Details',
      component: Details
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
    }
  ]
})
