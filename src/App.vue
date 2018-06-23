<template>
  <div id="app"> 
    <el-container>
      <el-header height="40px" v-bind:class="{ disnone: hideHeader }">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content title-container">
              <h1 class="title">Labo</h1>
              <ul class="list-unstyled">
                <li class="active">
                  <router-link to="/">首页</router-link>
                </li>
                <li>
                  <router-link to="/upload">相册</router-link>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content st-container">
              <ul class="list-unstyled">
                <li class="header-user dropdown">
                  <a href="/" class="header-user-dropdown-toggle" data-toggle="dropdown">
                    <img src="">
                  </a>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- <el-aside >Aside</el-aside> -->
      <el-main >
        <router-view ref="login" />
      </el-main>
      <el-footer height="40px">@BeanSherry</el-footer>
    </el-container> 
  </div>
</template>
<script>
export default {
  name: 'App',
  components:{
  },
  data(){
    return {
      imgUrl:'',
      hideHeader:true
    }
  },
  created:function(argument) {
    let that=this;
    this.$axios.get('/api/identity/info/account')
      .then(function (response) {
        console.log(response.data)
        that.imgUrl=response.data.avatar;
      })
      .catch(function (error) {
        that.$message.error(error.message)
    });
  }
}
</script>
<style scoped lang="scss">
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

</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:40px;
}
</style>
