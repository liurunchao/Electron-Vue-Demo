import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
const SerialPort = require("serialport")
Vue.http = Vue.prototype.$http = axios
Vue.SerialPort = Vue.prototype.$SerialPort = SerialPort
Vue.config.productionTip = false

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
