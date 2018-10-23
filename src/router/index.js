import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Find from '@/pages/find/Find'
import Brand from '@/pages/brand/Brand'
import BrandDetails from '@/pages/brandDetails/BrandDetails'
import Hall from '@/pages/hall/Hall'
import Story from '@/pages/story/Story'
import Details from '@/pages/details/Details'
import Comment from '@/pages/comment/Comment'
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
