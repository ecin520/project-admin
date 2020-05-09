<template>
<div class="login">
  <el-card class="login-card">
    <p class="login-title">软件项目管理系统后台</p>
    <el-input class="login-item" prefix-icon="el-icon-user" placeholder="username" v-model="username"></el-input>
    <el-input show-password class="login-item" prefix-icon="el-icon-lock" placeholder="password" v-model="password"></el-input>
    <span>
      <el-col :span="12">
        <el-input maxlength="5" placeholder="请输入右侧验证码" class="login-item" v-model="code"></el-input>
      </el-col>
      <el-col :span="12">
        <img @click="refresh" :src="codeUrl" class="login-item check-code" />
      </el-col>
    </span>
    <el-button v-loading="loading" class="login-item" type="primary" @click="loginClick">登录</el-button>
  </el-card>
</div>
</template>

<script>
import {
  login,
  register
} from "@/api/basic";
import {
  createImageCode
} from "@/api/common";
export default {
  data() {
    return {
      imageUrl: "http://106.15.200.82/source/1585296275841.jpg",
      username: "",
      password: "",
      code: "",
      codeUrl: '',
      loading: false
    };
  },
  methods: {
    refresh() {
      this.codeUrl = '/api/common/createImageCode?d=' + new Date() * 1
    },
    loginClick() {
      this.loading = true;

      if (this.username === "" || this.password === "") {
        this.$message({
          message: "请输入正确格式",
          type: "error"
        });
        this.loading = false;
        return;
      }

      login(this.username, this.password, this.code)
        .then(response => {
          if (response.code === 200) {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            this.$store.dispatch("login", {
              token: response.token,
              userInfo: response.user
            });
            this.loading = false;
            this.$router.push({
              path: "/"
            });
          }
        })
        .catch(error => {
          this.refresh();
          this.loading = false;
          console.log(error);
        });

    }
  },
  created() {

    let that = this;
    document.onkeydown = e => {
      let key = window.event.keyCode;
      if (key === 13) {
        that.loginClick();
      }
    };

    this.refresh()

  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 170px;
  background-color: #1fc8db;
  background-image: linear-gradient(141deg,
      #e8f0ec 0%,
      #c0dadd 51%,
      #a5d4e6 75%);
  // background: url("https://cloud.qqshabi.cn/api/images/api.php");
  // background: url("https://api.ixiaowai.cn/api/api.php");
  // background: url("http://www.dmoe.cc/random.php");
  // background: url('https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture');
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-color: rgba(41, 50, 39, 1);

  .login-card {
    padding: 10px;
    width: 400px;
    height: 350px;
    border: none;
    background: transparent;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);

    .login-title {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      text-align: center;
      color: deepskyblue;
      font-size: 1.5em;
    }

    .login-logo {
      width: 50%;
      margin-left: 20%;
    }

    .login-item {
      margin: 9px;
      width: 100%;
    }

    .check-code {
      float: right;
      width: 120px;
      border: 1.5px solid #1fc8db;
      border-radius: 4px;
    }

    .check-code:hover {
      cursor: pointer;
    }
  }
}
</style>
