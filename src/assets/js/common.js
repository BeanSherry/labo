import md5 from 'js-md5';
export default{
  md5NHex:function(pwd,n){
    for(let i=0;i<=n;i++){
      pwd=md5(pwd)
    }
    return pwd
  },
  getStime:function(TIMEINTERVAL){
    return (new Date().getTime()+TIMEINTERVAL).toString()
  },
}