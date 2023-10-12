<template>
  <the-header></the-header>
  <the-home></the-home>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheHome from './components/pages/TheHome.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheHome
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
