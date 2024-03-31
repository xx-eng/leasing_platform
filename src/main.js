// import Vue from 'vue'
// import App from './App.vue'
// import store from './store'
// import router from './router'
// import 'ant-design-vue/dist/antd.css'
// import './core/lazy_use'
// import Antd  from 'ant-design-vue'
//
// Vue.config.productionTip = false
// Vue.use(Antd)
//
// import { message,notification } from 'ant-design-vue'
// Vue.prototype.$message = message;
// Vue.prototype.$notification = notification;
// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app')

// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// import i18n from './locales'
import { VueAxios } from './utils/request'
// import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
// import './utils/filter' // global filter
import './global.less' // global style

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
// Vue.component('pro-layout', ProLayout)
// Vue.component('page-container', PageHeaderWrapper)
// Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  // i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
