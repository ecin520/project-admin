<template>
  <div class="home-page">
    <el-card style="box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);border: none;">
      <el-row>
        <el-col :span="12">
          <el-card style="width: 450px;height: 200px;overflow: scroll;">
            <el-tag>你好污啊</el-tag>
            <p>她只要说，早点睡吧，我就一声冷汗</p>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="width: 450px;height: 200px;overflow: scroll;">
            <el-tag>美句摘录</el-tag>
            <p>对自己有自信时，不能对别人说「期待」。所谓的「期待」是放弃时的托词，因为别无选择。若缺少这种无奈感，这个词就太虚伪了。 -「冰菓」</p>
          </el-card>
        </el-col>
      </el-row><br>
      <el-row>
        <el-col :span="12">
          <el-card style="width: 450px;height: 200px;overflow: scroll;">
            <el-tag>你好污啊</el-tag>
            <p>体重不过百，不是平胸就是矮，说的好像过百就是大好身材一样。</p>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="width: 450px;height: 200px;overflow: scroll;">
            <el-tag>你好污啊</el-tag>
            <p>她只要说，早点睡吧，我就一声冷汗</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: ""
    };
  },
  created() {}
};
</script>

<style lang="scss"></style>
