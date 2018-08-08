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
Vue.use(ElementUI)

var config = {
  chainId: 'c40a90d6bcb4b9b2c2d4c0916ee97a29af42a420372af44fa4f538ddef9e6b83',
  httpEndpoint: 'http://124.127.156.41:8888',
  keyProvider: ['5HrRFWkaGjnRd4kEPtgD1QrbuBQoH347UpjjDa7bTwXpzPcbm7i', '5HraW3vTnf6S3QC9br3pwkvzJBddG5yVPY5d3LTRtsbLWubVVvh'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$fs = fs
Vue.prototype.$eos = eos
Vue.prototype.$eosconfig = config
Vue.prototype.$actor = 'sam'
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
