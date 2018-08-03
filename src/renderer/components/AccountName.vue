<template>
<div>
<el-input v-model="input" placeholder="请输入内容" @change="change"></el-input>
</div>
</template>
<script>
export default {
  name: 'account-name',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    change () {
      console.log(this.input)
      this.$router.push({path: '/landing-page'})
    }
  }
}
</script>
