// store.js
import Vuex from 'vuex'
import { SET_TOKEN } from './mutation-types'

import Cookies from 'js-cookie'

const sourceToken = Cookies.get('sourceToken')
const targetToken = Cookies.get('targetToken')

const store = new Vuex.Store({
    state: {
      sourceToken: sourceToken,
      targetToken: targetToken
    },
    mutations: {
      [SET_TOKEN] (state, payload) {
        Cookies.set(payload.name, payload.value)
        state[payload.name] = payload.value
      },
    },
})

export default store