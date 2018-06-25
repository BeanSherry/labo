<template>
  <div id="app"> 
    <el-container>
      <tab></tab>
      <el-main class="nopadding">
        <router-view/>
      </el-main>
      <!-- <el-footer height="40px">@BeanSherry</el-footer> -->
    </el-container> 
  </div>
</template>
<script>
  import tab from '@/components/tab'
  export default {
    name: 'App',
    components:{
      tab
    },
  }
</script>
<style scoped="">

</style>