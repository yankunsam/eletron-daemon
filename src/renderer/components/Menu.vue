<template>
<div>
  <el-container>
    <el-header>
      <div>
        <el-switch
  style="display: block"
  v-model="englishDefault"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="Englist"
  inactive-text="中文"
  @change="languageSelect()">
</el-switch>

      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 5px;">
          <el-radio-button :label="false">{{ $t("message.unfold") }}</el-radio-button>
          <el-radio-button :label="true">{{ $t("message.fold") }}</el-radio-button>
        </el-radio-group>
        <el-menu router=true :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">EOS</span>
    </template>
            <el-menu-item-group>
              <span slot="title">{{ $t("message.system") }}</span>
              <el-menu-item index="/menu/layout">{{ $t("message.mainnet") }}</el-menu-item>
              <el-menu-item index="/menu/explorercard">{{ $t("message.blockexplorer") }}</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group :title="$t('message.Dapp')">
              <el-menu-item index="1-3">{{ $t("message.oracle") }}</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">{{ $t("message.communitycloud") }}</span>
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
      isCollapse: true,
      englishDefault: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    languageSelect () {
      if (!this.englishDefault) {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
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
    line-height: 60px;
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
