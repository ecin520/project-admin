<template>
<div class="user">
  <el-card v-loading="loading">
    <div class="crud-user">
      <el-button size="small" type="success" @click="addUserDialog = true">添加用户</el-button>
      <el-button size="small" type="danger" @click="deleteBatchUserClick">删除用户</el-button>
      <el-button size="small" type="primary" @click="init">刷新</el-button>
    </div>
    <el-table @selection-change="handleSelectionChange" size="small" :data="userData">
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" width="65px" prop="id" label="ID"></el-table-column>
      <el-table-column align="center" width="100px" prop="username" label="用户名"></el-table-column>
      <el-table-column align="center" width="70px" prop="avatar" label="头像">
        <template slot-scope="scope">
          <el-avatar :size="40" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="nickname" label="昵称"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="note" label="备注"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="loginTime" label="登陆时间"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch :disabled="true" :value="scope.row.status === 1 ? true : false" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="editClick(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-popconfirm confirmButtonText="删除" cancelButtonText="取消" confirmButtonType="danger" cancelButtonType="default" icon="el-icon-info" iconColor="red" title="此操作不可逆，是否删除改用户？" @onConfirm="deleteClick(scope.$index, scope.row)">
              <el-button slot="reference" size="mini" type="danger">
                <i class="el-icon-delete-solid"></i>
              </el-button>
            </el-popconfirm>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="float: right;min-height: 50px;margin-top: 20px;" layout="prev, pager, next" @current-change="currentChange" :total="total" :page-size="pageSize" :current-page="currentPage" :page-count="total / pageSize + 1">
    </el-pagination>
  </el-card>

  <el-dialog title="用户信息" :visible.sync="userDetailDialog" width="650px">
    <el-form size="small" :inline="true" label-width="80px" label-position="right" :model="userDetail">
      <el-form-item label="头像">
        <el-avatar :size="40" :src="userDetail.avatar"></el-avatar>
      </el-form-item>
      <el-form-item label="">
        <el-input style="width: 425px" v-model="userDetail.avatar"></el-input>
      </el-form-item>
      <el-form-item label="id">
        <el-input v-model="userDetail.id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userDetail.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userDetail.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userDetail.nickname"></el-input>
      </el-form-item>
      <el-form-item label="注释">
        <el-input v-model="userDetail.note"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input :disabled="true" v-model="userDetail.createTime"></el-input>
      </el-form-item>
      <el-form-item label="登陆时间">
        <el-input :disabled="true" v-model="userDetail.loginTime"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="userDetail.status" :active-value="1" :inactive-value="0">
          active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="角色">
        <el-select style="width: 485px" v-model="userRoles" multiple placeholder="选择角色">
          <el-option v-for="item in allRoles" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="附加权限">
        <el-select style="width: 485px" v-model="userAdditionalPermissions" multiple placeholder="选择附加权限">
          <el-option v-for="item in allUserAdditionalPermissions" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="small" type="default" @click="userDetailDialogCancle">
        取消
      </el-button>
      <el-button size="small" type="danger" @click="modifyUserClick">
        修改
      </el-button>
    </div>
  </el-dialog>
  <el-dialog title="添加用户" :visible.sync="addUserDialog" width="650px">
    <el-form size="small" :inline="true" label-width="80px" label-position="right" :model="insertUser">
      <el-form-item label="用户名">
        <el-input v-model="insertUser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input style="width: 192px" show-password v-model="insertUser.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="insertUser.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="insertUser.nickname"></el-input>
      </el-form-item>
      <el-form-item label="注释">
        <el-input v-model="insertUser.note"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="small" type="default" @click="addUserDialog = false">
        取消
      </el-button>
      <el-button size="small" type="success" @click="addUserClick">
        添加
      </el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  listAllUsers,
  updateByUserId,
  insertUser,
  countUser,
  deleteByUserId,
  deleteByUserAndRoleId,
  insertUserRole,
  insertUserAdditionalPermission,
  deleteByUserAndAdditionalPermissionId
} from "@/api/user";
import {
  listAllAdditionalPermissionsById,
  listAllRolesById
} from "@/api/admin";
import {
  listAllRoles
} from "@/api/role";
import {
  listAllAdditionalPermissions
} from "@/api/permission";

