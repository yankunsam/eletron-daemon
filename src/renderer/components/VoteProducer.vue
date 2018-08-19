<template>
  <div>
    <div>
      <el-button type="text" @click="refresh()">{{ $t('message.refreshlist') }}</el-button>
    </div>
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">{{ $t('message.alignleft') }}</el-radio-button>
  <el-radio-button label="right">{{ $t('message.alignright') }}</el-radio-button>
  <el-radio-button label="top">{{ $t('message.aligntop') }}</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="160px" :model="votePara">
  <el-form-item label="voter">
    <el-input v-model="votePara.voter"></el-input>
  </el-form-item>
  <el-form-item label="proxy">
    <el-input v-model="votePara.proxy"></el-input>
  </el-form-item>
  <div>
    <el-select v-model="votedproducers" multiple placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
</div>
<div>{{this.votedproducers}}</div>

  <el-form-item>
    <el-button type="primary" @click="VoteProducer">{{ $t('message.vote') }}</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    name: 'voteproducer',
    data () {
      return {
        labelPosition: 'right',
        votePara: {
          voter: '',
          proxy: '',
          producers: []
        },
        options: [
        ],
        votedproducers: []
      }
    },
    methods: {
      getProducers () {
        var producerslistpara = {
          json: true,
          code: 'eosio',
          scope: 'eosio',
          table: 'producers'
        }
        this.producerList = []
        this.$eos.getTableRows(producerslistpara).then(rel => {
          for (var produceritem in rel.rows) {
            console.log(produceritem)
            var tem = {}
            var label = rel.rows[produceritem].owner
            tem.value = label
            tem.label = label
            this.options.push(tem)
          }
        })
      },
      refresh () {
        this.getProducers()
      },
      VoteProducer () {
        this.$eos.transaction(
          {
            actions: [
              {
                account: 'eosio',
                name: 'voteproducer',
                authorization: [
                  {
                    actor: this.votePara.voter,
                    permission: 'active'
                  }
                ],
                data: {
                  voter: this.votePara.voter,
                  proxy: this.votePara.proxy,
                  producers: this.votedproducers
                }
              }
            ]
          }
        ).then(rel => console.log(rel))
      }
    }

  }
</script>
