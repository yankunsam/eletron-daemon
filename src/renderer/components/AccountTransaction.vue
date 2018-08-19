<template>
  <div>
<el-input
  placeholder="请输入账户"
  v-model="account"
  clearable>
</el-input>
<div>
  <el-button :plain="true" @click="transactionsGet">{{ $t('message.get') }}</el-button>
</div>
</div>
</template>
<script>
  export default {
    name: 'account-transaction',
    data () {
      return {
        account: '',
        transactionId: []
      }
    },
    methods: {
      getAllTransactionByAccount () {
        this.$mongoclient.connect(this.$mongodburl, (err, db) => {
          if (err) {
            throw err
          }
          var dbo = db.db('EOS')
          dbo.collection('transactions').count({}, (error, numOfDocs) => {
            if (error) {
              throw error
            }
            console.log('总数', numOfDocs)
            this.numOfDocs = numOfDocs
          })
          dbo.collection('transactions').find({}).sort({_id: -1}).limit(10).toArray((err, result) => {
            if (err) {
              throw err
            }
            console.log(result)
            for (var item in result) {
              // console.log(result[item].hasOwnProperty('trx_id'))
              if (result[item].actions[0].authorization[0].actor !== this.account) {
                break
              }
              var temp = {
                trx_id: result[item].trx_id
              }
              this.transactionId.push(temp)
            }
            db.close()
          })
        })
      },
      transactionsGet () {
        console.log('In transactionsGet', this.account)
        if (this.account === '') {
          console.log('账户名为空')
          this.$message({
            message: '请输入账户名',
            type: 'error'
          })
          return
        }
        this.transactionId = []
        this.getAllTransactionByAccount()
        this.$message({
          message: this.transactionId,
          center: false,
          showClose: true
        })
      }
    }
  }
</script>
