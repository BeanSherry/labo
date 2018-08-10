import md5 from 'js-md5';
var TIMEINTERVAL=0;
export default{
	TIMEINTERVAL,
  md5NHex:function(pwd,n){
    var n=n||0;
    for(let i=0;i<=n;i++){
      pwd=md5(pwd)
    }
    return pwd
  },
  getStime:function(){
    return (new Date().getTime()+TIMEINTERVAL).toString()
  },
  removeByValue :function(arr,val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  },
  toggleValue:function(arr,val) {
    if(arr.includes(val)){
      this.removeByValue(arr,val);
    }else{
      arr.push(val);
    }
  }
}