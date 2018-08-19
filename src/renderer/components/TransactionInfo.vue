<template>
  <div>
    <div>
      <el-button type="primary" @click="getAllTransaction">{{ $t('message.refreshlist') }}</el-button>
      <p> {{ $t('message.default')}}: 10 </p>
      <p>{{ $t('message.transaction') }} {{ $t('message.amount') }}:  {{ this.numOfDocs }}</p>
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
          <el-form-item :label="$t('message.actionamount')">
            <span>{{ props.row.actionNum }}</span>
          </el-form-item>
          <!-- <el-form-item label="交易 ID">
            <span>{{ props.row.trx_id }}</span>
          </el-form-item> -->
          <!-- <el-form-item label="区块 ID">
            <span>{{ props.row.blockId }}</span>
          </el-form-item> -->
          <!-- <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item> -->
          <el-form-item :label="$t('message.atblock')">
            <span>{{ props.row.blockNum }}</span>
          </el-form-item>
          <!-- <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item> -->
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('message.transactionid')"
      prop="trx_id">
    </el-table-column>
    <el-table-column
      :label="$t('message.blockid')"
      prop="blockId">
    </el-table-column>
    <el-table-column
      :label="$t('message.transactiontime')"
      prop="createdAt">
    </el-table-column>
    <el-table-column
      :label="$t('message.transactionsender')"
      prop="who">
    </el-table-column>
    <el-table-column
      :label="$t('message.signature')"
      prop="signatures">
    </el-table-column>
    <el-table-column
      :label="$t('message.signaturepublickey')"
      prop="signing_keys">
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
        numOfDocs: '',
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
            this.transactionTable.length = 0
            console.log(result)
            for (var item in result) {
              // console.log(result[item].hasOwnProperty('trx_id'))
              // TODO: mongodb has block_num block_id, but by mongodb npm , did not.
              var temp = {
                trx_id: result[item].trx_id,
                createdAt: result[item].createdAt.toLocaleTimeString(),
                who: result[item].actions[0].authorization[0].actor,
                action: result[item].actions[0].name,
                actionNum: result[item].actions.length,
                blockId: result[item].block_id,
                blockNum: result[item].block_num,
                signatures: result[item].signatures['0'],
                signing_keys: ('signing_keys' in result[item]) ? result[item].signing_keys['0'] : ''
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
