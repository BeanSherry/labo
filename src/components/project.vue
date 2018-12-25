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
        <el-menu-item index="0">
          <i class="el-icon-labo-yonghuming"></i>
          <span slot="title">个人项目</span>
        </el-menu-item>
        <el-menu-item index="1">
          <i class="el-icon-labo-tool"></i>
          <span slot="title">工具类网站</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-labo-chuangyi"></i>
          <span slot="title">创意类网站</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-labo-keji"></i>
          <span slot="title">技术类网站</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="pro-main">
      <div class="onloading" v-if="onloading">
        <i class="el-icon-loading"></i>
      </div>
      <div class="pro-box" v-else>
        <ul class="pro-list" >
          <li v-for="(item,key) in proList">
            <a class="pro-link" :href="item.url" target="_blank">
              <img v-if="item.image" class="pro-img" :src="item.image">
              <img v-else class="pro-img" :src="defaultPic">
              <div class="pro-info">
                <div class="pro-name ellipsis">{{item.name}}</div>
                <div class="pro-des ellipsis">{{item.des? item.des : '暂无简介'}}</div>
              </div>
            </a>
          </li>
        </ul>
        <el-pagination
          layout="total,prev, pager, next,jumper"
          @current-change="select_page"
          :current-page='current'
          :page-size="size"
          :total="total"
          v-if="total > 0">
        </el-pagination>
        <div v-else>暂无数据</div>
      </div>
      
    </el-main>
  </el-container>
</template>
<script>
  export default{
    name:'project',
    data(){ 
      return {
        isCollapse: false,
        activeIndex:"0",
        current:1,
        size:15,
        total:0,
        onloading:true,
        proList:[],
        defaultPic:'/static/img/pro-personal.png'
      };
    },
    methods:{
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      select:function(index) {
        let that=this;
        that.onloading=true;
        that.activeIndex=index;
        that.current=1;
        that.total=0;
        this.getProject();
        switch(index){
          case '0':
            that.defaultPic='/static/img/pro-personal.png';
            break;
          case '1':
            that.defaultPic='/static/img/pro-util.png';
            break;
          case '2':
            that.defaultPic='/static/img/pro-idea.png';
            break;
          case '3':
            that.defaultPic='/static/img/pro-skill.png';
            break;
          default:
            break;
        }
      },
      select_page:function (currentPage) {
        this.current=currentPage;
        this.getProject();
      },
      getProject(){
        let that=this;
        that.onloading=true;
        that.$axios.get('/monkey/operation/info/project/other/get', {
          params: {
            type:that.activeIndex,
            current:that.current,
            size:that.size,
            total:that.total,
          }
        })
        .then(function (response) {
          if(response.data.code==0){
            that.onloading=false;
            that.proList=response.data.data.dataList;
            that.total=response.data.data.totalCount;
          }else{
            that.$message.error(response.data.des);
          }
        })
        .catch(function (error) {
          that.$message.error(error.message)
        });
      }
    },
    created:function(){
      this.getProject();
    }
  }
</script>
<style scoped lang="scss">
  .el-aside{
    padding:10px 0;
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
  .pro-main{
    min-width:1000px;
    padding-top:0;
  }
  .onloading{
    margin-top:80px;
  }
  .onloading>i{
    font-size: 30px;
  }
  .pro-box{
    width:1000px;
    margin:auto;
  }
  .pro-list{
    text-align: left
  }
  .pro-list>li{
    display: block;
    padding:0 20px;
  }
  .pro-list>li+li{
    border-top:dotted 1px #ebebeb;
  }
  .pro-link{
    display: block;
    padding:20px 0;
  }
  .pro-list>li:hover{
    background:#f6f6f6;
  }
  .pro-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float:left;
  }
  .pro-info{
    margin-left: 60px;
    font-size: 12px;
    color: #646464;
    line-height: 22px;
    height:40px;
    padding:5px 0;
  }
  .pro-name{
    font-weight: 600;
    color: #444;
    font-size: 16px;
    line-height: 18px;
  }
</style>