<template>
    <div>
        <div id="backdrop" @click="changeAddformStatus"></div>
        <div class="form-container">
            <h2>Donor Registration</h2>
            <div id="close" @click="changeAddformStatus()">close</div>
            <form @submit.prevent="addDonors()">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required v-model="form.name">

                <label for="blood_group">Blood Group:</label>
                <select id="blood_group" name="blood_group" required v-model="form.blood_group">
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="O-">O-</option>
                </select>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required v-model="form.address">

                <label for="contact">Contact:</label>
                <input type="tel" id="contact" name="contact" pattern="[0-9]{10}" required v-model="form.contact">

                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            form: {
                name: '',
                blood_group: '',
                address: '',
                contact: ''
            },

            last_donated: new Date()
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(['changeAddformStatus']),
        ...mapActions('donor', ['addDonor']),
        addDonors() {
            const d = new Date()
            const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
            this.changeAddformStatus()
            this.addDonor({id:this.generateRandomId(this.form.name), ...this.form, last_donated })
            .then((response)=>this.notify(response))
        },

        generateRandomId(name) {
            // Use a cryptographic random number generator to ensure uniqueness
            const randomArray = new Uint32Array(1);
            window.crypto.getRandomValues(randomArray);
            const randomValue = randomArray[0] % 1000000; // Ensure it's a 6-digit number
          
            // Convert the random value to a 6-digit string
            const randomId = randomValue.toString().padStart(6, '0');
          
            // Take the first 3 characters of the name and concatenate with the random 6-digit ID
            const namePart = name.slice(0, 3).toUpperCase();
          
            return namePart + randomId;
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
form {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    text-align: left;
    margin-top:5%;
}

/* Style the form container */
.form-container {
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translate(-50%);
    width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    z-index: 99;
}

/* Style form labels */
label {
    font-weight: bold;
}

/* Style form input fields */
input[type="text"],
input[type="tel"],
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Style the submit button */
input[type="submit"] {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float:right;
}

/* Style the submit button on hover */
input[type="submit"]:hover {
    background-color: #555;
}

#backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.3);
}

#close{
    position:absolute;
    right:1%;
    top:1%;
    color:red;
}

#close:hover{
    cursor:pointer
}
</style>