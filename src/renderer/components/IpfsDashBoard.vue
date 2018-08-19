<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('message.nodejoin')" name="nodeJoin">
      <ipfs-net></ipfs-net>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.fileupload')" name="fileadd">
      <file-add></file-add>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.filedownload')" name="fileget">
      <file-download></file-download>
    </el-tab-pane>
    <el-tab-pane :label="$t('message.nodemonitor')" name="monitor">
      <ipfs-monitor></ipfs-monitor>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import IpfsNet from './IpfsNet'
import FileAdd from './FileAdd'
import FileDownload from './FileDownload'
import IpfsMonitor from './IpfsMonitor'
export default {
  name: 'ipfs-dash-board',
  components: {
    IpfsNet,
    FileAdd,
    FileDownload,
    IpfsMonitor
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
