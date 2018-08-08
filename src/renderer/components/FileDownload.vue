<template>
  <div>
<el-form :inline="true" :model="fileForm" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="fileForm.hash" placeholder="文件Hash"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getFile">下载</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'file-download',
    data () {
      return {
        fileForm: {
          hash: 'Qmaj2NAT56u93dtH6WqDrak8CbGt1kpNLNMSEwwST8kDSN'
        }
      }
    },
    methods: {
      getFile () {
        console.log('In getFile')
        this.$ipfsapi.files.get(this.fileForm.hash, (err, files) => {
          console.log(err)
          files.forEach((file) => {
            console.log(file.path)
            console.log(file.content.toString('utf8'))
          })
        })
      }
    }

  }
</script>
<style>
.el-input__inner {
  background-color: #012
}
</style>
