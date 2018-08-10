// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/icon/iconfont.css';
import './assets/css/common.scss';
import './assets/js/config.js';
import common from'./assets/js/common.js';
const path = require('path')
Vue.prototype.$common = common;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true;
axios.interceptors.request.use(function (config) {
  if(config.method==='get'){
    if(!config.params){
      config.params={}
    }
    config.params.stime=config.params.stime||common.getStime();
    config.params.sign=common.md5NHex(Object.values(config.params).join(''),0)
  }
  if(config.method==='post'){
    config.data.stime=config.data.stime||common.getStime()
    let origin='';
    for(let key in config.data){
      console.log(typeof config.data[key]);
      // if(typeof config.data[key])
    }
    config.data.sign=common.md5NHex(Object.values(config.data).join(''),0)
    config.data=qs.stringify(config.data);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response){
    switch(error.response.status){
      case 403:
        window.location.href='/login';
        break;
    }
  }
  return Promise.reject(error);
});
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App,
  },
  template: '<App/>'
}).$mount('#app')

