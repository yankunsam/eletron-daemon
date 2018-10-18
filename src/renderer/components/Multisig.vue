<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="proposer">
    <el-input v-model="formLabelAlign.proposer"></el-input>
  </el-form-item>
  <el-form-item label="proposal_name">
    <el-input v-model="formLabelAlign.proposal_name"></el-input>
  </el-form-item>
  <el-form-item label="requested">
    <el-input v-model="formLabelAlign.requested"></el-input>
  </el-form-item>
  <el-form-item label="trx_data">
    <el-input v-model="formLabelAlign.trx_data"></el-input>
  </el-form-item>
</el-form>
<div>
  <el-button type="primary" @click="propose"> Propose</el-button>
</div>
</div>
</template>

<script>
  export default {
    name: 'multisig',
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          proposer: '',
          proposal_name: '',
          requested: '',
          trx_data: '',
          trx: {},
          block: {}
        }
      }
    },
    methods: {
      async getBlock (num) {
        await this.$store.state.Counter.eos.getBlock(num).then(rel => {
          this.block = rel
          console.log(this.block)
        }

        )
      },
      propose () {
        console.log('In propose')
        this.$store.state.Counter.eos.getInfo((error, rel) => {
          console.log(error, rel)
          var chainDate = new Date(rel.head_block_time + 'Z')
          var expiration = new Date(chainDate.getTime() + 60 * 1000)
          // var refblocknum = rel.last_irreversible_block_num & 0xFFFF
          this.getBlock(rel.last_irreversible_block_num)
          this.formLabelAlign.trx.expiration = expiration.toISOString().split('.')[0]
          this.formLabelAlign.trx.ref_block_prefix = this.block.ref_block_prefix
          this.formLabelAlign.trx.max_net_usage_words = 0
          this.formLabelAlign.trx.max_cpu_usage_ms = 0
          this.formLabelAlign.trx.delay_sec = 0
          this.formLabelAlign.trx.context_free_actions = []
          this.formLabelAlign.trx.actions = []
          this.formLabelAlign.trx.transaction_extensions = []
          console.log(this.formLabelAlign.trx.expiration)
        }
        )
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio.msig',
                name: 'propose',
                authorization: [
                  {
                    actor: this.proposer,
                    permission: 'active'
                  }
                ],
                data: {
                  proposer: this.formLabelAlign.proposer,
                  proposal_name: this.formLabelAlign.proposal_name,
                  requested: this.formLabelAlign.requested,
                  trx: this.trx
                }
              }
            ]
          }
        ).then(rel => (console.log(rel)))
      }
    }
  }
</script>
