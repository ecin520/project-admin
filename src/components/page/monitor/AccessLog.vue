<template>
<div class="access-log">
  <el-card v-loading="loading">
    <div class="access-log-operation">
      <el-button size="small" type="danger" @click="clearLogs">清空日志</el-button>
      <el-button size="small" type="success" @click="init">刷新</el-button>
    </div>
    <el-table size="small" :data="webLogData">
      <el-table-column align="center" label="用户名" prop="username"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="描述" prop="message"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="url" prop="url"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="方法" prop="method"></el-table-column>
      <el-table-column align="center" label="耗时" prop="spendTime">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.spendTime <= 300">{{ scope.row.spendTime }}ms</el-tag>
          <el-tag v-else-if="scope.row.spendTime <= 1000" type="warning">{{ scope.row.spendTime }}ms</el-tag>
          <el-tag v-else type="danger">{{ scope.row.spendTime }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ip" prop="ip"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="结果" prop="result">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showResultDetail(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="float: right; min-height: 50px; margin-top: 20px;" layout="prev, pager, next" @current-change="currentChange" :total="total" :page-size="pageSize" :current-page.sync="currentPage">
    </el-pagination>
  </el-card>
  <el-dialog title="日志详情" :lock-scroll="true" top="30px" width="800px" :visible.sync="resultDetailDialog">
    <json-viewer :value="param" :expand-depth="3" copyable sort></json-viewer>
    <el-card>
      <json-viewer class="access-log-json" :value="resultDetail" :expand-depth="3" copyable sort></json-viewer>
    </el-card>
  </el-dialog>
</div>
</template>

<script>
import {
  listAllWebLogs,
  deleteAllWebLogs
} from "@/api/admin";
export default {
  data() {
    return {
      webLogData: [],
      pageWebLogData: [],
      resultDetail: "",
      param: "",
      resultDetailDialog: false,
      total: 0,
      pageSize: 10,
      loading: true,
      currentPage: 1
    };
  },
  methods: {
    clearLogs() {
      deleteAllWebLogs().then(response => {
        this.$message({
          message: response.message,
          type: "success"
        });
        this.init();
      });
    },
    showResultDetail(index, row) {
      this.resultDetail = JSON.parse(row.result);
      this.param = row.param;
      this.resultDetailDialog = true;
    },
    currentChange(index) {
      let start = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.webLogData = this.pageWebLogData.slice(start, end);
    },
    init() {
      this.loading = true;
      listAllWebLogs().then(response => {
        this.pageWebLogData = response.content;
        this.total = this.pageWebLogData.length;
        if (this.total < this.pageSize) {
          this.webLogData = this.pageWebLogData;
        } else {
          this.webLogData = this.pageWebLogData.slice(0, this.pageSize);
        }
        this.currentPage = 1;
        this.loading = false;
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

  .access-log-json {
    color: #444;
    background: #ffffff !important;
    height: 400px !important;
    overflow: -Scroll;
    overflow-x: hidden;
  }
}
</style>
