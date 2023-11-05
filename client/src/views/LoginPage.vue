<template>
    <v-container class="v-container">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="4">
                    <v-card-title class="headline text-center">{{ $t('login') }}</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleLogin()" ref="form">
                            <v-text-field label="Username" v-model="username" :rules="usernameRules"
                                @blur="v$.username.$touch()" @input="errMessage = ''" required></v-text-field>
                            <v-text-field label="Password" v-model="password" :rules="passwordRules"
                                :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                                @input="errMessage = ''" required></v-text-field>
                            <v-card-text style="color:red" v-if="errMessage === '' ? false : true">{{ errMessage
                            }}</v-card-text>
                            <v-text>not registered yet? <router-link to="/signup">Register</router-link></v-text>
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
            usernameRules: [
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                (v) => /@.*\.com$/.test(v) || 'Email must have the domain .com'
            ],
            passwordRules:[
                (v) => !!v || 'Password is required'
            ]
        };
    },
    validations() {
        return {
            username: { required, email },
            password: { required },
        };
    },
    computed: {
        isValidForm() {
            return this.$refs.form.validate();
        },
    },
    methods: {
        ...mapActions("admin", ["login"]),

        async handleLogin() {
            const isValid = await this.isValidForm
            if (isValid.valid) {
                const response = await this.login({ username: this.username, password: this.password });
                if (response.validationError)
                    this.errMessage = response.validationError;
                this.clearForm()
            }
        },

        clearForm() {
            this.username = "";
            this.password = "";
            this.$refs.form.resetValidation();
        },
    },
};
</script>

<style scoped>
.v-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
}
</style>
