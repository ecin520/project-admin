<template>
  <div class="personal">
    <el-row>
      <el-col :span="8">
        <el-card style="" header="个人信息" class="personal-card">
          <div style="display: flex;justify-content: center;">
            <el-avatar :size="125" :src="avatar"></el-avatar>
          </div>
          <el-divider></el-divider>
          <div>
            <span>ID</span>
            <span style="float: right">10086</span>
            <el-divider></el-divider>
          </div>
          
          <div>
            <span>用户名</span>
            <span style="float: right">唐马撸</span>
            <el-divider></el-divider>
          </div>
          
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="personal-card"> </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    avatar() {
      return this.$store.getters.getUserInfo.avatar;
    }
  }
};
</script>

<style lang="scss">
.personal {
  .personal-card {
    border: none;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    margin: 10px;
  }
}
</style>
