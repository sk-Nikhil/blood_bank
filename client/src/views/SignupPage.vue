<template>
    <v-container class="v-container">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card elevation="4">
                    <v-card-title class="headline text-center">{{ $t('register') }}</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleSignup()">
                            <v-text-field label="Name" v-model="user.name" @blur="v$.name.$touch()" :rules="nameRules"
                                required></v-text-field>
                            <v-text-field label="Email" v-model="user.email" @blur="v$.email.$touch()" :rules="emailRules" required></v-text-field>
                            <v-text-field label="Password" v-model="user.password" :rules="passwordRules"
                                required></v-text-field>

                            <v-card-text style="color:red" v-if="errMessage === '' ? false : true">{{ errMessage
                            }}</v-card-text>
                            <v-text>already have an account? <router-link to="/login">Login</router-link></v-text>
                            <v-btn class="ma-2 float-right" color="primary" type="submit">Signup</v-btn>
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
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import 'vue3-toastify/dist/index.css';
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
            emailRules: [(v) => !!v || "Username is required", (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
                    "Invalid email format"],

            passwordRules: [(v) => !!v || 'Password is required', (v) => (v && v.length >= 6) || 'Address must be at least 6 characters'],
        }
    },
    validations() {
        return {
            name: { required },
            email: { required, email },
            password: { required },
        };
    },
    methods: {
        ...mapActions('admin', ['signup']),

        async handleSignup() {
            const response = await this.signup(this.user);
            console.log(response)
            if (typeof response === 'string') {
                this.notify(response)
                
            }
            else {
                this.notify("Something went wrong unable to signup")
            }
            this.clearForm();
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
        return { notify, v$: useVuelidate() };
    },
}
</script>
    
<style scoped>
.v-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
}

/* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Raleway, sans-serif;

}

#container {
    margin-top: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    width: 30vw;
    min-height: 50vh;
    padding: 2vw 3vw;
    box-shadow: 0px 0px 24px #c8c6de;
}

label {
    margin-bottom: 0.5vw;
}

.form-group {
    margin-bottom: 1vw;
}

input {
    padding: 5px 10px;
}

#error {
    color: red
}

.error {
    color: red;
    margin-top: -10px;
}


#heading {
    text-align: center;
    margin-bottom: 2vw;
}

#heading h1 {
    font-weight: 600
}

button {
    padding: 8px 15px;
    float: right;
} */</style>