<template>
<div>
  <el-input  autosize :placeholder="$t('message.inputtransctionid')" v-model="trx_id " clearable="true">
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
      await this.$mongoclient.connect(this.$mongodburl, (error, db) => {
        if (error) {
          throw error
        }
        var dbo = db.db('EOS')
        var quary = {
          trx_id: this.trx_id
        }
        dbo.collection('transactions').find(quary).limit(1).toArray((err, result) => {
          if (err) {
            throw err
          }
          console.log('result', result[0])
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
