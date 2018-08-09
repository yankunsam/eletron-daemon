<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="账户信息" name="first">
      <explorer-account></explorer-account>
    </el-tab-pane>
    <el-tab-pane label="交易信息" name="second">
      <transaction-info></transaction-info>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  import ExplorerAccount from './ExplorerAccount'
  import TransactionInfo from './TransactionInfo'
  export default {
    name: 'explorer-card',
    components: {
      ExplorerAccount,
      TransactionInfo
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
