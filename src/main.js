import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import VCharts from 'v-charts'
import JsonViewer from 'vue-json-viewer'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

Vue.prototype.$axios = axios;
Vue.use(VueHighlightJS)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(JsonViewer)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
