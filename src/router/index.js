import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  {
    path:'/',
    name:'attendance',
    component:()=>import('../views/attendance')
  },
  {
    path: '/nameList',
    name: 'nameList',
    component:() => import('../views/nameList')
  },
  {
   path:'/person',
   name:'person',
   component:() => import('../views/person')
  },
  {
   path:'/calendar',
   name:'calendar',
   component:() => import('../views/MyCalendar')
  },
   {
   path:'/trainning',
   name:'trainning',
   component:() => import('../views/trainning')
  },

]

const router = new VueRouter({
  routes
})

export default router
