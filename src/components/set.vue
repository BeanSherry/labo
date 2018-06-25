<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      :default-active="activeIndex"
      :collapse="isCollapse"
      background-color="#fff">
        <el-menu-item index="1">
          <i class="el-icon-labo-yonghuming"></i>
          <span slot="title">User Settings</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-labo-yonghuming"></i>
          <span slot="title">Profile</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">Emails</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-labo-mima"></i>
          <span slot="title">Password</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
    <router-view/>
    </el-main>
  </el-container>
</template>
<script>
  import pwdEdit from '@/components/pwdEdit'
  import VueRouter from 'vue-router'
  import set from '@/components/Set'
  const router = new VueRouter({
    routes: [
      {
        path: '/set',
        name: 'set',
        component: set,
        children:[
          {
            path: 'pwdEdit',
            name: 'pwdEdit',
            component:pwdEdit
          },
        ]
      },
    ]
  })
  export default{
    name:'set',
    components:{
      pwdEdit,
    },
    data(){
      return {
        isCollapse: false,
        activeIndex:"1"
      };
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      select:function(index) {
        switch (index) {
          case '1':
            this.$router.push({ name: 'set'});
            break;
          case '2':
            this.$router.push({ name: 'set'});
            break;
          case '3':
            this.$router.push({ name: 'set'});
            break;
          case '4':
            this.$router.push({ name: 'pwdEdit'});
            break;
          default:
            break;
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-aside{
    padding:10px 0
  }
  .el-menu-item{
    text-align: left;
    width:100%;
    margin:0;
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item.is-active{
    box-shadow: inset 4px 0 0 #4b4ba3;
    color:#4b4ba3;
  }
</style>















