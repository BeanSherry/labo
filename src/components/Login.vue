<template ref="login" hideHeader='true'>
  <div class="login">
    <div class="slogen">Labo</div>
    <el-row class="phone-error ellipsis" v-show="isPhone">{{phoneText}}</el-row>
    <el-input placeholder="手机号或邮箱" v-on:focus="isPhone=false;isIligle=false" v-model="phone" clearable>
      <template slot="prepend"><i class="el-icon-labo-yonghuming el-icon-right"></i></template>
    </el-input>
    <el-row class="pwd-error ellipsis" v-show="isPwd">{{pwdText}}</el-row>
    <el-input placeholder="密码" v-on:focus="isPwd=false;isIligle=false" type="password" v-model="pwd" clearable>
      <template slot="prepend"><i class="el-icon-labo-mima el-icon-right"></i></template>
    </el-input>
    <router-link class="forget-pwd" to="/reset">忘记密码</router-link>
    <el-input placeholder="you don't know" v-model="resToken" clearable>
      <template slot="prepend"><i class="el-icon-labo-smile el-icon-right"></i></template>
    </el-input>
    <!-- <div class="g-recaptcha" data-sitekey="6LcmD10UAAAAAODBg6yb1GUNlNMAe5LL-4FW7f5M"></div> -->
    <el-row class="server-error ellipsis" v-show="isIligle">{{serverText}}</el-row>
    <el-checkbox v-model="hold">保持登录</el-checkbox>
    <el-button type="primary" v-bind:disabled="SUBMIT" plain v-on:click="login">登录 <i class="el-icon-labo-denglu1 el-icon-right"></i></el-button>
    <router-link to="/regist">立即注册</router-link>
  </div>
</template>
<script>
  import $ from 'jquery'
  import md5 from 'js-md5';
  export default {
    name: 'Login',
    data () {
      return {
        hideHeader:false,
        phone: '',
        pwd: '',
        hold:false,
        resToken:'',
        SUBMIT:false,
        isPhone:false,
        phoneText:'',
        isPwd:false,
        pwdText:'',
        isIligle:false,
        hideHeaderL:this.hideHeader,
        serverText:'用户名不存在或密码错误'
      }
    },
    methods: {
      login: function () {
        if(!/^1[3456789]\d{9}$/.test(this.phone) && !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z]{2,5}$$/.test(this.phone)){
          this.isPhone=true;
          this.phoneText='账号格式错误';
          return;
        }
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.pwd)){
          this.isPwd=true;
          this.pwdText='密码格式错误';
          return;
        }
        let stime=this.$common.getStime()
        let pwd=this.$common.md5NHex(this.pwd,stime.substr(stime.length-1,1))
        let that=this;
        let sign=md5(this.phone+pwd+this.resToken+this.hold+stime)
        this.SUBMIT=true;
        this.$axios.post('/api/identity/user/login', {
          user:this.phone,
          pwd:pwd,
          response :this.resToken,
          stay:this.hold,
          stime:stime,
          sign:sign
        })
        .then(function (response) {
          that.SUBMIT=false
          if(response.data.code==0){
            that.$router.push({ name: 'Home'})
          }else{
            that.isIligle=true;
            that.serverText=response.data.des;
          }
        })
        .catch(function (error) {
          that.SUBMIT=false
          that.$message.error(error.message)
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  a{
    color: #42b983;
  }
  $bg_hover:rgb(102,186,183);
  .el-header{
    display:none;
    background:red;
  }
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
    height: 300px;
    margin:auto;
    padding:50px 30px;
    background: rgba(0,170,144,.2);
    border-radius: 20px;
    box-shadow: 0 0 15px 0 rgba(102,186,183,.2);
  }
  .slogen{
    font-size: 22px;
    color:$bg_hover;
    font-weight:bold;
  }
  .el-row{
    color:#f1403c;
    position: absolute;
    background: #fff;
    z-index: 1;
    height: 38px;
    line-height: 38px;
    padding:0 30px;
    max-width: 200px;
    align-self:flex-end;
  }
  .phone-error{
    top:87px;;
  }
  .server-error{
    top:234px;
    align-self:center;
    background: transparent;
    padding:0;
  }
  .forget-pwd{
    align-self:flex-end;
  }
  .pwd-error{
    top:133px;
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
    background: $bg_hover;
    border-color:$bg_hover;
  }
  .el-checkbox{
    width:100%;
    text-align: right;
  }
  .g-recaptcha,
  .g-recaptcha > div,
  iframe{
    width: 100% !important;
  }
</style>
