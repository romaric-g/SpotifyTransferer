import Vue from 'vue'
import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'
import VueTailwind from 'vue-tailwind'
import App from './App.vue'

import './assets/css/main.css';

const theme = {
  TAlert: {
    fixedClasses: {
      wrapper: 'rounded p-4 flex text-sm border-l-4',
      body: 'flex-grow',
      close: 'ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    },
    classes: {
      wrapper: 'bg-blue-100 border-blue-500',
      body: 'text-blue-700',
      close: 'text-blue-700 hover:text-blue-500 hover:bg-blue-200',
      closeIcon: 'h-5 w-5 fill-current'
    },
    variants: {
      danger: {
        wrapper: 'bg-red-100 border-red-500',
        body: 'text-red-700',
        close: 'text-red-700 hover:text-red-500 hover:bg-red-200'
      },
      success: {
        wrapper: 'bg-green-100 border-green-500',
        body: 'text-green-700',
        close: 'text-green-700  hover:text-green-500 hover:bg-green-200'
      }
    }
  },
  TButton: {
    fixedClasses: 'focus:outline-none focus:shadow-outline inline-flex items-center transition ease-in-out duration-150',
    classes: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
    variants: {
      error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700  active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      funny: 'text-white bg-orange-600 hover:bg-orange-500 focus:border-orange-700 active:bg-orange-700 text-sm font-medium uppercase border-orange-200 px-4 py-2 border-2 rounded-full shadow',
      link: 'underline text-orange-500 px-3 py-2 hover:bg-orange-100 rounded'
    }
  }
}
Vue.use(VueTailwind, theme)
Vue.use(VueSpotify, new Spotify({
  clientId: 'bb2b7c9972734a27b963920645abc5b7',
  clientSecret: 'e52dc272f5134e018e6e9c75cc782a9d',
  redirectUri: 'http://localhost:8080/'
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
