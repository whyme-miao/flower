import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/iconfont/iconfont.css'
// 引入全局样式表
import './assets/css/global.css'
import './assets/scss/style.scss'
// 引入axios
import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

// Vue.mixin()可设置每一Vue实例都拥有的那些属性或方法
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  // methods: {
  //   getAuthHeader() {
  //     return {
  //       Authorization: `Bearer ${localStorage.token || ''}`
  //     }
  //   }
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
