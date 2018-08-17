<template>
  <div>
  <div>
    <el-button type="text" @click="refresh()">刷新列表</el-button>
  </div>
  <el-table
    :data="votersList"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="owner"
      label="owner"
      width="180">
    </el-table-column>
    <el-table-column
      prop="proxy"
      label="proxy"
      width="180">
    </el-table-column>
    <el-table-column
      prop="producers"
      label="producers"
      width="180">
    </el-table-column>
    <el-table-column
      prop="staked"
      label="staked"
      width="180">
    </el-table-column>
    <el-table-column
      prop="last_vote_weight"
      label="last_vote_weight"
      width="180">
    </el-table-column>
    <el-table-column
      prop="proxied_vote_weight"
      label="proxied_vote_weight"
      width="180">
    </el-table-column>
    <el-table-column
      prop="is_proxy"
      label="is_proxy"
      width="180">
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
    name: 'voter-info',
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
        var votersInfoList = {
          json: true,
          code: 'eosio',
          scope: 'eosio',
          table: 'voters'
        }
        this.producerList = []
        this.$eos.getTableRows(votersInfoList).then(rel => {
          for (var voteritem in rel.rows) {
            var tem = {
              producers: []
            }
            tem.owner = rel.rows[voteritem].owner
            tem.proxy = rel.rows[voteritem].proxy
            for (var item in rel.rows[voteritem].producers) {
              tem.producers.push(rel.rows[voteritem].producers[item])
              tem.producers.push(' ')
            }
            // tem.producers = rel.rows[voteritem].producers
            tem.staked = rel.rows[voteritem].staked
            tem.last_vote_weight = rel.rows[voteritem].last_vote_weight
            tem.proxied_vote_weight = rel.rows[voteritem].proxied_vote_weight
            tem.is_proxy = rel.rows[voteritem].is_proxy
            this.votersList.push(tem)
          }
        })
      }
    },
    data () {
      return {
        votersList: []
      }
    }
  }
</script>
