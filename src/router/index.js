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
import Adminuser from '../components/Adminuser'
import HeathActivity from '../components/HeathActivity'
import HeathTeach from '../components/HeathTeach'
import StudentDisease from '../components/StudentDisease'
import PublicBlood from '../components/PublicBlood'
import StudentsSys from '../components/StudentsSys'
import StudentBody from '../components/StudentBody'
import DiseaseCount from '../components/DiseaseCount'
import Error404 from '../views/Error404'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      auth:true
    },
    children:[
      {
        path:'/Adminuser',
        name:'adminuser',
        component:Adminuser,
        meta:{
          auth:true
        },
      },{
        path:'/HeathActivity',
        name:'heathactivity',
        component:HeathActivity,
        meta:{
          auth:true
        },
      },{
        path:'/HeathTeach',
        name:'heathteach',
        component:HeathTeach,
        meta:{
          auth:true
        },
      },{
        path:'/StudentDisease',
        name:'studentdisease',
        component:StudentDisease,
        meta:{
          auth:true
        },
      },{
        path:'/PublicBlood',
        name:'publicBlood',
        component:PublicBlood,
        meta:{
          auth:true
        },
      },{
        path:'/StudentsSys',
        name:'studentsSys',
        component:StudentsSys,
        meta:{
          auth:true
        },
      },{
        path:'/StudentBody',
        name:'studentbody',
        component:StudentBody,
        meta:{
          auth:true
        },
      },{
        path:'/DiseaseCount',
        name:'diseasecount',
        component:DiseaseCount,
        meta:{
          auth:true
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/Error404',
    name:'Error404',
    component:Error404
  },{
    path:"*", //置于最底部
    redirect:'/Error404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 页面刷新，判断之前是否登陆
 */
if(window.sessionStorage.getItem('isLogin')){
  store.dispatch('setAdmin',window.sessionStorage.getItem('userName'))
}

/**
 * 路由拦截器
 */
router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    if(window.sessionStorage.getItem('userToken')){
      if(window.sessionStorage.getItem('userName')==store.getters.getUsername){
        next()
      }else{
        next({
          path:'/Login'
        })
      }
    }else{
      next({
        path:'/Login'
      })
    }
  }else{
    next()
  }
})

export default router