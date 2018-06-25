<template>
  <div class="pwdEdit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>setting</el-breadcrumb-item>
      <el-breadcrumb-item>password</el-breadcrumb-item>
      <el-breadcrumb-item>edit</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pwde-main">
      <el-row>
        <label for="oldpwd">旧密码</label>
        <el-input
          placeholder=""
          name="oldpwd"
          v-model="oldpwd"
          clearable>
        </el-input>
      </el-row>
      <el-row>
        <label for="newpwd">新密码</label>
        <el-input
          prefix="prefix"
          prepend="prepend"
          placeholder=""
          v-model="newpwd"
          clearable>
        </el-input>
        <span>以字母开头，6~20位字母或数字组成</span>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default{
    name:'pwdEdit',
    data(){
      return {
        oldpwd :'',
        newpwd :'',
      };
    },
    methods:{

    }
  }
</script>
<style scoped lang="scss">
  .el-breadcrumb{
    height:40px;
    ling-height:40px;
  }
  .el-input{
    width:200px;
  }
  .el-row{
    text-align:left;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>