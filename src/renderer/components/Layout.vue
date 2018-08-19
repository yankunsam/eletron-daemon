<template>
  <div>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <el-container>
      <el-main>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('message.contractlist')" name="contracttable">
      <act-info-list v-bind:needed="false"></act-info-list>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.mainnetcontract')" name="bios">
      <bios></bios>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.account')" name="third">
      <system-account></system-account>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.transfer')" name="transfer">
      <transfer></transfer>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.tokencreate')" name="newtoken">
      <new-token></new-token>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.noderegister')" name="test">
      <reg-producer></reg-producer>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.vote')" name="votefor">
      <vote-producer></vote-producer>
    </el-tab-pane>
  </el-tabs>
</el-main>
</el-container>
  </div></el-col>

</el-row>
</div>
</template>
<script>
  import ActInfoList from './ActInfoList'
  import Bios from './Bios'
  import SystemAccount from './SystemAccount'
  import Transfer from './Transfer'
  import NewToken from './NewToken'
  import RegProducer from './RegProducer'
  import VoteProducer from './VoteProducer'
  export default {
    name: 'layout',
    components: {
      ActInfoList,
      Bios,
      SystemAccount,
      Transfer,
      NewToken,
      RegProducer,
      VoteProducer
    },
    data () {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick (tab, event) {
        if (tab.name === 'contracttable') {
          console.log('get the table from chain')
        }
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 260px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
