import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import VCharts from 'v-charts'
import JsonViewer from 'vue-json-viewer'

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

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
