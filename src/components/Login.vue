<template>
  <div class="login">
    <div class="slogen">Labo</div>
    <el-input placeholder="请输入手机号" v-model="phone" clearable>
      <template slot="prepend"><i class="el-icon-labo-iconfontshouji el-icon-right"></i></template>
    </el-input>
    <el-input placeholder="请输入密码" type="password" v-model="pwd" clearable>
      <template slot="prepend"><i class="el-icon-labo-mima el-icon-right"></i></template>
    </el-input>
    <!-- <el-input placeholder="请输入您的手机号" suffix-icon="el-icon-labo-iconfontshouji" v-model="phone" clearable> -->
  </el-input>
    <el-button type="primary" plain>登录 <i class="el-icon-labo-denglu1 el-icon-right"></i></el-button>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      pwd: '',
    }
  }
}

</script>

<style scoped lang="scss">
  .login{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    position: fixed;
    top:20%;
    left:0;
    right:0;
    margin:auto;
    width:360px;
    height: 200px;
    margin:auto;
    padding:50px 30px;
    background: rgba(0,170,144,.2);
    border-radius: 20px;
    box-shadow: 0 0 15px 0 rgba(102,186,183,.2);
  }
  .slogen{
    font-size: 22px;
    color:rgb(102,186,183);
    font-weight:bold;
  }
  .input-group{
    width:100%;
  }
  .el-button{
    font-size: 16px;
    width:100%;
    color:#909399;
    border-color:rgba(220,223,230,1);
  }
  .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{
    background: rgb(102,186,183);
    border-color:rgb(102,186,183);
  }
</style>
