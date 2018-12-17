<template>
  <div class="profile">
    <breadcrumb :crumb='bdcrumb'></breadcrumb>
    <el-row :gutter="20" class="detail-info">
      <el-col :span="3" class="avatar-box">
        <el-upload
        drag
        name="cover"
        accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp,image/tga"
        class="avatar-uploader"
        action="/monkey/identity/avatar/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="userDate.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <!-- <div class="el-upload__tip" slot="tip">只支持png/jpg/jpeg/gif/bmp/tga格式，且不超过3M</div> -->
        </el-upload>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="20">
          <el-col :span="3" class="info-name"><div class="grid-content bg-purple">用户名</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple">{{userDate.nickname}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="info-name"><div class="grid-content bg-purple">手机号</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple">{{userDate.phone}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="info-name"><div class="grid-content bg-purple">绑定邮箱</div></el-col>
          <el-col :span="20">
            <span class="grid-content bg-purple">{{userDate.email==''? '您尚未设置登录邮箱' :userDate.email}}</span>
            <router-link class="change-mail" to="/set/mailBind">{{userDate.email==''? '添加邮箱' :'更改邮箱'}}</router-link>
          </el-col>
        </el-row> 
      </el-col>
    </el-row> 
  </div>
</template>
<script>
  import breadcrumb from '@/components/breadcrumb'
  export default{
    name:'profile',
    props:['userDate'],
    components:{
      breadcrumb
    },
    data(){ 
      return {
        bdcrumb:[
          {'value':'首页',url:'/'},
          {'value':'User Settings'},
          {'value':'profile'},
        ],
        imageUrl: true,
      }; 
    },
    created:function () {
      this.$emit('changeActive','2');
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.userDate.avatar=URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG=['image/jpg','image/jpeg','image/png','image/gif','image/bmp','image/tga'].contains(file.type);
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style scoped lang="scss">
  .profile{
    text-align: left;
  }
  .profile-title{
    padding-left:10px;
    font-size: 18px;
  }
  .detail-info{
    margin-top:20px;
    line-height:32px;
    font-size: 16px;
    color:#000;
  }
  .avatar-box{
    width:120px;
    margin:0 20px;
  }
  .info-name{
    width:100px;
  }
  .change-mail{
    color: #42b983;
    display: inline-block;
    margin-left:10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
    object-fit: contain;
  }
</style>