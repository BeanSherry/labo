<template>
  <div>
    <svg width='0' height='0'>
      <defs>
        <filter id='goo'>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix 
          in="blur" 
          mode="matrix"
          result="goo"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9">
          </feColorMatrix>
          <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
        </filter>
      </defs>
    </svg>
    <div class="mini">
      <label class="mini-menu">{{menuName}}</label>
      <span v-for="(item,key) in menu" class="menu-item menu1" @click="select(key,$event)">{{item.value}}</span>
    </div>
  </div>
  
</template>
<script>
  export default{
    name:'mini',
    props:{
      menu:Array,
      status:String,
      menuName:String,
    },
    data(){ 
      return {
        selectType:0,
      }; 
    },
    methods:{
      select(index,event){
        this.selectType = index
        this.$emit('select', index)
      }
    }
  }
</script>
<style scoped lang="scss">
  @keyframes jello {
    from, 11.1%, to {
      -webkit-transform:none;
      -moz-transform:none;
      transform:none
    }
    22.2% {
      -webkit-transform:skewX(-12.5deg) skewY(-12.5deg);
      -moz-transform:skewX(-12.5deg) skewY(-12.5deg);
      transform:skewX(-12.5deg) skewY(-12.5deg)
    }
    33.3% {
      -webkit-transform:skewX(6.25deg) skewY(6.25deg);
      -moz-transform:skewX(6.25deg) skewY(6.25deg);
      transform:skewX(6.25deg) skewY(6.25deg)
    }
    44.4% {
      -webkit-transform:skewX(-3.125deg) skewY(-3.125deg);
      -moz-transform:skewX(-3.125deg) skewY(-3.125deg);
      transform:skewX(-3.125deg) skewY(-3.125deg)
    }
    55.5% {
      -webkit-transform:skewX(1.5625deg) skewY(1.5625deg);
      -moz-transform:skewX(1.5625deg) skewY(1.5625deg);
      transform:skewX(1.5625deg) skewY(1.5625deg)
    }
    66.6% {
      -webkit-transform:skewX(-.78125deg) skewY(-.78125deg);
      -moz-transform:skewX(-.78125deg) skewY(-.78125deg);
      transform:skewX(-.78125deg) skewY(-.78125deg)
    }
    77.7% {
      -webkit-transform:skewX(0.390625deg) skewY(0.390625deg);
      -moz-transform:skewX(0.390625deg) skewY(0.390625deg);
      transform:skewX(0.390625deg) skewY(0.390625deg)
    }
    88.8% {
      -webkit-transform:skewX(-.1953125deg) skewY(-.1953125deg);
      -moz-transform:skewX(-.1953125deg) skewY(-.1953125deg);
      transform:skewX(-.1953125deg) skewY(-.1953125deg)
    }
  }
  .mini{
    animation-delay: 1s;
    animation-duration: 1s;
    animation-fill-mode: both;
    position: fixed;
    width: 260px;
    height: 260px;
    right:0;
    -webkit-filter: url(#goo);
    filter: url(#goo);
    user-select: none;
    opacity: .75;
    color:#fff;
    font-size: 16px;
    z-index: 1;
  }
  .mini:hover{
    opacity: 1;
  }
  .mini-menu{
    position: absolute;
    width: 70px;
    height: 70px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #f34444;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 70px;
    color: #fff;
    font-size: 20px;
    z-index: 1;
    cursor: pointer;
  }
  .mini:hover .mini-menu{
    animation: jello 1s;
  }
  .menu-item{
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #FF7676;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    text-decoration: none;
    color: #fff;
    transition: transform .6s, background .5s;
    font-size: 14px;
    box-sizing: border-box;
    cursor:pointer;
  }
  .menu-item:hover{
    background:#A9C734;
  }
  .menu-item.menu-line{
    line-height: 20px;
    padding-top:10px;
  }
  .mini:hover .menu-item:nth-of-type(1){
    transform: translate3d(0, -135%, 0);
  }
  .mini:hover .menu-item:nth-of-type(2){
    transform: translate3d(-120%, -70%, 0);
  }
  .mini:hover .menu-item:nth-of-type(3){
    transform: translate3d(-120%, 70%, 0);
  }
  .mini:hover .menu-item:nth-of-type(4){
    transform: translate3d(0, 135%, 0);
  }
</style>