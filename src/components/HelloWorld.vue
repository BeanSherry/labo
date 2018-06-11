<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <router-link to="/login">Go to Login</router-link>
    <router-link to="/regist">Go to Regist</router-link>
    <li class="taiji"></li>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'BeanSherry'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .taiji{
    width: 18px;
    height: 36px;
    border-radius: 100%;
    position: fixed;
    top:50px;
    right:50px;
    border: solid 4px #000;
    border-width: 2px 20px 2px 2px;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    animation: rotation 2.5s cubic-bezier(.25,.1,.25,1) infinite;
  }
  .taiji:before {
    content: '\20';
    width: 4px;
    height: 4px;
    border-radius: 100%;
    border: solid 7px #000;
    position: absolute;
    display: block;
    left: 9px;
    background-color: #fff;
  }
  .taiji:after {
    content: '\20';
    width: 4px;
    height: 4px;
    border-radius: 100%;
    border: solid 7px #fff;
    background-color: #000;
    position: absolute;
    display: block;
    left: 9px;
    top: 18px;
  }
  @keyframes rotation{
    0%{transform:rotate(0deg)}
    100%{transform:rotate(-360deg)}
  }
</style>
