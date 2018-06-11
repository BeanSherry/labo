<template>
  <div class="login">
    <div class="slogen">Labo</div>
    <el-input placeholder="账号" v-model="phone" clearable>
      <template slot="prepend"><i class="el-icon-labo-yonghuming el-icon-right"></i></template>
    </el-input>
    <el-input placeholder="密码" type="password" v-model="pwd" clearable>
      <template slot="prepend"><i class="el-icon-labo-mima el-icon-right"></i></template>
    </el-input>
    <el-input placeholder="you don't know" v-model="resToken" clearable>
      <template slot="prepend"><i class="el-icon-labo-smile el-icon-right"></i></template>
    </el-input>
    <!-- <div class="g-recaptcha" data-sitekey="6LcmD10UAAAAAODBg6yb1GUNlNMAe5LL-4FW7f5M"></div> -->
    <el-checkbox v-model="hold">保持登录</el-checkbox>
    <el-button type="primary" v-bind:disabled="SUBMIT" plain v-on:click="login">登录 <i class="el-icon-labo-denglu1 el-icon-right"></i></el-button>
    <router-link to="/regist">立即注册</router-link>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import md5 from 'js-md5';
  import qs from 'qs';
  var TIMEINTERVAL=0;
  // axios.get('/api/general/sys/time/get')
  //   .then(function (response) {
  //     TIMEINTERVAL=response.data.data-new Date().getTime()
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  // });
  export default {
    name: 'Login',
    data () {
      return {
        phone: '',
        pwd: '',
        hold:false,
        resToken:'',
        SUBMIT:false
      }
    },
    methods: {
      login: function () {
        if(!/^1[3456789]\d{9}$/.test(this.phone)){
          this.$message.error('手机号格式错误')
          return;
        }
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.pwd)){
          this.$message.error('密码格式错误')
          return;
        }
        let stime=this.$options.methods.getStime()
        let pwd=this.$options.methods.md5NHex(this.pwd,stime.substr(stime.length-1,1))
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
          this.SUBMIT=true
          if(response.data.code==0){
            that.$router.push({ name: 'HelloWorld'})
          }else{
            that.$message.error(response.data.des)
          }
        })
        .catch(function (error) {
          this.SUBMIT=true
          console.log(error)
        });
      },
      md5NHex:function(pwd,n){
        for(let i=0;i<=n;i++){
          pwd=md5(pwd)
        }
        return pwd
      },
      getStime:function(){
        return (new Date().getTime()+TIMEINTERVAL).toString()
      }
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
