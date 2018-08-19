<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="newAccountInfo">
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
          ownerkey: '',
          activekey: '',
          accountname: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.newAccountInfo)
        console.log(this.$actor)
        this.$eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'newaccount',
                authorization: [
                  {
                    actor: this.$actor,
                    permission: 'active'
                  }
                ],
                data: {
                  creator: this.$actor,
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
                name: 'buyrambytes',
                authorization: [
                  {
                    actor: this.$actor,
                    permission: 'active'
                  }
                ],
                data: {
                  payer: this.$actor,
                  receiver: this.newAccountInfo.accountname,
                  bytes: 102400000
                }
              },
              {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [
                  {
                    actor: this.$actor,
                    permission: 'active'
                  }
                ],
                data: {
                  from: this.$actor,
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
