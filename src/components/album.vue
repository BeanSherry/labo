<template>
<div class="album">
  <mini :menu='menu' :status='status' :menuName="menuName" @select="onSelect"></mini>
  <div class="imgs">
    <div class="img-box" v-bind:class="{ del: selectType==1&&isdel }" v-for="item in imgs">
      <i class="el-icon-circle-close" v-show="selectType==1&&isdel"></i>
      <img :src="item">
    </div>
  </div>
  <input type="file" accept="image/png,image/jpg,image/gif" style="display:none;">
  <el-pagination
    layout="total,prev, pager, next,jumper"
    @current-change="select_page"
    :page-size="100"
    :total="1000">
  </el-pagination>
</div>  
</template>
<script>
  import mini from '@/components/mini'
  import '@/assets/js/grid.js'
  export default{
    name:'album',
    components:{
      mini,
    },
    data(){
      return {
        menuName:'菜单',
        isdel:false,
        selectType:0,
        menu:[
          {'value':'上传'},
          {'value':'删除'},
          {'value':'编辑'},
          {'value':'选择'},
        ],
        status:'del',
        imgs:[
          '/static/img/1.png',
          '/static/img/2.jpg',
          '/static/img/3.jpg',
          '/static/img/4.png',
          '/static/img/5.jpg',
          '/static/img/6.jpg',
          '/static/img/7.jpg',
          '/static/img/8.jpg',
          '/static/img/9.jpg',
          '/static/img/10.jpg',
          '/static/img/11.jpg',
          '/static/img/12.jpg',
          '/static/img/13.jpg',
          '/static/img/14.jpg',
        ],
      }; 
    },
    mounted:function (argument) {
      $(".imgs").pinterest_grid({
        column: 5,
        marginX: 20,
        marginY: 15,
        margin_bottom: 50
      });
    },
    methods:{
      onSelect(index){
        this.selectType=index;
        let that=this;
        switch (index) {
          case 0:
            this.upload(that);
            break;
          case 1:
            this.isdel=!this.isdel;
            break;
          case 2:
            console.log('编辑')
            break;
          case 3:
            console.log('删除')
            break;
          default:
            break;
        }
      },
      upload:function(that) {
        $('input').click();
        $('input').change(function() {
          let reader = new FileReader();
          let AllowImgFileSize = 2100000;
          let file = $(this)[0].files[0];
          let imgUrlBase64;
          if (file) {
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = function (e) {
              if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                that.$message.error( '上传失败，请上传不大于2M的图片！');
                return;
              }else{
                that.$axios.post('/api/operation/image/upload', {
                  file64:reader.result.substring(reader.result.indexOf(",") + 1),
                  name:file.name,
                })
                .then(function (response) {
                  $('input').val('');
                  that.SUBMIT=false
                  if(response.data.code==0){
                  }else{
                    that.$message.error(response.data.des);
                  }
                })
                .catch(function (error) {
                  $('input').val('');
                  that.$message.error(error.message)
                });
              }
            }
          }
        })
      },
      select_page:function (currentPage) {
        console.log('currentPage:',currentPage);
      }
    }
  }
</script>
<style scoped lang="scss">
  .album{
    padding:5px 0;
    width:1200px;
    margin:auto;
  }
  .imgs{
    position:relative;
  }
  .img-box{
    font-size: 0;
    position:absolute;
    border-radius: 20px;
    transform-origin: bottom;
    -webkit-transform-origin: bottom;
    box-shadow: 0 0px 20px .1px rgba(0,0,0,0.4);
    transition:transform 2s;
  }
  .img-box:hover{
    // transform:scale(2);
    // z-index: 1;
  }
  .img-box.del{
    animation: del-move .4s 0s infinite  ease-in-out;
    -webkit-animation: del-move .4s 0s infinite  ease-in-out;
  }
  .img-box.del:nth-child(odd){
    animation:del-move-reverse .4s 0s infinite  ease-in-out;
    -webkit-animation:del-move-reverse .4s 0s infinite  ease-in-out;
  }
  img{
    width: 100%;     
    height:100%;
    height: auto;
    border-radius: 20px;
    object-fit: cover;
  }
  .el-icon-circle-close{
    color:#888;
    cursor:pointer;
    font-size:20px;
    position: absolute;
    top:-10px;
    right:-10px;
  }
  .el-icon-circle-close:hover{
    color:red;
  }
  @keyframes grow
  {
    0% {  
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    60% {  
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    }
    80% {  
      -webkit-transform: scale(0.95);
      transform: scale(0.95);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes del-move
  {
    0% { 
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    25% { 
      -webkit-transform: rotate(-1deg);
      transform: rotate(-1deg);
    }
    50% { 
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    75% {  
      -webkit-transform: rotate(1deg);
      transform: rotate(1deg);
    }
    100% {  
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @keyframes del-move-reverse
  {
    0% { 
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    25% { 
      -webkit-transform: rotate(1deg);
      transform: rotate(1deg);
    }
    50% { 
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    75% {  
      -webkit-transform: rotate(-1deg);
      transform: rotate(-1deg);
    }
    100% {  
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
</style>