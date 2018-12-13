<template>
  <div id="app"> 
    <el-container>
      <tab v-bind:msg="msg" v-bind:userDate="userDate" v-bind:hideHeader="hideHeader" @text="text"></tab>
      <el-main class="nopadding">
        <router-view v-bind:userDate="userDate" />
      </el-main>
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
    watch:{ 
      '$route':'tabActiveSlider' ,
      hideHeader:function(){
        if(!this.hideHeader){
          this.getInfo();
        }
      }
    }, 
    data(){
      return {
        msg:'text',
        userDate:{
          'img':'./static/img/images.jpeg',
        'email':'',
        'nickname':'',
        'phone':'',
        },
        'hideHeader':(this.$route.path=='/login'||this.$route.path=='/regist'||this.$route.path=='/reset')?true:false,
      }
    },
    created:function () {
      if(!this.hideHeader){
        this.getInfo();
      }
    },
    methods:{
      text(msg){
        console.log(2)
        this.msg=msg;
      },
      'tabActiveSlider':function(){ 
        this.active=this.$route.path;
        if(this.$route.path=='/login'||this.$route.path=='/regist'||this.$route.path=='/reset'){
          this.hideHeader=true;
        }else{
          this.hideHeader=false;
        }
      },
      getInfo(){
        let that=this;
        this.$axios.get('/monkey/identity/info/account')
          .then(function (response) {
            that.userDate=response.data.data;
            if(response.data.data==''){
              that.userDate.avatar='./static/img/images.jpeg';
            }else{
              that.userDate.avatar='data:;base64,'+response.data.data.avatar;
            }
          })
          .catch(function (error) {
            // that.$message.error(error.message)
        });
      }
    }
  }
</script>
