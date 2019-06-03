<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-link to="路由地址" -->
    <router-view>
      <!-- <login/> -->
    </router-view>  
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  methods:{
    
  }
}
</script>

<style>
#app{
  height: 100vh;
  width: 100vw;
}
</style>
