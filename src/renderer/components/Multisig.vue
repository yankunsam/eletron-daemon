<template>
  <div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="proposer">
    <el-input v-model="formLabelAlign.proposer"></el-input>
  </el-form-item>
  <el-form-item label="proposal_name">
    <el-input v-model="formLabelAlign.proposal_name"></el-input>
  </el-form-item>
  <el-form-item label="requested">
    <el-input v-model="formLabelAlign.requested"></el-input>
  </el-form-item>
  <el-form-item label="trx">
    <el-input v-model="formLabelAlign.trx"></el-input>
  </el-form-item>
</el-form>
<div>
  <el-button type="primary" @click="propose"> Propose</el-button>
</div>
</div>
</template>

<script>
  export default {
    name: 'multisig',
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          proposer: '',
          proposal_name: '',
          requested: '',
          trx: ''
        }
      }
    },
    methods: {
      propose () {
        console.log('In propose')
      }
    }
  }
</script>
