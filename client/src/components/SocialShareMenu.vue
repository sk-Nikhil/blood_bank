<template>
    <div class="social-share-menu">
      <button @click="toggleMenu">Share</button>
      <div class="share-icons" v-if="isMenuOpen">
        <a href="#" class="share-icon">Facebook</a>
        <a href="#" class="share-icon">Twitter</a>
        <a href="#" class="share-icon">LinkedIn</a>
        <!-- Add more social media icons as needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .social-share-menu {
    position: relative;
  }
  
  .share-icons {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    right: -150px; /* Adjust the position as needed */
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: right 0.3s;
  }
  
  .share-icon {
    margin: 5px 0;
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  
  button {
    background: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  </style>
  