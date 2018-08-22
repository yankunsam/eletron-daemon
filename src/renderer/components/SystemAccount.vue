<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="newAccountInfo">
  <el-form-item label="creator">
    <el-input v-model="newAccountInfo.creator"></el-input>
  </el-form-item>
  <el-form-item label="Owner Key">
    <el-input v-model="newAccountInfo.ownerkey"></el-input>
  </el-form-item>
  <el-form-item label="Active Key">
    <el-input v-model="newAccountInfo.activekey"></el-input>
  </el-form-item>
  <el-form-item :label="$t('message.account')">
    <el-input v-model="newAccountInfo.accountname"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">{{ $t("message.create") }}</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'systemaccount',
    data () {
      return {
        labelPosition: 'right',
        newAccountInfo: {
          creator: '',
          ownerkey: '',
          activekey: '',
          accountname: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.newAccountInfo)
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'newaccount',
                authorization: [
                  {
                    actor: this.newAccountInfo.creator,
                    permission: 'active'
                  }
                ],
                data: {
                  creator: this.newAccountInfo.creator,
                  name: this.newAccountInfo.accountname,
                  owner: {
                    threshold: 1,
                    keys: [
                      {
                        key: this.newAccountInfo.ownerkey,
                        weight: 1
                      }
                    ],
                    accounts: [],
                    waits: []
                  },
                  active: {
                    threshold: 1,
                    keys: [
                      {
                        key: this.newAccountInfo.activekey,
                        weight: 1
                      }
                    ],
                    accounts: [],
                    waits: []
                  }
                }
              },
              {
                account: 'eosio',
                name: 'buyram',
                authorization: [
                  {
                    actor: this.newAccountInfo.creator,
                    permission: 'active'
                  }
                ],
                data: {
                  payer: this.newAccountInfo.creator,
                  receiver: this.newAccountInfo.accountname,
                  quant: '2.0000 EOS'
                }
              },
              {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [
                  {
                    actor: this.newAccountInfo.creator,
                    permission: 'active'
                  }
                ],
                data: {
                  from: this.newAccountInfo.creator,
                  receiver: this.newAccountInfo.accountname,
                  stake_net_quantity: '1.0000 EOS',
                  stake_cpu_quantity: '1.0000 EOS',
                  transfer: 1
                }
              }

            ]
          }
        ).then(rel => console.log(rel))
      }
    }
  }
</script>
