export default{
  md5NHex:function(pwd,n){
    for(let i=0;i<=n;i++){
      pwd=md5(pwd)
    }
    return pwd
  },
  test_log:function() {
    console.log(123)
  }
}