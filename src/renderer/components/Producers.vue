<template>
  <div>
  <div>
    <el-button type="text" @click="refresh()">{{ $t('message.refreshlist') }}</el-button>
  </div>
  <el-table
    :data="producerList"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="owner"
      label="owner"
      width="180">
    </el-table-column>
    <el-table-column
      prop="vote"
      label="total_vote"
      width="180">
    </el-table-column>
    <el-table-column
      prop="key"
      label="producer_key">
    </el-table-column>
  </el-table>
</div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    name: 'producers',
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      refresh () {
        var producerslistpara = {
          json: true,
          code: 'eosio',
          scope: 'eosio',
          table: 'producers'
        }
        this.producerList = []
        this.$eos.getTableRows(producerslistpara).then(rel => {
          for (var produceritem in rel.rows) {
            console.log(produceritem)
            var tem = {}
            tem.owner = rel.rows[produceritem].owner
            tem.vote = rel.rows[produceritem].total_votes
            tem.key = rel.rows[produceritem].producer_key
            this.producerList.push(tem)
          }
        })
      }
    },
    data () {
      return {
        producerList: []
      }
    }
  }
</script>
