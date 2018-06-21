<template>
  <div class="login">
    <div class="slogen">Labo</div>
    <el-row class="phone-error ellipsis" v-show="isPhone">{{phoneText}}</el-row>
    <el-input placeholder="账号" v-on:focus="isPhone=false;isIligle=false" v-model="phone" clearable>
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
  import axios from 'axios'
  import $ from 'jquery'
  import qs from 'qs';
  import md5 from 'js-md5';
  export default {
    name: 'Login',
    data () {
      return {
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
        TIMEINTERVAL:0,
        serverText:'用户名不存在或密码错误'
      }
    },
    created:function(argument) {
      let that=this;
      axios.get('/api/general/sys/time/get')
        .then(function (response) {
          that.TIMEINTERVAL=response.data.data-new Date().getTime()
        })
        .catch(function (error) {
          that.$message.error(error.message)
      });
    },
    methods: {
      login: function () {
        if(!/^1[3456789]\d{9}$/.test(this.phone)){
          this.isPhone=true;
          this.phoneText='手机号格式错误';
          // this.$message.error('手机号格式错误')
          return;
        }
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.pwd)){
          this.isPwd=true;
          this.pwdText='密码格式错误';
          return;
        }
        let stime=this.$common.getStime(this.TIMEINTERVAL)
        let pwd=this.$common.md5NHex(this.pwd,stime.substr(stime.length-1,1))
        let that=this;
        let sign=md5(this.phone+pwd+this.resToken+this.hold+stime)
        this.SUBMIT=true;
        axios.post('/api/identity/user/login', qs.stringify({
            user:this.phone,
            pwd:pwd,
            response :this.resToken,
            stay:this.hold,
            stime:stime,
            sign:sign
          }),{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        })
        .then(function (response) {
          that.SUBMIT=false
          if(response.data.code==0){
            that.$router.push({ name: 'HelloWorld'})
          }else{
            // that.$message.error(response.data.des)
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
  $bg_hover:rgb(102,186,183);
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
    top:88px;;
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
    top:134px;
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
<style>
  #app{
    margin:0;
    background-image: url('../assets/image/bg.jpg');
    background-size: cover;
  }
</style>
