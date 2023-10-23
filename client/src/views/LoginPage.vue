<template>
    <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn color="primary" type="submit">Login</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Implement your login logic here
        console.log("Username:", this.username);
        console.log("Password:", this.password);
        // Example: send a request to the server for authentication
      },
    },
  };
  </script>
  