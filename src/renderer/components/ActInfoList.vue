<template>
  <div>
    <el-button type="text" @click="refrsh()">刷新列表</el-button>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="token"
      label="积分名称"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="maximum_supply"
      label="积分总量"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="issuer"
      label="积分账户"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="合约账户"
      width="180"
      align="center">
    </el-table-column>
  </el-table>
</div>
</template>



<script>
  export default {
    name: 'act-info-list',
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      refresh () {
        console.log('refesh now')
        var actinfolistpara = {
          json: true,
          code: 'sam',
          scope: 'sam',
          table: 'actinfolist'
        }
        this.tableData = []
        // var tableData = []
        this.$eos.getTableRows(actinfolistpara).then(rel => {
          for (var accountitem in rel.rows) {
            for (var tokenitem in (rel.rows[accountitem]).token) {
              var item = rel.rows[accountitem].token[tokenitem]
              var tem = {}
              tem.token = item.token
              tem.maximum_supply = item.maximum_supply
              tem.issuer = item.issuer
              tem.owner = rel.rows[accountitem].owner
              this.tableData.push(tem)
            }
          }
        })
      }
    },
    data () {
      console.log('get the data ')
      return {
        tableData: []
      }
    },
    created () {
      console.log('created')
      this.refesh()
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
