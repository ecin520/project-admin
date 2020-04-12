<template>
  <div class="role">
    <el-card v-loading="loading">
      <div class="crud-role">
        <el-button size="small" type="success" @click="addRoleClick"
          >添加角色</el-button
        >
        <el-button size="small" type="primary" @click="init">刷新</el-button>
      </div>
      <el-table :data="roleData">
        <el-table-column
          width="100px"
          label="ID"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="角色名称"
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
    <el-dialog title="角色信息" :visible.sync="roleDetailDialog" width="650px">
      <el-form
        :model="roleDetail"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="id">
          <el-input v-model="roleDetail.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="roleDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleDetail.description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="roleDetail.createTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          size="small"
          type="default"
          @click="roleDetailDialog = false"
        >
          取消
        </el-button>
        <el-button size="small" type="success" @click="modifyRoleClick">
          修改
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="addRoleDialog" width="650px">
      <el-form
        :model="insertRole"
        size="small"
        :inline="true"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="角色名称">
          <el-input v-model="insertRole.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="insertRole.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="default" @click="addRoleDialog = false">
          取消
        </el-button>
        <el-button size="small" type="success" @click="addRoleConfirmClick">
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listAllRoles,
  updateByUserId,
  insertRole,
  countRole,
  deleteByRoleId
} from "@/api/role";
export default {
  data() {
    return {
      roleData: [],
      roleDetail: {},
      insertRole: {},
      loading: true,
      addRoleDialog: false,
      roleDetailDialog: false,
      total: 7,
      currentPage: 1,
      pageSize: 7
    };
  },
  methods: {
    editClick(index, row) {
      this.roleDetail = { ...row };
      this.roleDetailDialog = true;
    },
    deleteClick(index, row) {
      deleteByRoleId(row.id).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.init();
      });
    },
    addRoleClick() {
      this.addRoleDialog = true;
    },
    addRoleConfirmClick() {
      insertRole(this.insertRole).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.addRoleDialog = false;
        this.insertRole = {};
        this.init();
      });
    },
    modifyRoleClick() {
      updateByUserId(this.roleDetail).then(response => {
        this.$message({ message: response.message, type: "success" });
        this.roleDetailDialog = false;
        this.init();
      });
    },
    currentChange(index) {
      this.currentPage = index;
      this.init();
    },
    init() {
      this.loading = true;
      countRole().then(response => {
        this.total = response.content;
      });
      listAllRoles(this.currentPage, this.pageSize).then(response => {
        this.roleData = response.content;
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
.role {
  .crud-role {
    margin-bottom: 15px;
  }
}
</style>
