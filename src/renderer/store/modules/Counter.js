import Eos from 'oasisjs'
import MongoClient from 'mongodb'
var config = {
  chainId: '8a679bd6c011ff93eff0cb99d997bf72a69a0aaddc430d7e9c4b705f4de4d843',
  httpEndpoint: 'http://124.127.156.41:8888',
  keyProvider: ['5KiDMuzQcK8q3M2MKHLyY4azLq8WnyYHdRN9VCsBh5sq6gDXnuf', '5KNX43WUe1YwajDD7wuJNuhVxzACsFvHo1YoXjrwyTr9wxBH47U'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)
var mongodburl = 'mongodb://124.127.156.41:27017/'
const state = {
  main: 0,
  config: config,
  eos: eos,
  mongodburl: mongodburl,
  mongoclient: MongoClient
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  create_eos (state) {
    state.eos = Eos(state.config)
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
