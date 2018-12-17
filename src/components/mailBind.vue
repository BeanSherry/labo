<template> 
  <div class="mailBind">
    <breadcrumb :crumb='bdcrumb'></breadcrumb>
    <div class="pwde-main">
      <el-row>
        <el-row class="main-label" v-if="userDate.email==''">请输入有效的邮箱地址：</el-row>
        <el-row class="main-label" v-else>已绑定邮箱：</el-row>
        <el-input
          v-on:focus="isMail=false;"
          v-model="userDate.email"
          value="userDate.mail"
          type="mail"
          clearable>
        </el-input>
        <span class="mail-error" v-show="isMail">{{mailText}}</span>
      </el-row>
      <el-row>
        <el-button v-if="userDate.email==''" type="default" v-bind:disabled="SUBMIT" plain v-on:click="mailBind">确定</el-button>
        <el-button v-else type="default" v-bind:disabled="SUBMIT" plain v-on:click="mailBind">更改</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
  import breadcrumb from '@/components/breadcrumb'
  export default{
    name:'mailBind',
    props:['userDate'],
    components:{
      breadcrumb
    },
    data(){ 
      return {
        SUBMIT:false,
        mail:'',
        isMail:false,
        mailText:'',
        bdcrumb:[
          {'value':'首页',url:'/'},
          {'value':'User Settings'},
          {'value':'bind mai'},
        ]
      }; 
    },
    created:function () {
      this.$emit('changeActive','3');
    },
    methods:{
      mailBind:function(argument) {
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z]{2,5}$$/.test(this.userDate.email)){
          this.isMail=true;
          this.mailText='邮箱格式错误';
          return;
        }
        let that=this;
        this.SUBMIT=true;
        this.$axios.post('/monkey/identity/mail/bind', {
          mail:this.userDate.email
        })
        .then(function (response) {
          that.SUBMIT=false
          if(response.data.code==0){
            that.$message({
              message: '绑定成功,请前往邮箱激活',
              type: 'success'
            });
          }else{
            that.isIligle=true;
            that.$message.error(response.data.des);
          }
        })
        .catch(function (error) {
          that.SUBMIT=false
          that.$message.error(error.message)
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  .pwde-main{
    text-align: left;
  }
  .main-label{
    margin-bottom: 10px;
  }
  .el-input,
  .el-button{
    width:300px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .mail-error{
    color:red;
  }
</style>