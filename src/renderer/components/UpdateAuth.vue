<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="100px" :model="authUpdate">
  <el-form-item label="account">
    <el-input v-model="authUpdate.account"></el-input>
  </el-form-item>
  <el-form-item label="permission">
    <el-input v-model="authUpdate.permission"></el-input>
  </el-form-item>
  <el-form-item label="publicKey">
    <el-input v-model="authUpdate.publicKey"></el-input>
  </el-form-item>
  <el-form-item label="permissionLevel">
    <el-input v-model="authUpdate.permissionLevel"></el-input>
  </el-form-item>
</el-form>
<div>
  <el-button type="primary" @click="updateAuth">{{ $t('message.updateauth') }}</el-button>
</div>
</div>
</template>
<script>
  export default {
    name: 'update-auth',
    data () {
      return {
        labelPosition: 'right',
        authUpdate: {
          account: 'signupeoseos',
          permission: 'active',
          publicKey: 'EOS8EiNMUAfTEhaqjSR2VZubG5ufbca9gmKDxcp9BgoBgqBhhRojX',
          permissionLevel: 'eosio.code'
        }
      }
    },
    methods: {
      updateAuth () {
        console.log('Update Auth')
        var updateParameter = {
          account: this.authUpdate.account,
          permission: this.authUpdate.permission,
          parent: 'owner',
          auth: {
            threshold: 1,
            keys: [
              {
                key: this.authUpdate.publicKey,
                weight: 1
              }
            ],
            accounts: [
              {
                'permission': {
                  'actor': this.authUpdate.account,
                  'permission': 'eosio.code'
                },
                'weight': 1
              }
            ],
            waits: []
          }
        }
        this.$store.state.Counter.eos.updateauth(updateParameter).then(rel => console.log(rel))
      }
    }
  }
</script>
