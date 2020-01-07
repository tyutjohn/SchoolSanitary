/*
 * @Author: johnwang
 * @since: 2019-11-02 00:29:39
 * @lastTime: 2019-11-04 16:07:33
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Calendar from '../components/Calendar'
import Adminuser from '../components/Adminuser'
import HeathActivity from '../components/HeathActivity'
import HeathTeach from '../components/HeathTeach'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/Calendar',
        name:'calendar',
        component:Calendar
      },{
        path:'/Adminuser',
        name:'adminuser',
        component:Adminuser
      },{
        path:'/HeathActivity',
        name:'heathactivity',
        component:HeathActivity
      },{
        path:'/HeathTeach',
        name:'heathteach',
        component:HeathTeach
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router