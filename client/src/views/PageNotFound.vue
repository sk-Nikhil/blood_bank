<!-- NotFound.vue -->
<template>
    <div class="not-found">
      <h1 class="not-found-title">404 - Not Found</h1>
      <p class="not-found-message">The page you are looking for does not exist.</p>
      <p>redirecting you to {{ getLoginStatus == true?'Home':'Login' }} Page in {{ timer }}</p>
    </div>
  </template>
  
  <script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'NotFound',
    data(){
        return{
            timer:4,
            page:''
        }
    },
    computed:{
        ...mapGetters('admin', ['getLoginStatus', 'getRole']),
    },
    created(){
      if(this.getRole === 'admin')
        this.page = 'donors'
      else if(this.getRole === 'user')
          this.page = 'homepage'
      else
        this.page='login'

        const timer = setInterval(()=>{
            this.timer--;
            if(this.timer === 0){
                this.$router.replace(`/${this.page}`)
                clearInterval(timer)
            }
        },1000)
    }
  };
  </script>
  
  <style scoped>
  /* Scoped CSS for the NotFound component */
  
  .not-found {
    width:100vw;
    height:100vh;
    text-align: center;
    padding: 20px;
  }
  
  .not-found-title {
    font-size: 2rem;
    color: #ff0000; /* Red color for the title */
  }
  
  .not-found-message {
    font-size: 1.2rem;
  }
  </style>
  