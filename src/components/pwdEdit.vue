<template>
  <div class="pwdEdit">
    <breadcrumb :crumb='bdcrumb'></breadcrumb>
    <div class="pwde-main">
      <el-row>
        <label for="oldpwd">旧密码</label>
        <el-input
          v-on:focus="isOldpwd=false;isIligle=false"
          maxlength=20
          name="oldpwd"
          v-model="oldpwd"
          type="password"
          clearable>
        </el-input>
        <span class="pwd-error" v-show="isOldpwd">{{oldText}}</span>
      </el-row>
      <el-row>
        <label for="newpwd">新密码</label>
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            <p v-for="item in content">
              <i :class="item.icon"></i>{{item.value}}
            </p>
          </div>
          <el-input
            v-on:focus="isNewpwd=false;isIligle=false"
            prefix="prefix"
            prepend="prepend"
            maxlength=20
            v-model="newpwd"
            type="password"
            clearable>
          </el-input>
        </el-tooltip>
        <span class="pwd-error" v-show="isNewpwd">{{newText}}</span>
      </el-row>
      <el-row class="server-error ellipsis" v-show="isIligle">{{serverText}}</el-row>
      <el-row>
        <label></label>
        <el-button type="default" v-bind:disabled="SUBMIT" plain v-on:click="pwdUpdate">确定</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
  import breadcrumb from '@/components/breadcrumb'
  export default{
    name:'pwdEdit',
    components:{
      breadcrumb
    },
    watch:{ 
      'newpwd':'changeStatus' 
    }, 
    data(){
      return {
        oldpwd :'',
        newpwd :'',
        SUBMIT:false,
        isOldpwd:false,
        oldText:'',
        isNewpwd:false,
        newText:'',
        isIligle:false,
        serverText:'',
        bdcrumb:[
          {'value':'首页',url:'/'},
          {'value':'User Settings'},
          {'value':'password edit'},
        ],
        content:[
          {'value':'以字母开头','icon':'el-icon-labo-yuan-copy'},
          {'value':'支持数字和大小写字母','icon':'el-icon-labo-yuan-copy'},
          {'value':'长度为6～20位字符','icon':'el-icon-labo-yuan-copy'},
        ]
      };
    },
    created:function () {
      this.$emit('changeActive','4');
    },
    methods:{
      changeStatus:function(argument) {
        if(/^[a-zA-Z]/.test(this.newpwd)){
          this.content[0].icon='el-icon-labo-duiconverted';
        }else{
          this.content[0].icon='el-icon-labo-cuoconverted';
        }
        if(/^[a-zA-Z0-9]+$/.test(this.newpwd)){
          this.content[1].icon='el-icon-labo-duiconverted';
        }else{
          this.content[1].icon='el-icon-labo-cuoconverted';
        }
        if(/.{6,20}/.test(this.newpwd)){
          this.content[2].icon='el-icon-labo-duiconverted';
        }else{
          this.content[2].icon='el-icon-labo-cuoconverted';
        }
      },
      pwdUpdate:function(argument) {
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.oldpwd)){
          this.isOldpwd=true;
          this.oldText='密码格式错误';
          return;
        }
        if(!/^[a-zA-Z](?![a-zA-Z]+$)[0-9A-Za-z]{5,19}$/.test(this.newpwd)){
          this.isNewpwd=true;
          this.newText='密码格式错误';
          return;
        }
        if(this.oldpwd==this.newpwd){
          this.isNewpwd=true;
          this.newText='新旧密码不可相同';
          return;
        }
        let stime=this.$common.getStime()
        let oldpwd=this.$common.md5NHex(this.oldpwd,stime.substr(stime.length-1,1))
        let newpwd=this.$common.md5NHex(this.newpwd)
        let that=this;
        this.SUBMIT=true;
        this.$axios.post('/monkey/identity/password/update', {
          oldpwd:oldpwd,
          newpwd:newpwd,
          stime:stime
        })
        .then(function (response) {
          that.SUBMIT=false
          if(response.data.code==0){
            
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
    },
  }
</script>
<style scoped lang="scss">
  .pwde-main{
    margin:10px 0;
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
  i{
    font-size: 10px;
  }
  .el-icon-labo-yuan-copy{
    transform:scale(.5);
    color:#888;
  }
  .el-icon-labo-cuoconverted{
    color:red;
    transform:scale(.8);
  }
  .el-icon-labo-duiconverted{
    color:green;
    transform:scale(.8);
  }
  .pwd-error{
    color:red;
  }
  label{
    width:50px;
    display:inline-block;
  }
  .el-button{
    width:200px;
  }
</style>