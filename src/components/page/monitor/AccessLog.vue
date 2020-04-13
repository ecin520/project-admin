<template>
  <div class="access-log">
    <el-card>
      <div class="access-log-operation">
        <el-button size="small" type="danger" @click="clearLogs">清空日志</el-button>
      </div>
      <el-table :data="webLogData">
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="id"
          prop="id"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          prop="username"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="描述"
          prop="description"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="方法"
          prop="method"
        ></el-table-column>
        <el-table-column
          align="center"
          label="耗时"
          prop="spendTime"
        ></el-table-column>
        <el-table-column align="center" label="ip" prop="ip"></el-table-column>
        <el-table-column align="center" label="结果" prop="result">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showResultDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="创建时间"
          prop="createTime"
        ></el-table-column>
      </el-table>
    </el-card>
    <el-dialog width="800px" :visible.sync="resultDetailDialog">
    <json-viewer
      :value="resultDetail"
      :expand-depth=2
      copyable
      sort></json-viewer>
    </el-dialog>
  </div>
</template>

<script>
import { listAllWebLogs, deleteAllWebLogs } from "@/api/admin";
export default {
  data() {
    return {
      webLogData: [],
      resultDetail: '',
      resultDetailDialog: false
    };
  },
  methods: {
    clearLogs() {
      deleteAllWebLogs().then(response => {
        this.$message({message: response.message, type: 'success'})
        this.init()
      })
    },
    showResultDetail(index, row) {
      this.resultDetail = JSON.parse(row.result)
      this.resultDetailDialog = true
    },
    init() {
      listAllWebLogs().then(response => {
        let temp = response.content;
        for (let i = 0; i < temp.length; i++) {
          temp[i].spendTime += "ms";
        }
        this.webLogData = temp;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.access-log {
  .access-log-operation {
    margin-bottom: 15px;
  }
}
</style>
