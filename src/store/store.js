// store.js
import Vuex from 'vuex'
import { SET_TOKEN } from './mutation-types'

import Cookies from 'js-cookie'

const sourceToken = Cookies.get('sourceToken')// || "BQBReVj27TbR-fZkCVvWR-XEjgIfc-YXiDguB_i7vnTAWj6wVhebvj9y-LvlYV9ki83qsKvqDUnXOzyejyt4w_T21YINCijPqrNHDwpCUl7sKTVjQIgQrW8PserePaX1Ex5ysYwNmsSWpUPE3-uX6HjmnxXFGhebtuKdp9uYkVxwbrJ3uD2twdUKIw"
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