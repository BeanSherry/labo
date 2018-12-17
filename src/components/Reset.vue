<template>
  <div class="reset">
    <div class="slogen">重置密码</div>
    <div class="l-group">
      <el-row class="l-error ellipsis" v-show="isPhone">{{phoneText}}</el-row>
      <el-input placeholder="手机号" maxlength="11" v-model="phone" v-on:focus="isPhone=false;isIligle=false" clearable>
        <template slot="prepend"><i class="el-icon-labo-iconfontshouji el-icon-right"></i></template>
      </el-input>
    </div>
    <div class="l-group">
      <el-row class="l-error ellipsis" v-show="isPwd">{{pwdText}}</el-row>
      <el-input placeholder="密码" v-on:focus="isPwd=false;isIligle=false" v-bind:type=" showPwd ? 'text' : 'password' " v-model="pwd" clearable>
        <template slot="prepend"><i class="el-icon-labo-mima el-icon-right"></i></template>
      </el-input>
      <i  v-on:click="showP" v-bind:class="[showPwd ? 'el-icon-labo-kejian3' : 'el-icon-labo-bukejian' ,'el-icon-eye']"></i>
    </div>
    <div class="code-box">
      <el-input placeholder="图片验证码" class="p-code" v-model="code" clearable>
        <template slot="prepend"><i class="el-icon-labo-code el-icon-right"></i></template>
      </el-input>
      <img @click="getImage" :src='kapchas'>
    </div>
    <div class="code-box">
      <el-input placeholder="短信验证码" class="p-code" type="password" v-model="messageCode" clearable>
        <template slot="prepend"><i class="el-icon-labo-tupianyanzhengma el-icon-right"></i></template>
      </el-input>
      <el-button class="get-code" plain v-bind:disabled="GETMESS" v-on:click="getMessage">{{codeText}}</el-button>
    </div>
    <el-button class="reg-btn" type="primary" v-bind:disabled="SUBMIT" plain v-on:click="reset">重置 <i class="el-icon-labo-denglu1 el-icon-right"></i></el-button>
    <router-link to="/login">立即登录</router-link>
  </div>
</template>
<script>
  import $ from 'jquery'
  import qs from 'qs';
  export default {
    name: 'Reset',
    data () {
      return {
        phone: '',
        uname: '',
        pwd: '',
        getCode:false,
        SUBMIT:false,
        GETMESS:false,
        code:'',
        codeText:'获取短信验证码',
        imgId:'1',
        kapchas:'/monkey/identity/kapcha',
        messageCode:'',
        isPhone:false,
        phoneText:'',
        isName:false,
        nameText:'',
        isPwd:false,
        pwdText:'',
        isIligle:false,
        serverText:'用户名不存在或密码错误',
        showPwd:false
      }
    },
    methods: {
      showP(){
        this.showPwd=!this.showPwd;
      },
      reset: function () {
        if(!/^1[3456789]\d{9}$/.test(this.phone)){
          this.isPhone=true;
          this.phoneText='手机号格式错误';
          return;
        }
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.pwd)){
          this.isPwd=true;
          this.pwdText='密码格式错误';
          return;
        }
        if(!/\d{4}/.test(this.code)){
          this.$message.error('请输入图片验证码')
          return;
        }
        if(!/\d{4}/.test(this.messageCode)){
          this.$message.error('请输入短信验证码')
          return;
        }
        let pwd=this.$common.md5NHex(this.pwd,0)
        let that=this;
        this.SUBMIT=true;
        this.$axios.post('/monkey/identity/password/reset', qs.stringify({
            phone:this.phone,
            code:this.messageCode,
            pwd:pwd
          }),{
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        })
        .then(function (response) {
          that.SUBMIT=false
          if(response.data.code==0){
            that.$router.push({ name: 'Login'})
          }else{
            that.$message.error(response.data.des)
          }
        })
        .catch(function (error) {
          that.SUBMIT=false
          that.$message.error(error.message)
        });
      },
      getMessage:function(){
        let that=this;
        let num=59;
        if(!/\d{4}/.test(this.code)){
          this.$message.error('请输入图片验证码')
          return;
        }
        this.GETMESS=true;
        this.$axios.get('/monkey/identity/message/apply', {
          params: {
            phone: this.phone,
            code:this.code
          }
        })
        .then(function (response) {
          if(response.data.code==0){
            let clock=setInterval(function(argument) {
              num--;
              if(num>0){
                that.codeText=num+'秒后重新获取';
              }else{
                clearInterval(clock);
                that.GETMESS=false;
                that.codeText='获取短信验证码';
                num=59;
              }
            }, 1000)
          }else{
            that.$message.error(response.des)
          }
          
        })
        .catch(function (error) {
          that.GETMESS=false;
          that.$message.error(error.message)
          return;
        });
      },
      getImage:function(){
        this.kapchas = '/monkey/identity/kapcha?'+ Math.random();
      }
    }
  }
</script>
<style scoped lang="scss">
  $bg_hover:rgb(102,186,183);
  a{
    color: #42b983;
  }
  .l-error{
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
  }
  .l-group{
    position: relative;
    width:100%;
  }
  .el-icon-eye{
    height:10px;
    font-size: 10px;
    position:absolute;
    top:0;
    bottom:0;
    right:30px;
    margin:auto;
    cursor: pointer;
    color:#909399;
  }
  .reset{
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
    background: rgba(0,170,144,.2);
    border-radius: 20px;
    box-shadow: 0 0 15px 0 rgba(102,186,183,.2);
  }
  .slogen{
    font-size: 22px;
    color:$bg_hover;
    font-weight:bold;
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
    width:40%;
    padding-left:0;
    padding-right:0;
    text-align:center;
  }
  .el-button{
    font-size: 16px;
  }
  .reg-btn{
    font-size: 16px;
    width:100%;
    color:#909399;
    border-color:rgba(220,223,230,1);
  }
  .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{
    background: $bg_hover;
    border-color:$bg_hover;
  }
  img{
    width: 35%;
    height: 40px;
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
    top:106px;;
  }
  .server-error{
    top:234px;
    align-self:center;
    background: transparent;
    padding:0;
  }
  .uname-error{
    top:152px;
  }
  .pwd-error{
    top:170px;
  }
</style>
