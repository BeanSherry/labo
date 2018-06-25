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
Vue.prototype.$axios = axios.create();
Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true;
Vue.prototype.$axios.defaults.transformRequest = [function(data) {
  return qs.stringify(data);
}];
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App,
  },
  template: '<App/>'
}).$mount('#app')

