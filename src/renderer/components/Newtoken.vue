<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="110px" :model="newtokenparameter">
  <el-form-item label="WASM文件路径">
    <el-input v-model="newtokenparameter.wasmpath"></el-input>
  </el-form-item>
  <el-form-item label="ABI文件路径">
    <el-input v-model="newtokenparameter.abipath"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="contractDeploy">合约部署</el-button>
  </el-form-item>
  <el-form-item label="Token 名称">
    <el-input v-model="newtokenparameter.tokenname"></el-input>
  </el-form-item>
  <el-form-item label="总量">
    <el-input v-model="newtokenparameter.maximum_supply"></el-input>
  </el-form-item>
  <el-form-item label="Issuer账户">
    <el-input v-model="newtokenparameter.issuer"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="tokenCreate">创建</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'new-token',
    data () {
      return {
        labelPosition: 'right',
        newtokenparameter: {
          wasmpath: '/Users/sam/Downloads/eosio.token.wasm',
          abipath: '/Users/sam/Downloads/eosio.token.abi',
          tokenname: 'DEMO',
          maximum_supply: '1000.0000 DEMO',
          issuer: 'sam'
        }
      }
    },
    methods: {
      tokenCreate () {
        console.log('In tokenCreate')
        this.$eos.contract(this.$actor).then(rel => {
          console.log(rel)
          rel.create(this.$actor, this.newtokenparameter.maximum_supply).then(relcreate => {
            rel.issue(this.newtokenparameter.issuer, this.newtokenparameter.maximum_supply, 'init issue')
          })
        }
        )
      },
      contractDeploy () {
        console.log('In contractDeploy')
        var wasm = this.$fs.readFileSync(this.newtokenparameter.wasmpath)
        var abi = this.$fs.readFileSync(this.newtokenparameter.abipath)
        this.$eos.setcode(this.$actor, 0, 0, wasm).then(rel => console.log(rel))
        this.$eos.setabi(this.$actor, JSON.parse(abi)).then(rel => console.log(rel))
      }
    }
  }
</script>
