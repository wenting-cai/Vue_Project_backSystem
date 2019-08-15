import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Manage from './views/Manage.vue'
import Home from './views/Home.vue'
import AddGoods from './views/AddGoods.vue'
import AddShop from './views/AddShop.vue'
import AdminList from './views/AdminList.vue'
import FoodList from './views/FoodList.vue'
import OrderList from './views/OrderList.vue'
import ShopList from './views/ShopList.vue'
import UserList from './views/UserList.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      component: Manage,
      children: [
        {
          path: '',
          component: Home,
          meta: []
        },
        {
          path: '/addGoods',
          component: AddGoods,
          meta: ['添加数据', '添加商品']
        }, {
          path: '/foodList',
          component: FoodList,
          meta: ['数据管理', '食品列表']
        },
        {
          path: '/orderList',
          component: OrderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: '/shopList',
          component: ShopList,
          meta: ['数据管理', '商家列表']
        },
        {
          path: '/userList',
          component: UserList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: '/addShop',
          component: AddShop,
          meta: ['添加数据', '添加商铺']
        },
        {
          path: '/adminList',
          component: AdminList,
          meta: ['数据管理', '管理员列表']
        }
      ],
      beforeEnter(to, from, next) {
        console.log(to, from)
        if (from.fullPath === '/') {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  let log = localStorage.getItem('ACCESS_TOKEN')
  if ( !log && to.fullpath !== 'Login') {
    next('/')
  } else {
    next()
  }
}) */

export default router