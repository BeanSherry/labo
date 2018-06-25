import md5 from 'js-md5';
var TIMEINTERVAL=0;
export default{
	TIMEINTERVAL,
  md5NHex:function(pwd,n){
    for(let i=0;i<=n;i++){
      pwd=md5(pwd)
    }
    return pwd
  },
  getStime:function(){
    return (new Date().getTime()+TIMEINTERVAL).toString()
  },
}