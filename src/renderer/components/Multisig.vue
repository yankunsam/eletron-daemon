<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 25px;"></div>
<el-form :label-position="labelPosition" label-width="90px" :model="formLabelAlign">
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
<div>
  <el-radio-group v-model="labelPosition2" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition2" label-width="80px" :model="formLabelAlign">
  <el-form-item label="scope">
    <el-input v-model="formProposal.scope"></el-input>
  </el-form-item>
  <el-form-item label="proposal_name">
    <el-input v-model="formProposal.proposal_name"></el-input>
  </el-form-item>
  <el-form-item label="packed_transaction">
    <el-input v-model="formProposal.packed_transaction"></el-input>
  </el-form-item>
  <el-form-item label="data">
    <el-input v-model="formProposal.data"></el-input>
  </el-form-item>
  <el-form-item label="transaction">
    <el-input v-model="formProposal.transaction"></el-input>
  </el-form-item>
</el-form>
<div>
  <el-button type="primary" @click="getProposal"> GetPropose</el-button>
</div>
</div>
<div>
  <el-radio-group v-model="labelPosition3" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition3" label-width="80px" :model="formLabelAlign">
  <el-form-item label="proposer">
    <el-input v-model="formApprove.proposer"></el-input>
  </el-form-item>
  <el-form-item label="proposal_name">
    <el-input v-model="formApprove.proposal_name"></el-input>
  </el-form-item>
  <el-form-item label="level">
    <el-input v-model="formApprove.level.actor"></el-input>
  </el-form-item>
  <el-form-item label="actor">
    <el-input v-model="formApprove.actor"></el-input>
  </el-form-item>
</el-form>
<div>
  <el-button type="primary" @click="approveProposal"> ApprovePropose</el-button>
</div>
</div>

<div>
  <el-radio-group v-model="labelPosition4" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition4" label-width="80px" :model="formLabelAlign">
  <el-form-item label="proposer">
    <el-input v-model="formExec.proposer"></el-input>
  </el-form-item>
  <el-form-item label="proposal_name">
    <el-input v-model="formExec.proposal_name"></el-input>
  </el-form-item>
  <el-form-item label="executer">
    <el-input v-model="formExec.executer"></el-input>
  </el-form-item>
</el-form>
</div>
<div>
  <div>
    <el-button type="primary" @click="executerProposal"> ExecuterPropose</el-button>
  </div>
</div>
</div>
</template>

