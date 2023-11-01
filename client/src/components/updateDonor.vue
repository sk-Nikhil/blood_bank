<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title>
                    Registration Form
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form">
                        <v-text-field v-model="donor.name" label="Name" disabled></v-text-field>
                        <v-text-field v-model="donor.address" label="Address" :rules="addressRule"></v-text-field>
                        <v-text-field v-model="donor.contact" label="Contact" :rules="contactRule" required></v-text-field>
                        <v-select v-model="donor.bloodGroup" label="Blood Group" disabled></v-select>
                    </v-form>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn @click="closeDialog">Close</v-btn>
                    <v-btn color="primary" @click="submitForm" :disabled="(donor.address.length < 8 || donor.contact.length !== 10)">Submit</v-btn>
                </v-card-actions>
                
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            dialog: true,
            donor:{},
            contactRule: [(v) => !!v || 'Contact is required', (v) => /^[0-9]{10}$/.test(v) || 'Invalid contact number'],
            addressRule: [(v) => !!v || 'Address is required', (v) => (v && v.length >= 8) || 'Address must be at least 8 characters'],
        };
    },
    computed: {
        ...mapGetters(['getDonorToBeUpdated']),
        isFormValid() {
            return this.$refs.form;
        },
    },
    methods: {
        ...mapActions('donor', ['updateDonor']),
        ...mapActions(['disableEdit']),

        async updateDonorDetails() {
            const response = await this.updateDonor(this.donor);
            this.notify(response)
        },
        closeDialog() {
            this.disableEdit()
            this.dialog = false;
            this.resetForm();
        },
        async isFormStatusValid(){
            const isValid = await this.$refs.form.validate()
            return isValid.valid
        },
        async submitForm(){
            if (this.isFormStatusValid) {
                this.updateDonorDetails()
                this.closeDialog()
            }
        },
        resetForm() {
            this.$refs.form.resetValidation(); // Reset form validation
        },
        
    },
    created(){
        this.donor = this.getDonorToBeUpdated
    },
    setup() {
        const notify = (msg) => {
            toast(msg, {
                autoClose: 1000,
            }); // ToastOptions
        }
        return { notify };
    },
};
</script>

<style>
v-card-actions{
    float:right
}
</style>



<!-- <template>
    <div>
        <div id="backdrop" @click="disableEdit()"></div>
        <div class="form-container">
            <h2>Update Donor Details</h2>

            <div id="close" @click="disableEdit()">close</div>
            <form @submit.prevent="handleEditForm(donor)">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" v-model="donor.name" disabled>

                <label for="bloodGroup">Blood Group:</label>
                <select id="bloodGroup" name="bloodGroup" v-model="donor.bloodGroup" disabled>
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
                <input type="text" id="address" name="address" required v-model="donor.address">

                <label for="contact">Contact:</label>
                <input type="tel" id="contact" name="contact" pattern="[0-9]{10}" required v-model="donor.contact">

                <button id="updateButton">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            donor: {}
        }
    },
    computed: {
        ...mapGetters(['getDonorToBeUpdated']),
    },
    methods: {
        ...mapActions('donor', ['updateDonor']),
        ...mapActions(['disableEdit']),

        async handleEditForm(donor) {
            const response = await this.updateDonor(donor);
            if (response.error)
                this.notify(response.error);
            else
                this.notify(response.data);
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
    created() {
        this.donor = this.getDonorToBeUpdated
    }
}
</script>

<style scoped>
form {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    text-align: left;
    margin-top: 5%;
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
#updateButton {
    background-color: rgb(54, 54, 211);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
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


#close {
    position: absolute;
    right: 1%;
    top: 1%;
    color: red;
}

#close:hover {
    cursor: pointer
}
</style> -->