export default {
  data() {
    return {
      userData: [],
      userDetail: {},
      userDetailBack: {},
      insertUser: {},
      userRoles: [],
      userRolesBack: [],
      userAdditionalPermissions: [],
      userAdditionalPermissionsBack: [],
      selectedUsers: [],
      allRoles: [],
      allUserAdditionalPermissions: [],
      roleMap: null,
      additionalPermissionMap: null,
      loading: true,
      userDetailDialog: false,
      deleteDialog: false,
      addUserDialog: false,
      total: 7,
      currentPage: 1,
      pageSize: 7
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedUsers = val;
    },
    editClick(index, row) {
      this.userDetail = {
        ...row
      };
      this.userDetailBack = {
        ...row
      };

      listAllRolesById(this.userDetail.id).then(response => {
        this.userRoles = [];
        let content = response.content;
        for (let i = 0; i < content.length; i++) {
          this.userRoles.push(content[i].name);
        }
        this.userRolesBack = JSON.stringify(this.userRoles);
      });

      listAllRoles().then(response => {
        this.allRoles = response.content;
        this.roleMap = new Map();
        for (let i = 0; i < this.allRoles.length; i++) {
          this.roleMap.set(this.allRoles[i].name, this.allRoles[i].id);
        }
      });
      listAllAdditionalPermissionsById(this.userDetail.id).then(response => {
        this.userAdditionalPermissions = [];
        let content = response.content;
        for (let i = 0; i < content.length; i++) {
          this.userAdditionalPermissions.push(content[i].name);
        }
        this.userAdditionalPermissionsBack = JSON.stringify(
          this.userAdditionalPermissions
        );
      });

      listAllAdditionalPermissions().then(response => {
        this.allUserAdditionalPermissions = response.content;
        this.additionalPermissionMap = new Map();
        for (let i = 0; i < this.allUserAdditionalPermissions.length; i++) {
          this.additionalPermissionMap.set(
            this.allUserAdditionalPermissions[i].name,
            this.allUserAdditionalPermissions[i].id
          );
        }
      });

      this.userDetailDialog = true;
    },
    deleteClick(index, row) {
      deleteByUserId(row.id).then(response => {
        this.init();
        this.$message({
          message: response.message,
          type: "success"
        });
      });
    },
    deleteBatchUserClick() {
      if (this.selectedUsers.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择删除项"
        });
        return;
      }
      this.$confirm("此操作将永久删除用户, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let select = this.selectedUsers;
          for (let index = 0; index < select.length; index++) {
            const id = select[index].id;
            deleteByUserId(id).then(response => {});
          }
          this.init();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    modifyUserClick() {
      let that = this;
      let flag = false;
      if (
        JSON.stringify(this.userDetail) !== JSON.stringify(this.userDetailBack)
      ) {
        console.log(this.userDetail);
        updateByUserId(this.userDetail).then(response => {
          console.log(response);
          that.userDetailDialog = false;
          that.init();
        });
        flag = true;
      }
      if (JSON.stringify(this.userRoles) !== this.userRolesBack) {
        let temp = JSON.parse(this.userRolesBack);
        let add = [];
        let sub = [];
        for (let i of temp) {
          let sign = false;
          for (let j of this.userRoles) {
            if (i === j) {
              sign = true;
              break;
            }
          }
          if (sign === false) {
            sub.push(i);
          }
        }

        for (let i of this.userRoles) {
          let sign = false;
          for (let j of temp) {
            if (i === j) {
              sign = true;
              break;
            }
          }
          if (sign === false) {
            add.push(i);
          }
        }
        add.forEach(element => {
          insertUserRole({
            userId: this.userDetail.id,
            roleId: this.roleMap.get(element)
          }).then(response => {
            console.log(response);
          });
        });
        sub.forEach(element => {
          deleteByUserAndRoleId(
            this.userDetail.id,
            this.roleMap.get(element)
          ).then(response => {
            console.log(response);
          });
        });
        flag = true;
      }
      if (
        JSON.stringify(this.userAdditionalPermissions) !==
        this.userAdditionalPermissionsBack
      ) {
        let temp = JSON.parse(this.userAdditionalPermissionsBack);
        let add = [];
        let sub = [];
        for (let i of temp) {
          let sign = false;
          for (let j of this.userAdditionalPermissions) {
            if (i === j) {
              sign = true;
              break;
            }
          }
          if (sign === false) {
            sub.push(i);
          }
        }

        for (let i of this.userAdditionalPermissions) {
          let sign = false;
          for (let j of temp) {
            if (i === j) {
              sign = true;
              break;
            }
          }
          if (sign === false) {
            add.push(i);
          }
        }
        add.forEach(element => {
          insertUserAdditionalPermission({
            userId: this.userDetail.id,
            additionalPermissionId: this.additionalPermissionMap.get(element)
          }).then(response => {
            console.log(response);
          });
        });
        sub.forEach(element => {
          deleteByUserAndAdditionalPermissionId(
            this.userDetail.id,
            this.additionalPermissionMap.get(element)
          ).then(response => {
            console.log(response);
          });
        });
        flag = true;
      }
      if (!flag) {
        this.$message({
          message: "信息无改动",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "信息修改成功",
        type: "success"
      });
      this.userDetailDialog = false;
    },
    userDetailDialogCancle() {
      this.userDetailDialog = false;
    },
    addUserClick() {
      insertUser(this.insertUser).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        });
        this.insertUser = {};
        this.addUserDialog = false;
        this.init();
      });
    },
    currentChange(index) {
      this.currentPage = index;
      this.init();
    },
    init() {
      this.loading = true;
      countUser().then(response => {
        this.total = response.content;
      });
      listAllUsers(this.currentPage, this.pageSize).then(response => {
        this.userData = response.content;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.init();
  },
  computed: {}
};
</script>

<style lang="scss">
.user {
  .crud-user {
    margin-bottom: 15px;
  }
}
</style>
