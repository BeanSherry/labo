<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in crumb" :key="item.id" :to="item.url" >
      {{item.value}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  export default{
    name:'breadcrumb',
    props:{
      crumb:Array,
    },
    data(){ 
      return {
      }; 
    },
    mounted(){
      this.test();
    },
    methods:{
      test(){
        this.$emit('msg','main');
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-breadcrumb{
    height:40px;
    line-height:40px;
  }
</style>