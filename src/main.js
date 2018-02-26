import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small' })
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
