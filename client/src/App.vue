<template>
  <the-header></the-header>
  
  <the-home></the-home>
  <!-- <login-page></login-page> -->
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheHome from './views/TheHome.vue'
// import LoginPage from './views/LoginPage.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheHome,
    // LoginPage
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
  
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  margin:0;
  padding:0;
}

</style>
