<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="160px" :model="regPara">
  <el-form-item label="producer">
    <el-input v-model="regPara.producer"></el-input>
  </el-form-item>
  <el-form-item label="producer key">
    <el-input v-model="regPara.producer_key"></el-input>
  </el-form-item>
  <el-form-item label="url">
    <el-input v-model="regPara.url"></el-input>
  </el-form-item>
  <el-form-item label="location">
    <el-input v-model="regPara.location"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="registryNode">{{ $t('message.noderegister') }}</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'regproducer',
    data () {
      return {
        labelPosition: 'right',
        regPara: {
          producer: '',
          producer_key: '',
          url: '',
          location: 123
        }
      }
    },
    methods: {
      registryNode () {
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'regproducer',
                authorization: [
                  {
                    actor: this.regPara.producer,
                    permission: 'active'
                  }
                ],
                data: {
                  producer: this.regPara.producer,
                  producer_key: this.regPara.producer_key,
                  url: this.regPara.url,
                  location: Number(this.regPara.location)
                }
              }
            ]
          }
        ).then(rel => console.log(rel))
      }
    }

  }
</script>
