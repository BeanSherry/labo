import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import album from '@/components/album'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import Reset from '@/components/Reset'
import Upload from '@/components/Upload'
import tab from '@/components/tab'
import breadcrumb from '@/components/breadcrumb'
import set from '@/components/Set'
import profile from '@/components/profile'
import pwdEdit from '@/components/pwdEdit'
import mailBind from '@/components/mailBind'
import mini from '@/components/mini'
import project from '@/components/project'
Vue.use(Router)

export default new Router({
  mode:'history',
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
      path:'/reset',
      name:'Reset',
      component:Reset
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/album',
      name:'album',
      component:album
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/set',
      name: 'set',
      component: set,
      children:[
        {
          path: '/set/profile',
          name: 'profile',
          component:profile,
        },
        {
          path: '/set/pwdEdit',
          name: 'pwdEdit',
          component:pwdEdit,
        },
        {
          path: '/set/mailBind',
          name: 'mailBind',
          component:mailBind,
        },
      ]
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
  ]
})

