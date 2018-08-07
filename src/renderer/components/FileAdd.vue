<template>
  <div>
<el-form :inline="true" :model="fileForm" class="demo-form-inline">
  <el-form-item label="待上传文件路径">
    <el-input v-model="fileForm.path" placeholder="文件绝对路径"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">上传</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'file-add',
    data () {
      return {
        fileForm: {
          path: '/Users/sam/Public/ipfs-daemon/run.py'
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
