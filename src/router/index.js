import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
    }
  ]
})
