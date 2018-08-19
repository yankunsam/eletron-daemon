<template>
<div>
  <el-radio-group v-model="labelPosition" size="small">
    <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
    <el-radio-button label="right">{{ $t('message.alignright')}}</el-radio-button>
    <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
  </el-radio-group>
  <p>  {{ this.$store.state.Counter.mongodburl }} </p>
  <div style="margin: 20px;"></div>
  <el-form :label-position="labelPosition" label-width="80px" :model="mongodbConfigure">
    <el-form-item label="mongodburl">
      <el-input v-model="mongodbConfigure.mongodburl"></el-input>
    </el-form-item>
  </el-form>
  <div>
    <el-button :plain="true" @click="configureurl">{{ $t('message.mainnetconfig') }}</el-button>
  </div>
</div>
</template>
<script>
export default {
  name: 'mongodb-configure',
  data () {
    return {
      labelPosition: 'right',
      mongodbConfigure: {
        mongodburl: ''
      }
    }
  },
  methods: {
    configureurl () {
      if (this.mongodbConfigure.mongodburl) {
        console.log('In configureurl')
        this.$store.state.Counter.mongodburl = this.mongodbConfigure.mongodburl
      }
    }
  }
}
</script>
