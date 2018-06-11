import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Regist from '@/components/Regist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/regist',
      name:'Regist',
      component:Regist
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

  ]
})

