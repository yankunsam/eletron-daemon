import Eos from 'oasisjs'
import MongoClient from 'mongodb'
var config = {
  chainId: '8a679bd6c011ff93eff0cb99d997bf72a69a0aaddc430d7e9c4b705f4de4d843',
  httpEndpoint: 'http://127.0.0.1:8888',
  keyProvider: ['5KiDMuzQcK8q3M2MKHLyY4azLq8WnyYHdRN9VCsBh5sq6gDXnuf', '5Hz2G2L9p3k7YhkqGJaioNJQnYKjtZKKS2y3wRLDobCQAtXg5oA', '5KVEXrFj2AWvBzo9UkiZnw1A6k3vEfcFp99R2XdM2PdWk3spjEm', '5J1sBkezsqpwUeFL1e54gwWgqBzmy3SHxYmmDq57ecjL4zjzkSU', '5KJ6ygSpfjfTqQ58bzqwGTJN7wA8y5Rgy8WFkZDub4ZxcBf7ZAW', '5JUzVys5jc8pBiAQQG1QRcZVMFd8CyHAU3LTkn83qQw7HksniiL'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)
var mongodburl = 'mongodb://192.168.1.184:27017/'
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
