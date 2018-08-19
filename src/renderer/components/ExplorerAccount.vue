<template>
<div>
  <div>
    <el-button type="primary" @click="accountRefresh">{{ $t("message.refreshlist") }}</el-button>
  </div>
  <el-table :data="accountTable" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="abi">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="action">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item :label="$t('message.balance')">
            <span>{{ props.row.balance }}</span>
          </el-form-item>
          <el-form-item :label="$t('message.transamount')">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item :label="$t('message.ramusage')">
            <span>{{ props.row.ramUsage }}</span>
          </el-form-item>
          <el-form-item :label="$t('message.cpuusage')">
            <span>{{ props.row.cpuUsage }}</span>
          </el-form-item>
          <el-form-item :label="$t('message.netusage')">
            <span>{{ props.row.netUsage }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.account')" prop="accountname">
    </el-table-column>
    <el-table-column :label="$t('message.createtime')" prop="createtime">
    </el-table-column>
    <el-table-column :label="$t('message.updatetime')" prop="updatetime">
    </el-table-column>
  </el-table>
</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  name: 'explorer-account',
  data () {
    return {
      accountTable: []
    }
  },
  methods: {
    async getAccountInfo (accountDocument) {
      let balance = await this.$store.state.Counter.eos.getCurrencyBalance('eosio.token', accountDocument.name, 'EOS')
      let accountinfo = await this.$store.state.Counter.eos.getAccount(accountDocument.name)
      var temp = {
        accountname: accountDocument.name,
        createtime: accountDocument.createdAt.toLocaleTimeString(),
        updatetime: accountDocument.updatedAt,
        balance: balance[0],
        ramUsage: accountinfo.ram_usage,
        cpuUsage: accountinfo.cpu_limit.used,
        netUsage: accountinfo.net_limit.used

      }
      this.accountTable.push(temp)
    },
    getAllAccount () {
      this.$store.state.Counter.mongoclient.connect(this.$store.state.Counter.mongodburl, (err, db) => {
        if (err) {
          throw err
        }
        var dbo = db.db('EOS')
        dbo.collection('accounts').find({}).toArray((err, result) => {
          if (err) {
            throw err
          }
          this.accountTable.length = 0
          console.log('accounts', result[0].name)
          for (var item in result) {
            this.getAccountInfo(result[item])
          }
          db.close()
        })
      })
    },
    accountRefresh () {
      this.getAllAccount()
    }
  }
}
</script>
