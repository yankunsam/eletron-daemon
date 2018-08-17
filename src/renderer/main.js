import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import fs from 'file-system'
import db from './datastore'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Eos from 'oasisjs'
import cmd from 'node-cmd'
import ipfsAPI from 'ipfs-api'
import MongoClient from 'mongodb'
Vue.use(ElementUI)

var mongodburl = 'mongodb://124.127.156.41:27017/'
var config = {
  chainId: '8a679bd6c011ff93eff0cb99d997bf72a69a0aaddc430d7e9c4b705f4de4d843',
  httpEndpoint: 'http://124.127.156.41:8888',
  keyProvider: ['5KiDMuzQcK8q3M2MKHLyY4azLq8WnyYHdRN9VCsBh5sq6gDXnuf', '5KNX43WUe1YwajDD7wuJNuhVxzACsFvHo1YoXjrwyTr9wxBH47U'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$mongoclient = MongoClient
Vue.prototype.$mongodburl = mongodburl
Vue.prototype.$fs = fs
Vue.prototype.$eos = eos
Vue.prototype.$eosconfig = config
Vue.prototype.$actor = 'eosio.token'
Vue.prototype.$cmd = cmd
Vue.prototype.$ipfsinit = 'python /Users/sam/Public/ipfs-daemon/run.py ipfsinit'
Vue.prototype.$clusterinit = 'python /Users/sam/Public/ipfs-daemon/run.py clusterinit'
Vue.prototype.$ipfsmanageconfig = 'python /Users/sam/Public/ipfs-daemon/run.py ipfsmanageconfig'
Vue.prototype.$ipfsrun = 'python /Users/sam/Public/ipfs-daemon/run.py ipfsrun'
Vue.prototype.$clusterrun = 'python /Users/sam/Public/ipfs-daemon/run.py clusterrun'
Vue.prototype.$clustergenesisrun = 'python /Users/sam/Public/ipfs-daemon/run.py clustergenesisrun'
Vue.prototype.$getClusterId = 'python /Users/sam/Public/ipfs-daemon/run.py getclusterid'
Vue.prototype.$ipfsstop = 'python /Users/sam/Public/ipfs-daemon/run.py ipfsstop'
Vue.prototype.$clusterstop = 'python /Users/sam/Public/ipfs-daemon/run.py clusterstop'
Vue.prototype.$ipfsapi = ipfsAPI('localhost', '5001', {protocol: 'http'})
console.log('In main.js')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
