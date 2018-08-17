<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="账户信息" name="first">
      <explorer-account></explorer-account>
    </el-tab-pane>
    <el-tab-pane label="交易信息" name="second">
      <transaction-info></transaction-info>
    </el-tab-pane>
    <el-tab-pane label="单笔交易查询" name="third">
      <quary-transaction></quary-transaction>
    </el-tab-pane>
    <el-tab-pane label="账户交易列表" name="fourth">
      <account-transaction></account-transaction>
    </el-tab-pane>
    <el-tab-pane label="节点列表" name="fifth">
      <producers></producers>
    </el-tab-pane>
    <el-tab-pane label="投票列表" name="sixth">
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
