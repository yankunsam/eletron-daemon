<template>
<div>
  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">左对齐</el-radio-button>
    <el-radio-button label="right">右对齐</el-radio-button>
    <el-radio-button label="top">顶部对齐</el-radio-button>
  </el-radio-group>
  <div>
  <el-button  type="text" @click="getBalance">账户: {{ this.$actor  }}  余额： {{ transferParameter.balance }}</el-button>
</div>
  <el-form :label-position="labelPosition" label-width="80px" :model="transferParameter">
    <el-form-item label="合约账户">
      <el-input v-model="transferParameter.contractAccount"></el-input>
    </el-form-item>
    <el-form-item label="接受者">
      <el-input v-model="transferParameter.accountReceive"></el-input>
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="transferParameter.asset"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="transferParameter.memo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发送</el-button>
    </el-form-item>

  </el-form>
</div>
</template>
<script>
export default {
  name: 'transfer',
  data () {
    return {
      labelPosition: 'right',
      transferParameter: {
        contractAccount: '',
        accountReceive: '',
        asset: '',
        memo: '',
        balance: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$eos.transaction({
        actions: [{
          account: this.transferParameter.contractAccount,
          name: 'transfer',
          authorization: [{
            actor: this.$actor,
            permission: 'active'
          }],
          data: {
            from: this.$actor,
            to: this.transferParameter.accountReceive,
            quantity: this.transferParameter.asset,
            memo: this.transferParameter.memo
          }
        }]
      }).then(rel => console.log(rel))
    },
    getBalance () {
      if (this.transferParameter.contractAccount === '') {
        console.log('合约账户为空,默认为eosio.token')
        this.transferParameter.contractAccount = 'eosio.token'
      }
      this.$eos.getCurrencyBalance(this.transferParameter.contractAccount, this.$actor, 'EOS').then(rel => {
        this.transferParameter.balance = rel[0]
      })
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
    min-height: 1px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
