<template>
  <div>
<el-form :inline="true" :model="fileForm" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="fileForm.path" placeholder="文件绝对路径"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">{{ $t('message.upload') }}</el-button>
  </el-form-item>
</el-form>
<div>
  <p>{{$t('message.file')}} Hash: {{ fileForm.results }} </p>
</div>
</div>
</template>
<script>
  export default {
    name: 'file-add',
    data () {
      return {
        fileForm: {
          path: '/Users/sam/Documents/test.log',
          results: ''
        }
      }
    },
    methods: {
      onSubmit () {
        var filebuffer = this.$fs.readFileSync(this.fileForm.path)
        var files = [{
          path: this.fileForm.path,
          content: filebuffer
        }
        ]
        this.$ipfsapi.files.add(files, (err, files) => {
          this.fileForm.results = files[0].hash
          console.log('files add err', err)
        })
      }
    }
  }
</script>
