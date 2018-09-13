<template>
<div>
  <el-input  autosize :placeholder="$t('message.inputtransctionid')" v-model="trx_id " :clearable="true">
  </el-input>
  <div style="margin: 20px 0;"></div>
  <div>
    <el-button type="primary" @click="transactionGet">{{ $t('message.get') }}</el-button>
  </div>
  <!-- <div>
    <el-button :plain="true" @click="transactionGet" @onClose="clearMessage">{{ $t('message.get') }}</el-button>
  </div> -->
  <div>

  </div>
</div>
</template>
<script>
export default {
  name: 'quary-transaction',
  data () {
    return {
      trx_id: '',
      message: ''
    }
  },
  methods: {
    async getByMongo () {
      await this.$store.state.Counter.mongoclient.connect(this.$store.state.Counter.mongodburl, (error, db) => {
        if (error) {
          throw error
        }
        var dbo = db.db('EOS')
        var quary = {
          // trx_id: this.trx_id
          // id: '7b216c2c7098973b8ff9c33f5075bac28a4fd29b0d9055c099734899d4fa6aca'
          action_traces: {$elemMatch: {'act.account': 'eosio.token', 'act.data.to': 'eosio.token'}}
        }
        dbo.collection('transaction_traces').find(quary).toArray((err, result) => {
          if (err) {
            throw err
          }
          console.log('result:', result)
          this.message = '|  ' + result[0].actions[0].account + '|   ' + result[0].actions[0].name + '  | Block ID ' + result[0].block_num
        })
      })
    },
    transactionGet () {
      this.getByMongo()
      if (this.trx_id === '') {
        this.$message({
          type: 'error',
          message: '请输入交易 ID'
        })
        return
      }
      this.$message({
        type: 'success',
        showClose: true,
        message: this.message,
        center: false
      })
    },
    clearMessage () {
      this.message = ''
    }
  }
}
</script>
  </div>
</template>
