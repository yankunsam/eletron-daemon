<template>
<div>
  <el-input type="textarea" autosize placeholder="请输入内容" v-model="trx_id">
  </el-input>
  <div style="margin: 20px 0;"></div>
  <!-- <div>
    <el-button type="primary" @click="transactionGet">查询</el-button>
  </div> -->
  <div>
    <el-button :plain="true" @click="transactionGet">查询</el-button>
  </div>
  <div>

  </div>
</div>
</template>
<script>
export default {
  name: 'quary-transaction',
  data () {
    return {
      trx_id: 'a7dd8b989a066df7b6d7e18d57a8b464a437ef39b94fd077e4d90b5a3faa69d3',
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
          this.message = '账户:  ' + result[0].actions[0].account + ' 执行:  ' + result[0].actions[0].name
        })
      })
    },
    transactionGet () {
      this.getByMongo()
      this.$message({
        message: this.message,
        center: false
      })
    }
  }
}
</script>
  </div>
</template>
