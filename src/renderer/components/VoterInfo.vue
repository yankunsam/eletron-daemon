<template>
  <div>
  <div>
    <el-button type="text" @click="refresh()">{{ $t('message.refreshlist') }}</el-button>
  </div>
  <el-table
    :data="votersList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="owner">
            <span>{{ props.row.owner }}</span>
          </el-form-item>
          <el-form-item label="proxy">
            <span>{{ props.row.proxy }}</span>
          </el-form-item>
          <el-form-item label="staked">
            <span>{{ props.row.staked }}</span>
          </el-form-item>
          <el-form-item label="last_vote_weight">
            <span>{{ props.row.last_vote_weight}}</span>
          </el-form-item>
          <el-form-item label="proxied_vote_weight">
            <span>{{ props.row.proxied_vote_weight }}</span>
          </el-form-item>
          <el-form-item label="is_proxy">
            <span>{{ props.row.is_proxy }}</span>
          </el-form-item>
          <el-form-item label="producers">
            <span>{{ props.row.producers }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="owner"
      prop="owner">
    </el-table-column>
    <el-table-column
      label="staked"
      prop="staked">
    </el-table-column>
    <el-table-column
      label="proxied_vote_weight"
      prop="proxied_vote_weight">
    </el-table-column>
  </el-table>
</div>
</template>


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
        this.votersList = []
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
