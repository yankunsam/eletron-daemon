<template>
<div>
  <div>
    <el-button type="primary" @click="accountRefresh">刷新</el-button>
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
          <el-form-item label="余额">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="交易数目">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="ram">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="cpu">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="net">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="账户名称" prop="accountname">
    </el-table-column>
    <el-table-column label="创建时间" prop="createtime">
    </el-table-column>
    <el-table-column label="更新时间" prop="updatetime">
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
    getAllAccount () {
      this.$mongoclient.connect(this.$mongodburl, (err, db) => {
        if (err) {
          throw err
        }
        var dbo = db.db('EOS')
        dbo.collection('accounts').find({}).toArray((err, result) => {
          if (err) {
            throw err
          }
          console.log(result)
          this.accountTable.length = 0
          for (var item in result) {
            console.log(item)
            var temp = {
              accountname: result[item].name,
              createtime: result[item].createdAt.toLocaleTimeString(),
              updatetime: result[item].updatedAt
            }
            this.accountTable.push(temp)
          }
          db.close()
        })
      })
    },
    accountRefresh () {
      console.log('In accountRefresh()')
      this.getAllAccount()
    }
  }
}
</script>
