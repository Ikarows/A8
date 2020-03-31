import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './config/http'
import 'lib-flexible/flexible'
import '@vant/touch-emulator'
import '@/utils/fastclick.config'
import { isApp } from '@/utils/userAgent'
import share from '@/components/share'
import appTips from '@/components/appTips'
import '@/assets/css/reset.scss'
import moment from 'moment'
moment.locale('zh-cn')

import 'vant/lib/index.css'
import { Popup, NavBar, Col, Row, Step, Steps, Notify, List, ActionSheet, Button } from 'vant'
Vue.use(Popup).use(NavBar).use(Col).use(Row).use(Step).use(Steps).use(Notify).use(List).use(ActionSheet).use(Button)

Vue.prototype.$alert = Notify
Vue.prototype.$moment = moment
Vue.component('share', share)
Vue.component('appTips', appTips)

if (process.env.VUE_APP_SECRET === 'production') {
  axios.defaults.baseURL = 'https://act.api.a8sport.com'
} else {
  axios.defaults.baseURL = 'http://act-test.api.a8sport.com'
}

import Vconsole from 'vconsole'
if (process.env.VUE_APP_SECRET === 'test') {
  new Vconsole()
}

Vue.prototype.$isApp = isApp
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
