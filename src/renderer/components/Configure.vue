<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div>
<p>chainId: {{ this.$store.state.Counter.config.chainId }}</p>
<p>httpEndpoint: {{ this.$store.state.Counter.config.httpEndpoint }}</p>
<p>privatekey: {{ this.$store.state.Counter.config.keyProvider }}</p>
</div>
<div style="margin: 20px;"></div>

<!-- <div>
<p>chainId: {{ this.$eosconfig.chainId }}</p>
</div> -->
<!-- <div>
  <p>{{ this.$eosconfig.keyProvider }}</p>
  </div> -->
<el-form :label-position="labelPosition" label-width="80px" :model="configurePara">
  <el-form-item label="httpEndpoint">
    <el-input v-model="configurePara.httpEndpoint"></el-input>
  </el-form-item>
  <el-form-item label="chainId">
    <el-input v-model="configurePara.chainId"></el-input>
  </el-form-item>
  <div>
    <div>
      <el-button :plain="true" @click="configureMainnet">{{ $t('message.mainnetconfig') }}</el-button>
    </div>
  </div>
  <el-form-item :label="$t('message.privatekey')">
    <el-input v-model="configurePara.privatekey"></el-input>
  </el-form-item>
  <div>
    <el-button :plain="true" @click="importPrivatekey">{{ $t('message.import') }}</el-button>
  </div>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'configure',
    data () {
      return {
        labelPosition: 'right',
        configurePara: {
          httpEndpoint: '',
          chainId: '',
          privatekey: ''
        }
      }
    },
    methods: {
      configureMainnet () {
        if (this.configurePara.httpEndpoint) {
          this.$store.state.Counter.config.httpEndpoint = this.configurePara.httpEndpoint
          this.$store.commit('create_eos')
        }
        if (this.configurePara.chainId) {
          this.$store.state.Counter.config.chainId = this.configurePara.chainId
          this.$store.commit('create_eos')
        }
      },
      importPrivatekey () {
        if (this.configurePara.privatekey && !this.$store.state.Counter.config.keyProvider.includes(this.configurePara.privatekey)) {
          this.$store.state.Counter.config.keyProvider.push(this.configurePara.privatekey)
          this.$store.commit('create_eos')
        }
      }
    }
  }
</script>
