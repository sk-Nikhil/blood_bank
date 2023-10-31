<template>
    <div id="container">
        <form @submit.prevent="handleSignup()">
            <div id="heading">
                <h1>Register with us</h1>
            </div>
            <div class="form-group">
                <label for="username">Name : </label>
                <input type="email" id="username" class="form-control" v-model="user.username"
                    placeholder="Enter Your Fullname" required>
            </div>
            <div class="form-group">
                <label for="username">Email : </label>
                <input type="email" id="username" class="form-control" v-model="user.username" required>
            </div>

            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" id="password" class="form-control" v-model="user.password" required>
            </div>
            <button class="btn btn-primary">Sign up</button>
        </form>
    </div>
</template>
    
<script>
import { mapActions } from 'vuex'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            errMessage: ''
        }
    },
    watch: {
        errMessage() {

        }
    },
    methods: {
        ...mapActions('admin', ['signup']),

        handleSignup() {
            // this.$router.push('/home')
            const response = this.login(this.user);
            response.then((res) => this.errMessage = res)
            this.clearForm();
            this.notify("You have successfully registered with us")
        },
        clearForm() {
            this.user.username = ''
            this.user.password = ''
        }
    },

    setup() {
        const notify = (msg) => {
            toast(msg, {
                autoClose: 1000,
            }); // ToastOptions
        }
        return { notify };
    },
}
</script>
    
<style scoped>
* {
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
}
</style>