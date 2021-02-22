import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import FlowerEdit from '../views/FlowerEdit.vue'
import FlowerList from '../views/FlowerList.vue'

import StockEdit from '../views/StockEdit.vue'
import StockList from '../views/StockList.vue'


import UserList from '../views/UserList.vue'


Vue.use(VueRouter)

const routes = [
  { path:'/login', name:'login', component: Login, meta: {isPublic: true}}, // isPublic为true表示可以公开访问
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit},
      { path: '/categories/edit/:id', component: CategoryEdit, props: true},
      { path: '/categories/list', component: CategoryList},

      { path: '/admin_users/create', component: AdminUserEdit},
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true},
      { path: '/admin_users/list', component: AdminUserList},

      { path: '/flowers/create', component: FlowerEdit},
      { path: '/flowers/edit/:id', component: FlowerEdit, props: true},
      { path: '/flowers/list', component: FlowerList},

      { path: '/stocks/create', component: StockEdit},
      { path: '/stocks/edit/:id', component: StockEdit, props: true},
      { path: '/stocks/update/:idd', component: StockEdit, props: true},
      { path: '/stocks/list', component: StockList},



      { path: '/users/list', component: UserList},
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }

  next()
})


export default router
