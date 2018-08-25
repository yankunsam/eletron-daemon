<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="buyRamParameter">
  <el-form-item label="payer">
    <el-input v-model="buyRamParameter.payer"></el-input>
  </el-form-item>
  <el-form-item label="receiver">
    <el-input v-model="buyRamParameter.receiver"></el-input>
  </el-form-item>
  <el-form-item label="quant">
    <el-input v-model="buyRamParameter.quant"></el-input>
  </el-form-item>
</el-form>
<el-button type="primary" @click="buyRam()">{{ $t('message.buyram') }}</el-button>
</div>
</template>
<script>
  export default {
    name: 'buy-ram',
    data () {
      return {
        labelPosition: 'right',
        buyRamParameter: {
          payer: '',
          receiver: '',
          quant: ''
        }
      }
    },
    methods: {
      buyRam () {
        console.log('buyram')
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'buyram',
                authorization: [
                  {
                    actor: this.buyRamParameter.payer,
                    permission: 'active'
                  }
                ],
                data: {
                  payer: this.buyRamParameter.payer,
                  receiver: this.buyRamParameter.receiver,
                  quant: this.buyRamParameter.quant
                }

              }
            ]
          }
        ).then(rel => (
          console.log(rel)
        ))
      }
    }
  }
</script>
