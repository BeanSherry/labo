<template>
  <el-header height="40px" v-show="!hideHeader" >
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content title-container">
          <h1 class="title">Labo</h1>
          <ul class="list-unstyled">
            <li v-bind:class="{active:active=='/'}">
              <router-link to="/">首页</router-link>
            </li>
            <li v-bind:class="{active:active=='/album'}">
              <router-link to="/album">相册</router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content st-container">
          <ul class="list-unstyled">
            <li class="header-user dropdown">
              <el-dropdown :hide-on-click="true" @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                  <img class="header-user-avatar" :src="img">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>{{nickname}}</el-dropdown-item>
                  <el-dropdown-item>{{email}}</el-dropdown-item>
                  <el-dropdown-item command="setting" divided>Setting</el-dropdown-item>
                  <el-dropdown-item>Help</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>Sign out</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script> 
  export default{
    name:'tab-group', 
    props:[],
    watch:{ 
      '$route':'tabActiveSlider' ,
      hideHeader:function(){
        if(!this.hideHeader){
          let that=this;
          this.$axios.get('/api/identity/info/account')
            .then(function (response) {
              that.img='data:;base64,'+response.data.data.avatar;
              that.email=response.data.data.email;
              that.nickname=response.data.data.nickname;
              that.phone=response.data.data.phone;
            })
            .catch(function (error) {
              that.$message.error(error.message)
          });
        }
      }
    }, 
    data(){ 
      return { 
        'isChange':false,
        'active':this.$route.path,
        'hideHeader':(this.$route.path=='/login'||this.$route.path=='/regist')?true:false,
        'img':'/static/img/images.jpeg',
        'email':'',
        'nickname':'',
        'phone':'',
      }; 
    },
    created:function () {
      if(!this.hideHeader){
        let that=this;
        this.$axios.get('/api/identity/info/account')
          .then(function (response) {
            that.img='data:;base64,'+response.data.data.avatar;
            that.email=response.data.data.email;
            that.nickname=response.data.data.nickname;
            that.phone=response.data.data.phone;
          })
          .catch(function (error) {
            that.$message.error(error.message)
        });
      }
    },
    methods:{ 
      'tabActiveSlider':function(){ 
        this.active=this.$route.path;
        if(this.$route.path=='/login'||this.$route.path=='/regist'){
          this.hideHeader=true;
        }else{
          this.hideHeader=false;
        }
      },
      logout:function(that) {
        that.$axios.get('/api/identity/logout')
        .then(function (response) {
          that.$router.push({ name: 'Login'})
        })
        .catch(function (error) {
          that.$message.error(error.message)
        });
      },
      handleCommand:function(command) {
        switch (command) {
          case 'setting':
            this.$router.push({ name: 'set'})
            break;
          case 'logout':
            this.$options.methods.logout(this);
            break;
          default:
            break;
        }
      }
    }, 
  } 
</script>
<style scoped lang="scss">
  .el-dropdown-menu__item{
    display:block;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .labo-top{
    position:fixed;
    top:0;
    width:100%;
    height:60px;
    background-color:#ebebeb;
  }
  .el-header{
    line-height:40px;
    background:#000;
    color: #fff;
    position: fixed;
    border:none;
    top:0;
    left:0;
    z-index: 2;
    width:100%;
  }
  .title-container,
  .st-container{
    box-sizing: border-box;
    font-size: 18px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    padding-top: 0;
    overflow: visible;
  }
  .st-container{
    font-size:18px;
    justify-content: flex-end;
  }
  a{
    color:inherit;
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    margin: 4px 2px;
    font-size: 12px;
    border-radius: 4px;
    height: 32px;
    font-weight: 600;
  }
  .active>a{
    color: #292961;
    background-color: #fff;
  }
  .title{
    display: -webkit-flex;
    display: flex;
    position: relative;
    font-size: 18px;
    margin:0;
    white-space: nowrap;
  }
  .list-unstyled{
    display: -webkit-flex;
    display: flex;
  }
  .list-unstyled>li{
    display:inline-block;
    line-height: 40px;
    height:40px;
  }
  .el-header{
    color:#fff;
    text-align:left;
  }
  .header-user-avatar{
    height:25px;
    width:25px;
    border-radius: 50%;
    position: absolute;
    top:0;
    margin:auto;
    bottom:0;
    object-fit: cover;
  }
  .el-icon-arrow-down{
    margin-left:30px;
    color:#fff;
    font-weight: bold;
    position: relative;
    top:1px;
  }
</style>
