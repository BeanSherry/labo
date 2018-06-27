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
      <label class="mini-menu">菜单</label>
      <a href="" class="menu-item menu-first">首页</a>
      <a href="" class="menu-item menu-second">首页</a>
      <a href="" class="menu-item menu-third">首页</a>
      <a href="" class="menu-item menu-fourth">首页</a>
    </div>
  </div>
  
</template>
<script>
  export default{
    name:'mini',
    props:{
      crumb:Array,
    },
    data(){ 
      return {
      }; 
    },
    methods:{

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
  @keyframes bounceInUp {
    from, 60%, 75%, 90%, to {
      -webkit-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);
      -moz-animation-timing-function:cubic-bezier(0.215, .61, .355, 1);
      animation-timing-function:cubic-bezier(0.215, .61, .355, 1)
    }
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 800px, 0);
      -moz-transform: translate3d(0, 800px, 0);
      transform: translate3d(0, 800px, 0)
    }
    60% {
      opacity:1;
      -webkit-transform:translate3d(0, -20px, 0);
      -moz-transform:translate3d(0, -20px, 0);
      transform:translate3d(0, -20px, 0)
    }
    75% {
      -webkit-transform:translate3d(0, 10px, 0);
      -moz-transform:translate3d(0, 10px, 0);
      transform:translate3d(0, 10px, 0)
    }
    90% {
      -webkit-transform:translate3d(0, -5px, 0);
      -moz-transform:translate3d(0, -5px, 0);
      transform:translate3d(0, -5px, 0)
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }
  .mini{
    animation-name: bounceInUp;
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
  }
  .menu-item:hover{
    background:#A9C734;
  }
  .menu-item.menu-line{
    line-height: 20px;
    padding-top:10px;
  }
  .mini:hover .menu-first{
    transform: translate3d(0, -135%, 0);
  }
  .mini:hover .menu-second{
    transform: translate3d(-120%, -70%, 0);
  }
  .mini:hover .menu-third{
    transform: translate3d(-120%, 70%, 0);
  }
  .mini:hover .menu-fourth{
    transform: translate3d(0, 135%, 0);
  }
</style>