<template>
    <v-container class="v-container">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="4">
                    <v-card-title class="headline text-center">{{ $t('register') }}</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleSignup()" ref="form">
                            <v-text-field label="Name" v-model="user.name" :rules="nameRules"
                                @input="errMessage=''" required></v-text-field>
                            <v-text-field label="Email" v-model="user.email" :rules="emailRules" @input="errMessage=''" required></v-text-field>
                            <v-text-field label="Password" v-model="user.password" type="password" :rules="passwordRules"
                            @input="errMessage=''" required></v-text-field>

                            <v-card-text style="color:red" v-if="errMessage === '' ? false:true">{{ errMessage}}</v-card-text>
                            <p>already have an account? <router-link to="/login">Login</router-link></p>
                            <v-btn class="ma-2 float-right" size="large" color="primary" type="submit">Signup</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
    
<script>
import { mapActions } from 'vuex'
import { toast } from 'vue3-toastify';
import { required, email } from "@vuelidate/validators";
import 'vue3-toastify/dist/index.css';
import router from '../routes'
export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
            },
            errMessage: '',
            nameRules: [(v) => !!v || 'Password is required'],
            emailRules: [
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                (v) => /@.*\.com$/.test(v) || 'Email must have the domain .com'
            ],
            // emailRules: [(v) => !!v || "Username is required", (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
            //         "Invalid email format"],

            passwordRules: [(v) => !!v || 'Password is required', (v) => (v && v.length >= 6) || 'Password must be at least 6 characters'],
        }
    },
    validations() {
        return {
            name: { required },
            email: { required, email },
            password: { required },
        };
    },
    computed:{
        isValidForm(){
           return this.$refs.form.validate();
        },
        
    },
    methods: {
        ...mapActions('admin', ['signup']),

        async handleSignup() {
            const isValid = await this.isValidForm
            if(isValid.valid){
                const response = await this.signup(this.user);
                if (response.duplicacyError) {
                    setTimeout(()=>{
                        this.clearForm();
                        router.replace('/')
                    },1000);
                    this.notify(response.duplicacyError)
                }
                else if(response.error){
                    this.errMessage = response.error
                }
                else {
                    this.errMessage = "signup failed, due to some error we faced, please try later"
                }
            }
        },
        clearForm() {
            this.user.name = ''
            this.user.email = ''
            this.user.password = ''
        }
    },

    setup() {
        const notify = (msg) => {
            toast(msg, {
                autoClose: 1000,
            }); // ToastOptions
        }
        return { notify};
    },
}
</script>
    
<style scoped>
</style>