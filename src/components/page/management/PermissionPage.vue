<template>
  <div class="permission">
    <el-card v-loading="loading">
      <div class="crud-permission">
        <el-button size="small" type="success" @click="additionalPermissionClick"
          >添加权限</el-button
        >
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table :data="permissionData">
        <el-table-column
          width="100px"
          label="ID"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="权限名称"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="description"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column align="center" width="120px" label="操作">
          <template slot-scope="scope">
            <el-col :span="12">
              <el-button
                size="mini"
                type="primary"
                @click="editClick(scope.$index, scope.row)"
              >
                <i class="el-icon-edit"></i>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-popconfirm
                confirmButtonText="删除"
                cancelButtonText="取消"
                confirmButtonType="danger"
                cancelButtonType="default"
                icon="el-icon-info"
                iconColor="red"
                title="此操作不可逆，是否删除改用户？"
                @onConfirm="deleteClick(scope.$index, scope.row)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  <i class="el-icon-delete-solid"></i>
                </el-button>
              </el-popconfirm>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="float: right;min-height: 50px;margin-top: 20px;"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-count="total / pageSize + 1"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="权限信息" :visible.sync="permissionDetailDialog" width="650px">
      <el-form
        :model="permissionDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="permissionDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="permissionDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="permissionDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="permissionDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          size="small"
          type="default"
          @click="permissionDetailDialog = false"
        >
          取消
        </el-button>
        <el-button size="small" type="success" @click="modifyPermissionClick">
          修改
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加权限" :visible.sync="additionalPermissionDialog" width="650px">
      <el-form
        :model="insertPermission"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="权限名称">
          <el-input v-model="insertPermission.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="insertPermission.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="additionalPermissionDialog = false">
          取消
        </el-button>
        <el-button size="small" type="success" @click="additionalPermissionConfirmClick">
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listAllPermissions,
  updateByUserId,
  insertPermission,
  countPermission,
  deleteByPermissionId
} from "@/api/permission";
export default {
  data() {
    return {
      permissionData: [],
      permissionDetail: {},
      insertPermission: {},
      loading: true,
      additionalPermissionDialog: false,
      permissionDetailDialog: false,
      total: 7,
      currentPage: 1,
      pageSize: 7
    };
  },
  methods: {
    editClick(index, row) {
      this.permissionDetail = { ...row };
      this.permissionDetailDialog = true;
    },
    deleteClick(index, row) {
      deleteByPermissionId(row.id).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.init();
      });
    },
    additionalPermissionClick() {
      this.additionalPermissionDialog = true;
    },
    additionalPermissionConfirmClick() {
      insertPermission(this.insertPermission).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.additionalPermissionDialog = false;
        this.insertPermission = {};
        this.init();
      });
    },
    modifyPermissionClick() {
      updateByUserId(this.permissionDetail).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.permissionDetailDialog = false;
        this.init();
      });
    },
    currentChange(index) {
      this.currentPage = index;
      this.init();
    },
    init() {
      this.loading = true;
      countPermission().then(response => {
        this.total = response.content;
      });
      listAllPermissions(this.currentPage, this.pageSize).then(response => {
        this.permissionData = response.content;
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
.permission {
  .crud-permission {
    margin-bottom: 15px;
  }
}
</style>
