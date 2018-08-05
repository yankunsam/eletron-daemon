<template>
<div>
  <el-container>
    <el-header>

    </el-header>
    <el-container>
      <el-aside width="200px">

      </el-aside>
      <el-container>
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="用户管理" name="first">
              <account-name></account-name>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          </el-tabs>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>
<script>
import AccountName from './AccountName'
export default {
  name: 'contract-table',
  components: {
    AccountName
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

<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 1260px;
}

body>.el-container {
  margin-bottom: 4px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