<script>
  export default {
    name: 'multisig',
    data () {
      return {
        labelPosition: 'right',
        labelPosition2: 'right',
        labelPosition3: 'right',
        labelPosition4: 'right',
        formLabelAlign: {
          proposer: 'eosio',
          proposal_name: 'test',
          requested: [
            {
              'actor': 'samsamsamsam',
              'permission': 'active'
            },
            {
              'actor': 'samkunnbanb1',
              'permission': 'active'
            },
            {
              'actor': 'samkunnbanb2',
              'permission': 'active'
            }
          ],
          trx_data: '',
          trx: {
            'transaction_header': {}
          },
          block: {
          }
        },
        formProposal: {
          scope: 'eosio',
          proposal_name: '',
          packed_transaction: '',
          data: '',
          transaction: ''
        },
        formApprove: {
          proposer: 'eosio',
          proposal_name: 'test',
          level: {
            actor: '',
            permission: 'active'
          },
          actor: ''
        },
        formExec: {
          proposer: 'eosio',
          proposal_name: '',
          executer: 'eosio'
        }
      }
    },
    methods: {
      async getBlockAsync (num) {
        let rel = await this.$store.state.Counter.eos.getBlock(num)
        console.log('In getBlock')
        // console.log(rel)
        this.formLabelAlign.trx.ref_block_prefix = rel.ref_block_prefix
        console.log(this.formLabelAlign.trx)
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio.msig',
                name: 'propose',
                authorization: [
                  {
                    actor: this.formLabelAlign.proposer,
                    permission: 'active'
                  }
                ],
                data: {
                  proposer: this.formLabelAlign.proposer,
                  proposal_name: this.formLabelAlign.proposal_name,
                  requested: this.formLabelAlign.requested,
                  trx: this.formLabelAlign.trx
                }
              }
            ]
          }
        ).then(rel => (console.log(rel)))
      },
      propose () {
        console.log('In propose')
        this.$store.state.Counter.eos.getInfo((error, rel) => {
          if (error) {
            console.log(error)
          }
          // console.log(error, rel)
          var chainDate = new Date(rel.head_block_time + 'Z')
          var expiration = new Date(chainDate.getTime() + 600 * 1000)
          console.log('expiration: ->', expiration)
          var refblocknum = rel.last_irreversible_block_num & 0xFFFF
          this.formLabelAlign.trx.expiration = expiration.toISOString().split('.')[0]
          this.formLabelAlign.trx.ref_block_num = refblocknum
          this.formLabelAlign.trx.ref_block_prefix = this.formLabelAlign.block.ref_block_prefix
          this.formLabelAlign.trx.max_net_usage_words = 0
          this.formLabelAlign.trx.max_cpu_usage_ms = 0
          this.formLabelAlign.trx.delay_sec = 0
          this.formLabelAlign.trx.context_free_actions = []
          this.formLabelAlign.trx.actions = [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [
                {
                  actor: 'samsamsamsam',
                  permission: 'active'
                },
                {
                  actor: 'samkunnbanb1',
                  permission: 'active'
                },
                {
                  actor: 'samkunnbanb2',
                  permission: 'active'
                }
              ],
              data: {
                from: 'samsamsamsam',
                to: 'eosio',
                quantity: '12.0000 EOS',
                memo: 'By Sam'
              }
            }
          ]
          this.formLabelAlign.trx.transaction_extensions = []
          this.getBlockAsync(rel.last_irreversible_block_num)
        }
        )
      },
      getProposal () {
        console.log('In getProposal')
        var proposalpara = {
          json: true,
          code: 'eosio.msig',
          scope: this.formProposal.scope,
          table: 'proposal'
        }
        this.$store.state.Counter.eos.getTableRows(proposalpara).then(rel => {
          for (var proposalitem in rel.rows) {
            if (rel.rows[proposalitem].proposal_name === this.formProposal.proposal_name) {
              this.formProposal.packed_transaction = rel.rows[proposalitem].packed_transaction
            }
          }
        })
        console.log(this.$store.state.Counter.eos)
        this.$store.state.Counter.eos.getTest(this.formProposal.packed_transaction).then(rel => {
          console.log('getTest', rel)
          this.formProposal.data = rel.test
          var abipara = {
            code: 'eosio.token',
            action: 'transfer',
            binargs: this.formProposal.data
          }
          this.$store.state.Counter.eos.abiBinToJson(abipara).then(rel => {
            console.log(rel.args)
            this.formProposal.transaction = '[from: ]' + rel.args.from + '[ to: ]' + rel.args.to + '[ quantity: ]' + rel.args.quantity + '[ memo: ]' + rel.args.memo
          })
        })
      },
      approveProposal () {
        console.log('In approveProposal')
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio.msig',
                name: 'approve',
                authorization: [
                  {
                    actor: this.formApprove.actor,
                    permission: 'active'
                  }
                ],
                data: {
                  proposer: this.formApprove.proposer,
                  proposal_name: this.formApprove.proposal_name,
                  level: this.formApprove.level
                }
              }
            ]
          }
        ).then(rel => console.log(rel))
      },
      executerProposal () {
        console.log('In executerProposal')
        this.$store.state.Counter.eos.transaction(
          {
            actions: [
              {
                account: 'eosio.msig',
                name: 'exec',
                authorization: [
                  {
                    actor: this.formExec.executer,
                    permission: 'active'
                  }
                ],
                data: {
                  proposer: this.formExec.proposer,
                  proposal_name: this.formExec.proposal_name,
                  executer: this.formExec.executer
                }
              }
            ]
          }
        )
      }
    }
  }
</script>
