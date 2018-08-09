<template>
  <div>
    <div>
      <el-button type="primary" @click="getAllTransaction">刷新</el-button>
    </div>
  <el-table
    :data="transactionTable"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="Action">
            <span>{{ props.row.action }}</span>
          </el-form-item>
          <el-form-item label="Action数量">
            <span>{{ props.row.actionNum }}</span>
          </el-form-item>
          <el-form-item label="交易 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="交易 ID"
      prop="trx_id">
    </el-table-column>
    <el-table-column
      label="交易时间"
      prop="createdAt">
    </el-table-column>
    <el-table-column
      label="交易发起人"
      prop="who">
    </el-table-column>
  </el-table>
</div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    name: 'transaction-info',
    data () {
      return {
        transactionTable: []
      }
    },
    methods: {
      getAllTransaction () {
        this.$mongoclient.connect(this.$mongodburl, (err, db) => {
          if (err) {
            throw err
          }
          var dbo = db.db('EOS')
          dbo.collection('transactions').find({}).limit(10).toArray((err, result) => {
            if (err) {
              throw err
            }
            console.log(result)
            this.transactionTable.length = 0
            for (var item in result) {
              console.log(result[item].trx_id)
              var temp = {
                trx_id: result[item].trx_id,
                createdAt: result[item].createdAt.toLocaleTimeString(),
                who: result[item].actions[0].authorization[0].actor,
                action: result[item].actions[0].name,
                actionNum: result[item].actions.length
              }
              this.transactionTable.push(temp)
            }
            db.close()
          })
        })
      }
    }
  }
</script>
