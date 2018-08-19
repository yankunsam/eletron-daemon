<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('message.accountinfo')" name="first">
      <explorer-account></explorer-account>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.transinfo')" name="second">
      <transaction-info></transaction-info>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.singletransinfo')" name="third">
      <quary-transaction></quary-transaction>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.accounttransinfo')" name="fourth">
      <account-transaction></account-transaction>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.nodelist')" name="fifth">
      <producers></producers>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.votelist')" name="sixth">
      <voter-info></voter-info>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  import ExplorerAccount from './ExplorerAccount'
  import TransactionInfo from './TransactionInfo'
  import QuaryTransaction from './QuaryTransaction'
  import AccountTransaction from './AccountTransaction'
  import Producers from './Producers'
  import VoterInfo from './VoterInfo'
  export default {
    name: 'explorer-card',
    components: {
      ExplorerAccount,
      TransactionInfo,
      QuaryTransaction,
      AccountTransaction,
      Producers,
      VoterInfo
    },
    data () {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
