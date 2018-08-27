<template>
<div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="180px" :model="delegatePara">
  <el-form-item label="from">
    <el-input v-model="delegatePara.from"></el-input>
  </el-form-item>
  <el-form-item label="receiver">
    <el-input v-model="delegatePara.receiver"></el-input>
  </el-form-item>
  <el-form-item label="stake_net_quantity">
    <el-input v-model="delegatePara.netQuantity"></el-input>
  </el-form-item>
  <el-form-item label="stake_cpu_quantity">
    <el-input v-model="delegatePara.cpuQuantity"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="delegateBw">{{ $t('message.delegate') }}</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'delegate',
    data () {
      return {
        labelPosition: 'right',
        delegatePara: {
          from: '',
          receiver: '',
          netQuantity: '',
          cpuQuantity: ''
        }
      }
    },
    methods: {
      delegateBw () {
        console.log('delegate')
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [
                  {
                    actor: this.delegatePara.from,
                    permission: 'active'
                  }
                ],
                data: {
                  from: this.delegatePara.from,
                  receiver: this.delegatePara.receiver,
                  stake_net_quantity: this.delegatePara.netQuantity,
                  stake_cpu_quantity: this.delegatePara.cpuQuantity,
                  transfer: 1
                }
              }
            ]
          }
        ).then(rel => (console.log(rel)))
      }
    }
}
</script>
