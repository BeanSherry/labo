<template>
  <div id="app"> 
    <el-container>
      <el-header height="40px" class="{disnone:hideHeader}">Header</el-header>
      <!-- <el-aside >Aside</el-aside> -->
      <el-main >
        <router-view/>
      </el-main>
      <el-footer height="40px">@BeanSherry</el-footer>
    </el-container> 
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      hideHeader:false
    }
  }
}
</script>

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
