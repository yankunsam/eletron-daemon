<template>
<div>
  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
    <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
    <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
  </el-radio-group>
  <div>
  <el-button  type="text" @click="getBalance">{{ $t("message.account") }} : {{ this.$actor  }}  {{ $t('message.amount') }} : {{ transferParameter.balance }}</el-button>
</div>
<div>

</div>
  <el-form :label-position="labelPosition" label-width="180px" :model="transferParameter">
    <el-form-item :label="$t('message.contractaccount')">
      <el-input v-model="transferParameter.contractAccount"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.receiver')">
      <el-input v-model="transferParameter.accountReceive"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.amount')">
      <el-input v-model="transferParameter.asset"></el-input>
    </el-form-item>
    <el-form-item :label="$t('message.memo')">
      <el-input v-model="transferParameter.memo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ $t('message.transfer') }}</el-button>
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
      console.log('actor:->', this.$actor)
      this.$store.state.Counter.eos.transaction({
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
      console.log('new EOS', this.$store.state.Counter.eos)
      console.log('new httpEndpoint', this.$store.state.Counter.config.httpEndpoint)
      if (this.transferParameter.contractAccount === '') {
        console.log('合约账户为空,默认为eosio.token')
        this.transferParameter.contractAccount = 'eosio.token'
      }
      console.log('neweos', this.$store.state.Counter.eos)
      this.$store.state.Counter.eos.getCurrencyBalance(this.transferParameter.contractAccount, this.$actor, 'EOS').then(rel => {
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
