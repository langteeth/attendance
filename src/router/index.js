import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/attendance'
  },
  {
    path:'/attendance',
    name:'attendance',
    component:()=>import('../views/attendance')
  }
]

const router = new VueRouter({
  routes
})

export default router
