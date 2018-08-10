<template>
<div class="album">
  <mini :menu='menu' :status='status' :menuName="menuName" @select="onSelect"></mini>
  <div class="btn-group">
    <el-button type="danger" plain :class="{active:type==2}" @click="slelct_type(2)">全部</el-button>
    <el-button type="danger" plain :class="{active:type==0}" @click="slelct_type(0)">隐私</el-button>
    <el-button type="danger" plain :class="{active:type==1}" @click="slelct_type(1)">公共</el-button>
  </div>
  <div class="imgs">
    <div class="img-box" v-bind:class="{ del: selectType==2||selectType==1 }" v-for="(item,key) in imgs" :mid="item.id">
      <i class="el-icon-labo-weixuanzhong1" :data-id="key" v-show="selectType==2||selectType==1" :index="key" @click="del_img(item.id)" :class="isselected(item.id)"></i>
      <span v-if="item.share" class="is-share"><i class="el-icon-labo-xing"></i></span>
      <img :src="item.accessUrl">
    </div>
  </div>
  <input type="file" multiple class="input-alb" accept="image/png,image/jpg,image/gif" style="display:none;" @change="upload_single">
  <el-pagination
    layout="total,prev, pager, next,jumper"
    @current-change="select_page"
    :page-size="page_size"
    :total="total">
  </el-pagination>
  <div class="change-confirm" v-if="selectType>0">
    <p>已选择</p>
    <p>{{count}}</p>
    <p>张图片</p>
    <div>
      <p>确认{{text}}？</p>
      <el-button type="danger" icon="el-icon-labo-duiconverted" circle @click="image_change"></el-button>
      <el-button type="info" icon="el-icon-labo-cuoconverted" circle @click="cancle"></el-button>
    </div>
  </div>
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
    watch:{ 
      'imgs':'make_layout_change' 
    },
    data(){
      return {
        menuName:'菜单',
        page_size:2,
        total:0,
        current_page:1,
        type:2,
        isdel:false,
        selectType:-1,
        delImg:[],
        menu:[
          {'value':'上传'},
          {'value':'共享'},
          {'value':'删除'},
          {'value':'编辑'},
        ],
        status:'del',
        imgs:[],
        change:[],
        change_type:-1,
        current_change:0,
        text:''
      }; 
    },
    mounted:function (argument) {
      this.getImage();
      $(".imgs").pinterest_grid({
        column: 5,
        marginX: 20,
        marginY: 15,
        margin_bottom: 50
      });
    },
    methods:{

      cancle(){
        this.change=[];
        this.current_change=0;
        this.selectType=-1;
        this.isdel=false;
      },
      image_change(){
        let that=this;
        this.$axios.post('/api/operation/image/status/change',{
          id:this.change,
          operate:this.selectType
        })
        .then(function(argument) {
          that.cancle();
          that.getImage();
        })
        .catch(function(argument) {
          that.cancle();
        })
      },
      del_img(index){
        let that=this;
        $(event.target).toggleClass('selected');
        this.$common.toggleValue(this.change,index); 
      },
      onSelect(index){
        this.selectType=index;
        this.change=[];
        let that=this;
        switch (index) {
          case 0:
            $('.input-alb').click();
            break;
          case 1:
            this.current_change=1;//共享
            this.text="更改共享状态"
            break;
          case 2:
            this.change_type=2;//删除
            this.text='删除'
            break;
          case 3:
            console.log('编辑')
            break;
          default:
            break;
        }
      },
      upload_single:function() {
        let that=this;
        let reader = new FileReader();
        let AllowImgFileSize = 2100000;
        let file = $('.input-alb')[0].files[0];
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
                  that.getImage();
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
      },
      upload_multiple:function() {
        let that=this;
        let file = Array.from($('.input-alb')[0].files);
        that.$axios.post('/api/operation/image/multi/upload', {
          fileImg:file,
          name:'1'
        })
        .then(function (response) {
          $('input').val('');
          that.SUBMIT=false
          if(response.data.code==0){
            that.getImage();
          }else{
            that.$message.error(response.data.des);
          }
        })
        .catch(function (error) {
          $('input').val('');
          that.$message.error(error.message)
        });
      },
      select_page:function (currentPage) {
        this.current_page=currentPage;
        this.getImage();
      },
      make_layout_change(){
        $(".imgs").pinterest_grid({
          column: 5,
          marginX: 20,
          marginY: 15,
          margin_bottom: 50
        });
      },
      getImage(){
        let that=this;
        this.$axios.get('/api/operation/list/image/get', {
          params: {
            sharetype: that.type,
            current:that.current_page,
            size:that.page_size,
          }
        })
        .then(function (response) {
          if(response.data.code==0){
            that.imgs=response.data.data.imageList
            that.total=response.data.data.totalCount
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      slelct_type(type){
        if(this.type!=type){
          this.type=type;
          this.isdel=false;
          this.change=[];
          this.getImage();
        }
      },
    },
    computed: {
      isselected () {
        return function (index) {
          return {
            selected: this.change.includes(index)
          }
        }
      },
      count(){
        return this.change.length;
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
    border-radius: 10px;
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
    border-radius: 10px;
    object-fit: cover;
  }
  .el-icon-circle-close,
  .el-icon-labo-weixuanzhong1{
    color:#888;
    cursor:pointer;
    font-size:30px;
    position: absolute;
    top:-15px;
    right:-15px;
  }
  .el-icon-labo-weixuanzhong1.selected:before { 
    content: "\e664"; 
  }
  .el-icon-circle-close:hover,,
  .el-icon-labo-weixuanzhong1:hover,
  .el-icon-labo-weixuanzhong1.selected,
  .el-icon-circle-close.selected{
    color:red;
  }
  canvas{
    position: absolute;
    height:100%;
    width:100%;
    left:0;
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
  .change-confirm{
    position: fixed;
    right:0;
    width:260px;
    height: 260px;
    top:320px;
  }
  .btn-group{
    margin-bottom:30px;
  }
  .el-button.active{
    background: #dd6161;
    border-color: #dd6161;
    color:#fff;
  }
  .is-share{
    position: absolute;
    color: #f56c6c;
    padding: 10px;
    background: rgba(0,0,0,.4);
    border-radius: 0 50% 50%;
  }
</style>