<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
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
  ::-webkit-scrollbar{
    display: none;
  }
  </style>