<template>
  <div>
  <el-select v-model="value" :placeholder="$t('message.select')" align="center" @change="deploy()">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
</template>

<script>
  export default {
    name: 'bios',
    data () {
      return {
        options: [{
          value: 'bios',
          label: 'eosio.bios'
        }, {
          value: 'token',
          label: 'eosio.token'
        }, {
          value: 'system',
          label: 'eosio.system'
        }, {
          value: 'msig',
          label: 'eosio.msig'
        }],
        value: ''
      }
    },
    methods: {
      deploy () {
        console.log(this.value)
        switch (this.value) {
          case 'token':
            console.log('In token')
            var wasm = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.token/eosio.token.wasm`)
            var abi = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.token/eosio.token.abi`)
            this.$eos.setcode('signupforuse', 0, 0, wasm).then(rel => console.log(rel))
            this.$eos.setabi('signupforuse', JSON.parse(abi)).then(rel => console.log(rel))
            break
          case 'bios':
            console.log('In bios')
            wasm = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.bios/eosio.bios.wasm`)
            abi = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.bios/eosio.bios.abi`)
            this.$eosconfig.keyProvider.push('5Hz2G2L9p3k7YhkqGJaioNJQnYKjtZKKS2y3wRLDobCQAtXg5oA')
            this.$eos.setcode('eosio', 0, 0, wasm).then(rel => console.log(rel))
            this.$eos.setabi('eosio', JSON.parse(abi)).then(rel => console.log(rel))
            break
          case 'system':
            console.log('In system')
            wasm = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.system/eosio.system.wasm`)
            abi = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.system/eosio.system.abi`)
            this.$eos.setcode('eosio', 0, 0, wasm).then(rel => console.log(rel))
            this.$eos.setabi('eosio', JSON.parse(abi)).then(rel => console.log(rel))
            break
          case 'msig':
            console.log('In msig')
            wasm = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.msig/eosio.msig.wasm`)
            abi = this.$fs.readFileSync(`/Users/sam/Public/oasis-eos/oasis/contracts/eosio.msig/eosio.msig.abi`)
            this.$eos.setcode('eosio.msig', 0, 0, wasm).then(rel => console.log(rel))
            this.$eos.setabi('eosio.msig', JSON.parse(abi)).then(rel => console.log(rel))
            break
          default:
        }
      }
    }
  }
</script>
