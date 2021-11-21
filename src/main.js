import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { hasBtnPermission } from './utils/permission' // button permission

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(ElementUI, { locale }, Viewer)

Vue.config.productionTip = false
Vue.prototype.hasPerm = hasBtnPermission

Viewer.setDefaults({
  Options: {
    'inline': false,
    'button': false,
    'navbar': false,
    'title': false,
    'toolbar': false,
    'tooltip': false,
    'movable': false,
    'zoomable': false,
    'rotatable': false,
    'scalable': false,
    'transition': false,
    'fullscreen': false,
    'keyboard': false,
    'url': 'data-source'
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
