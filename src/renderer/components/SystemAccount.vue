<template>
  <div>
<el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
  <el-form-item label="owner key">
    <el-input v-model="formInline.user" placeholder="请输入账户owner key"></el-input>
  </el-form-item>
  <el-form-item label="系统账户">
    <el-select v-model="formInline.region" placeholder="系统账户">
      <el-option label="eosio.token" value="shanghai"></el-option>
      <el-option label="eosio.msig" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">创建</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          region: ''
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
