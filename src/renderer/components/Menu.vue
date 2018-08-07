<template>
<div>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 5px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu router=true :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">EOS</span>
    </template>
            <el-menu-item-group>
              <span slot="title">系统</span>
              <el-menu-item index="/menu/layout">主网</el-menu-item>
              <el-menu-item index="1-2">区块浏览器</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="dAPP">
              <el-menu-item index="1-3">预言机</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">社区云</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
              <el-menu-item index="/menu/ipfsdashboard"> IPFS</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
import SystemAccount from './SystemAccount'
export default {
  name: 'menu',
  components: {
    SystemAccount
  },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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
    line-height: 260px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
