import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from './store'
import axios from "axios";
import _ from 'lodash'
import JsonExcel from "vue-json-excel";

Vue.use(ViewUI)
Vue.use(ElementUI);
Vue.prototype._ = _
Vue.prototype.$axios = axios
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
