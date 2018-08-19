import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import fs from 'file-system'
import db from './datastore'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Eos from 'oasisjs'
import cmd from 'node-cmd'
import ipfsAPI from 'ipfs-api'
import MongoClient from 'mongodb'
import VueI18n from 'vue-i18n'
Vue.use(ElementUI, { locale })

var mongodburl = 'mongodb://124.127.156.41:27017/'
var config = {
  chainId: '8a679bd6c011ff93eff0cb99d997bf72a69a0aaddc430d7e9c4b705f4de4d843',
  // httpEndpoint: 'http://124.127.156.41:8888',
  httpEndpoint: 'http://127.0.0.1:8888',
  keyProvider: ['5KiDMuzQcK8q3M2MKHLyY4azLq8WnyYHdRN9VCsBh5sq6gDXnuf', '5KNX43WUe1YwajDD7wuJNuhVxzACsFvHo1YoXjrwyTr9wxBH47U'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)
const messages = {
  en: {
    message: {
      hello: 'hello Sam',
      mainnet: 'Main Net',
      blockexplorer: 'Block Explorer',
      communitycloud: 'Community Cloud',
      oracle: 'Oracle',
      system: 'system',
      unfold: 'unfold',
      fold: 'fold',
      contractlist: 'contract list',
      mainnetcontract: 'mainnet contract',
      account: 'account',
      transfer: 'transfer',
      tokencreate: 'token create',
      noderegister: 'node register',
      vote: 'vote',
      Dapp: 'Dapp',
      refreshlist: 'Refresh List',
      token: 'token',
      maximumsupply: 'maximum supply',
      contractaccount: 'contract account',
      create: 'Create',
      receiver: 'Receiver',
      amount: 'Amount',
      memo: 'Memo',
      wasmpath: 'WASM Path',
      abipath: 'ABI Path',
      contractdeploy: 'Contract Deploy',
      issueraccount: 'Issuer Account',
      alignleft: 'Align Left',
      alignright: 'Align Right',
      aligntop: 'Align Top'

    }
  },
  zh: {
    message: {
      hello: '你好，Sam',
      mainnet: '主网',
      blockexplorer: '区块浏览器',
      communitycloud: '社区云',
      oracle: '预言机',
      system: '系统',
      unfold: '展开',
      fold: '折叠',
      contractlist: '合约列表',
      mainnetcontract: '主网合约',
      account: '账户',
      transfer: '转账',
      tokencreate: '创建token',
      noderegister: '节点注册',
      vote: '投票',
      Dapp: '去中心化应用',
      refreshlist: '刷新列表',
      token: '积分名称',
      maximumsupply: '积分总量',
      contractaccount: '合约账户',
      create: '创建',
      receiver: '接受账户',
      amount: '数量',
      memo: '备注',
      wasmpath: 'WASM文件 路径',
      abipath: 'ABI 文件路径',
      contractdeploy: '合约部署',
      issueraccount: 'Issuer 账户',
      alignleft: '左对齐',
      alignright: '右对齐',
      aligntop: '顶部对齐'
    }
  }
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueI18n)
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

const i18n = new VueI18n({
  locale: 'en',
  messages
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  i18n
}).$mount('#app')
