<template>
  <v-app>
    <the-header></the-header>
    <v-main class="d-flex align-center">
      <router-view class="router-view"></router-view>
    </v-main>
      <the-footer></the-footer>
  </v-app>
  </template>
  
  <script>
  import TheHeader from './components/TheHeader.vue'
  import TheFooter from './components/TheFooter.vue'
  
  export default {
    name: 'App',
  
    components: {
      TheHeader,
      TheFooter
    },
  
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  .router-view{
    /* width:95vw; */
    margin-bottom: 10vh;
  }

  ::-webkit-scrollbar{
    display:none;
  }

  </style>