<template>
<div class="album">
  <mini></mini>
  <!-- <el-button type="danger" icon="el-icon-plus" circle></el-button> -->
</div>  
</template>
<script>
  import mini from '@/components/mini'
  export default{
    name:'album',
    components:{
      mini,
    },
    data(){ 
      return {
      }; 
    },
    methods:{
      upload:function(argument) {
        var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = $("#image")[0].files[0];
        var imgUrlBase64;
        if (file) {
          //将文件以Data URL形式读入页面  
          imgUrlBase64 = reader.readAsDataURL(file);
          reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                  alert( '上传失败，请上传不大于2M的图片！');
                  return;
              }else{
                  //执行上传操作
                  alert(reader.result);
              }
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .album{
    padding:5px 0
  }
</style>