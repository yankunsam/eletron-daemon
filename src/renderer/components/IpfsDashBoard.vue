<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="节点加入" name="nodeJoin">
      <ipfs-net></ipfs-net>
    </el-tab-pane>
    <el-tab-pane label="文件上传" name="fileadd">
      <file-add></file-add>
    </el-tab-pane>
    <el-tab-pane label="文件下载" name="fileget">
      <file-download></file-download>
    </el-tab-pane>
    <el-tab-pane label="节点监控" name="monitor">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import IpfsNet from './IpfsNet'
import FileAdd from './FileAdd'
import FileDownload from './FileDownload'
export default {
  name: 'ipfs-dash-board',
  components: {
    IpfsNet,
    FileAdd,
    FileDownload
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
