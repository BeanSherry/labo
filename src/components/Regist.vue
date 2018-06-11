<template>
  <div class="regist">
    <el-input placeholder="账号" v-model="phone" clearable>
      <template slot="prepend"><i class="el-icon-labo-yonghuming el-icon-right"></i></template>
    </el-input>
    <el-input placeholder="密码" type="password" v-model="pwd" clearable>
      <template slot="prepend"><i class="el-icon-labo-mima el-icon-right"></i></template>
    </el-input>
    <div class="code-box">
      <el-input placeholder="图片验证码" class="p-code" v-model="code" clearable>
        <template slot="prepend"><i class="el-icon-labo-iconfontshouji el-icon-right"></i></template>
      </el-input>
      <img @click="getImage" :src='kapchas'>
    </div>
    <div class="code-box">
      <el-input placeholder="短信验证码" class="p-code" type="password" v-model="pwd" clearable>
        <template slot="prepend"><i class="el-icon-labo-tupianyanzhengma el-icon-right"></i></template>
      </el-input>
      <el-button class="get-code" plain v-on:click="getMessage">{{codeText}}</el-button>
    </div>
    <el-button type="primary">注册 <i class="el-icon-labo-zhuce-copy el-icon-right"></i></el-button>
    <router-link to="/login">立即登录</router-link>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import md5 from 'js-md5';
  import qs from 'qs';
  export default {
    name: 'Login',
    data () {
      return {
        phone: '',
        pwd: '',
        getCode:false,
        code:'',
        codeText:'获取短信验证码',
        imgId:'1',
        kapchas:'/agentboot/kapcha',
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
          let resToken='';
          let sign=md5(this.phone+pwd+resToken+this.hold+stime)
          axios.post('/api/identity/user/login', qs.stringify({
              user:this.phone,
              pwd:pwd,
              response :resToken,
              stay:this.hold,
              stime:stime,
              sign:sign
            }),{
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          })
          .then(function (response) {
            if(response.data.code==0){
              that.$router.push({ name: 'HelloWorld'})
            }else{
              that.$message.error(response.data.des)
            }
          })
          .catch(function (error) {
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
        },
        getMessage:function(){
          axios.get('/api/identity/message/apply', {
            params: {
              phone: this.phone,
              code:this.code
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        getImage:function(){
          this.kapchas = '/agentboot/kapcha?'+ Math.random();
        }
      }
  }

</script>

<style scoped lang="">
  .regist{
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
    height: 400px;
    margin:auto;
    padding:50px 30px;
    /*background: rgba(0,170,144,.2);*/
    border-radius: 20px;
    box-shadow: 0 0 15px 0 rgba(102,186,183,.2);
  }
  .code-box{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .p-code{
    width: 55%;
  }
  .get-code{
    height: 40px;
  }
  .el-button{
    font-size: 16px;
  }
  img{
    width: 35%;
  }
</style>
