<template>
  <div>
    <el-button type="text" @click="refresh()">{{ $t('message.refreshlist') }}</el-button>
  <el-table
    :data="peersInfo"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="peers"
      label="已连接节点"
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
          this.peersInfo.length = 0
          for (var item in peerInfos) {
            // console.log(peerInfos[item].peer._idB58String)
            var temp = {
              peers: peerInfos[item].peer._idB58String
            }
            this.peersInfo.push(temp)
          }
        })
      }
    },
    data () {
      return {
        peersInfo: []
      }
    }
  }
</script>
