import Vue from 'vue'
import VueRouter from 'vue-router'

import Vuex from 'vuex'

import VueTailwind from 'vue-tailwind'

import App from './App.vue'
import Home from '@/components/Home.vue'
import AuthCallback from '@/components/AuthCallback.vue'

import '@/assets/css/main.css';

const client_id = "bb2b7c9972734a27b963920645abc5b7"

const theme = {
  TButton: {
    fixedClasses: 'focus:outline-none inline-flex items-center transition ease-in-out duration-150',
    classes: 'text-white bg-green hover:bg-lightgreen focus:bg-darkgreen focus:shadow-inner active:bg-darkgreen text-sm font-medium uppercase px-4 py-2 rounded-full',
    variants: {}
  },
  TCheckbox: {
    fixedClasses: 'form-checkbox',
    classes: 'text-green',
  }
}

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueTailwind, theme)

Vue.config.productionTip = false
Vue.mixin({
  created: function () {
    this.client_id = client_id
  }
})

const routes = [
  { path: '/', component: Home},
  { path: '/callback/source', component: AuthCallback, props: {type: "source"}},
  { path: '/callback/target', component: AuthCallback, props: {type: "target"}},
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

const store = require("./store/store").default

new Vue({
  router,
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})