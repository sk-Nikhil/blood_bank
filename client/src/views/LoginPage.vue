<template>
    <v-container class="v-container">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="4">
                    <v-card-title class="headline text-center">{{$t('login')}}</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleLogin()">
                            <v-text-field label="Username" v-model="username" :rules="usernameRules" @blur="v$.username.$touch()"
                                required ></v-text-field>
                            <v-text-field label="Password" v-model="password" :rules="passwordRules"
                                :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                                required></v-text-field>
                            <v-card-text style="color:red" v-if="errMessage === '' ? false : true">{{ errMessage }}</v-card-text>
                            <!-- <v-text>not registered yet? <router-link to="/signup">Register</router-link></v-text> -->
                            <v-btn class="ma-2 float-right" color="primary" type="submit">Login</v-btn>
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
            errMessage: "",
            //   usernameRules: [
            //     (v) => !!v || "Username is required",
            //     (v) =>
            //       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
            //       "Invalid email format",
            //   ],

            //   passwordRules: [(v) => !!v || "password is required"],
        };
    },
    validations() {
        return {
            username: { required, email },
            password: { required },
        };
    },
    computed: {
        usernameRules() {
            return this.v$.username.$error? (this.v$.username.required.$invalid ? ['Email is required'] : ['Invalid email format']): []
        },
        passwordRules() {
        
            return this.v$.password.$invalid? ['Password is required']:[]
        },
    },
    methods: {
        ...mapActions("admin", ["login"]),

        async handleLogin() {
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
            const response = await this.login({ username: this.username, password: this.password });
            this.errMessage = response;
            this.clearForm()
            // this.v$.$touch()
        },

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

<style scoped>
.v-container{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -80%);
}
</style>
