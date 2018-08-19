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
  httpEndpoint: 'http://124.127.156.41:8888',
  // httpEndpoint: 'http://127.0.0.1:8888',
  keyProvider: ['5KiDMuzQcK8q3M2MKHLyY4azLq8WnyYHdRN9VCsBh5sq6gDXnuf', '5KNX43WUe1YwajDD7wuJNuhVxzACsFvHo1YoXjrwyTr9wxBH47U'],
  expireInSeconds: 60,
  broadcast: true,
  sign: true
}
var eos = Eos(config)
const messages = {
  en: {
    message: {
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
      aligntop: 'Align Top',
      accountinfo: 'Account Info',
      transinfo: 'Transaction Info',
      singletransinfo: 'Single Transaction Info',
      accounttransinfo: 'Account Transaction Info',
      nodelist: 'Node List',
      votelist: 'Vote List',
      createtime: ' Create Time',
      updatetime: 'Update Time',
      nodejoin: 'Join Node',
      fileupload: 'Upload File',
      filedownload: 'Download File',
      nodemonitor: 'Node Monitor',
      ipfsinit: 'IPFS Init',
      ipfsconfigure: 'IPFS Configure',
      ipfsrun: 'IPFS RUN',
      stop: 'Stop',
      clusterinit: 'Cluster Init',
      clusterrun: 'Cluster Run',
      clustergenesisrun: 'Cluster Genesis Run',
      get: 'Get',
      upload: 'Upload',
      file: 'File',
      download: 'Download',
      transaction: 'Transaction',
      balance: 'Balance',
      ramusage: 'Ram Usage',
      cpuusage: 'CPU Usage',
      netusage: 'Net Usage',
      transamount: 'Transaction Amount',
      default: 'default',
      transactionid: 'Transaction ID',
      blockid: 'Block ID',
      transactiontime: 'Transaction Time',
      transactionsender: 'Transaction Sender',
      signature: 'Signature',
      signaturepublickey: 'Signature Publickey',
      actionamount: 'Actions',
      atblock: 'Block ID',
      inputtransctionid: 'Please Input a transaction ID',
      inputaccount: 'Please  Input an account',
      connectednode: 'Connect Nodes',
      select: 'Please select'

    }
  },
  zh: {
    message: {
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
      aligntop: '顶部对齐',
      accountinfo: '账户信息',
      transinfo: '交易信息',
      singletransinfo: '单笔交易查询',
      accounttransinfo: '账户交易信息查询',
      nodelist: '节点列表',
      votelist: '投票列表',
      createtime: '创建时间',
      updatetime: '更新时间',
      nodejoin: '节点加入',
      fileupload: '文件上传',
      filedownload: '文件下载',
      nodemonitor: '节点监控',
      ipfsinit: 'IPFS 初始化',
      ipfsconfigure: 'IPFS 配置',
      ipfsrun: '运行 IPFS',
      stop: '停止',
      clusterinit: 'Cluster 初始化',
      clusterrun: 'Cluster 执行',
      clustergenesisrun: 'Cluster  Genesis 执行',
      get: '获取',
      upload: '上传',
      file: '文件',
      download: '下载',
      transaction: '交易',
      balance: '余额',
      ramusage: '内存 使用量',
      cpuusage: 'CPU 使用量',
      netusage: '网络 使用量',
      transamount: '交易量',
      default: '默认',
      transactionid: '交易 ID',
      blockid: '区块 ID',
      transactiontime: '交易时间',
      transactionsender: '交易发起人',
      signature: '签名',
      signaturepublickey: '签名公钥',
      actionamount: 'Action 数量',
      atblock: '所在区块',
      inputtransctionid: '请输入交易ID',
      inputaccount: '请输入账户',
      connectednode: '已连接节点',
      select: '请选择'
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
