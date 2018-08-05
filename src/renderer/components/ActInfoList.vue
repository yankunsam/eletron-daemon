<template>
  <div>
  <el-table
    :data="tableData2"
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
  </el-table>
</div>
</template>



<script>
  export default {
    name: 'act-info-list',
    props: {
      needed: true
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    },
    data () {
      console.log('get the data')
      var actinfolistpara = {
        json: true,
        code: 'sam',
        scope: 'sam',
        table: 'actinfolist'
      }
      var tableData2 = []
      var tem = {}
      this.$eos.getTableRows(actinfolistpara).then(function (rel) {
        var item = rel.rows[0].token[0]
        tem.token = item.token
        tem.maximum_supply = item.maximum_supply
        tem.issuer = item.issuer
        tableData2.push(tem)
      })
      return {
        tableData2
      }
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
