<template>
  <div>
    <el-button type="text" @click="refresh()">刷新列表</el-button>
  <el-table
    :data="peersInfo"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="peers"
      label="peers"
      width="680">
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
    name: 'ipfs-monitor',
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
        console.log('refesh ()')
        this.$ipfsapi.swarm.peers((err, peerInfos) => {
          if (err) {
            throw err
          }
          console.log(peerInfos)
        })
      }
    },
    data () {
      return {
        peersInfo: [{
          peers: '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
        },
        {
          peers: '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
        },
        {
          peers: '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
        }
        ]
      }
    }
  }
</script>
