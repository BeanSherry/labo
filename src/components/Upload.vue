<template>
  <div class="upload">
    <el-upload
      drag
      name="cover"
      accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp,image/tga"
      class="avatar-uploader"
      action="api/identity/avatar/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip">只支持png/jpg/jpeg/gif/bmp/tga格式，且不超过3M</div>
    </el-upload>
  </div>
</template>
<script>
  export default{
    name: 'Upload',
    // 'upload':'Upload',
    data() {
      return {
        imageUrl: '',
        hideHeader:true
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
<style>

</style>
<style scoped lang='scss'>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>