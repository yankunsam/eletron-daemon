<template>
  <div>
  <el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="150px" :model="ipfsNodeParameter">
  <el-form-item label="Bootstrap">
    <el-input v-model="ipfsNodeParameter.bootstrap"></el-input>
  </el-form-item>
  <el-form-item label="CLUSTER_SECRET">
    <el-input v-model="ipfsNodeParameter.secret"></el-input>
  </el-form-item>
  <el-form-item label="IPFS 路径">
    <el-input v-model="ipfsNodeParameter.ipfsPath"></el-input>
  </el-form-item>
  <el-form-item label="CLUSTER 路径">
    <el-input v-model="ipfsNodeParameter.clusterPath"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button-group>

    <!-- <el-button type="primary" @click="onSubmit">加入</el-button> -->
    <el-button type="primary" @click="ipfsInit">ipfs初始化</el-button>
    <el-button type="primary" @click="ipfsManageConfig">ipfs配置</el-button>
    <el-button type="primary" @click="ipfsRun">ipfs运行</el-button>

    <el-button type="primary" @click="ipfsStop">停止</el-button>

  </el-button-group>
</el-form-item>
<el-form-item>
  <el-button-group>

  <!-- <el-button type="primary" @click="onSubmit">加入</el-button> -->
  <el-button type="primary" @click="clusterInit">cluster初始化</el-button>
  <!-- <el-button type="primary" @click="ipfsManageConfig">cluster配置</el-button> -->
  <el-button type="primary" @click="clusterRun">cluster运行</el-button>
  <el-button type="primary" @click="clusterStop">cluster停止</el-button>

</el-button-group>
</el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'ipfs-net',
    data () {
      return {
        labelPosition: 'right',
        ipfsNodeParameter: {
          bootstrap: '/ip4/124.127.156.41/tcp/9096/ipfs/QmaHXGdDRrB5yL7CJdcSjc3d1W4eDJVjyr8Dt5Z2rtZQcW',
          secret: 'd491c65d91326e9d07423da0b23355495b0fff0a4da36e2933d23e3430322a98',
          ipfsPath: '/usr/local/bin/ipfs',
          clusterPath: '/usr/local/bin/ipfs-cluster-service'
        }
      }
    },
    methods: {
      ipfsInit () {
        this.$cmd.get(this.$ipfsinit, function (err, data, stderr) {
          console.log('ipfsInit()')
          console.log(err)
        })
      },
      ipfsManageConfig () {
        var cmdlist = this.$ipfsmanageconfig + ' --key ' + 'Bootstrap ' + '--value ' + '\'["' + this.ipfsNodeParameter.bootstrap + '"]\''
        console.log('ipfsmanageconfig: ', cmdlist)
        this.$cmd.get(cmdlist, function (err, data, stderr) {
          console.log('ipfs manageconfig return message', data)
          console.log(err)
        })
      },
      ipfsRun () {
        this.$cmd.get(this.$ipfsrun, function (err, data, stderr) {
          console.log(data)
          console.log(err)
        })
      },
      clusterInit () {
        this.$cmd.get(this.$clusterinit, function (err, data, stderr) {
          console.log('clusterInit()')
          console.log(err)
        })
      },
      clusterRun () {
        this.$cmd.get(this.$clusterrun, function (err, data, stderr) {
          console.log(data)
          console.log(err)
        })
      },
      onSubmit () {
        console.log('submit!')
      },
      ipfsStop () {
        this.$cmd.get(this.$ipfsstop, function (err, data, stderr) {
          console.log(data)
          console.log(err)
        })
      },
      clusterStop () {
        this.$cmd.get(this.$clusterstop, function (err, data, stderr) {
          console.log(data)
          console.log(err)
        })
      }
    }
  }
</script>
