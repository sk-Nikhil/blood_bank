<!-- <template>

<div id="container">
    <form @submit.prevent="handleLogin()">
        <div id="heading">
            <h1>Login</h1>
        </div>
        <div class="form-group">
            <label for="username">Username : </label>
            <input type="email" id="username" class="form-control" v-model="user.username" @input="errMessage=''" required>
        </div>

        <div class="form-group">
            <label for="password">Password : </label>
            <input type="password" id="password" class="form-control" v-model="user.password" @input="errMessage=''" required>
        </div>
        <p style="color:red" v-if="errMessage===''?false:true">{{ errMessage }}</p>
        <button class="btn btn-primary">Sign In</button>
    </form>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default{
    data(){
        return{
            user:{
                username:'',
                password:'',
            },
            errMessage:''
        }
    },
    watch:{
        errMessage(){

        }
    },
    methods:{
        ...mapActions('admin',['login']),

        async handleLogin(){
            const response = await this.login(this.user);
            this.errMessage = response
            this.clearForm();
        },
        clearForm(){
            this.user.username=''
            this.user.password=''
        }
    },
}
</script>

<style scoped>

</style> -->

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <v-card elevation="2">
          <v-card-title class="headline text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin()">
              <v-text-field
                label="Username"
                v-model="username"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
              <!-- <v-card-text v-if="emptyPassword">password field cannot be empty</v-card-text> -->
              <v-card-text v-if="!isValidUser"
                >Invalid username or password</v-card-text
              >
              <v-card-text>{{ errMessage }}</v-card-text>
              <v-btn class="ma-2 float-right" color="primary" type="submit"
                >Login</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import "@mdi/font/css/materialdesignicons.css"; // Import MDI icons
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      isValidUser: true,
      emptyPassword: false,
      errMessage: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
          "Invalid email format",
      ],
      passwordRules: [(v) => !!v || "password is required"],
    };
  },
  validations() {
    return {
      username: { required, email },
      password: { required },
    };
  },
  methods: {
    ...mapActions("admin", ["login"]),

    async handleLogin() {
      // this check if username is not empty and password field is empty when the user clicks the login button
      this.emptyPassword =this.v$.password.$invalid &&(await this.v$.username.$validate()) === true;
      this.isValidCredential = await this.v$.$validate()
      if (!this.isValidCredential) {
        console.log("failure");
        this.clearForm();
        return;
      }
      const response = await this.login("hey");
      console.log(response)
      this.errMessage = response;
    //   this.clearForm();
    },
    async login() {},
    // togglePasswordVisibility() {
    //   this.showPassword = !this.showPassword;
    // },
    clearForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>
