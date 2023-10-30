<template>
    <div>
        <div id="backdrop" @click="disableEdit()"></div>
        <div class="form-container">
            <h2>Update Donor Details</h2>

            <div id="close" @click="disableEdit()">close</div>
            <form @submit.prevent="handleEditForm(donor)">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" v-model="donor.name" disabled>

                <label for="blood_group">Blood Group:</label>
                <select id="blood_group" name="blood_group" v-model="donor.blood_group" disabled>
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

        handleEditForm(donor) {
            this.updateDonor(donor)
                .then(response => {
                    if(response.error){
                        this.notify(response.error)
                    }
                    else{
                        this.notify(response.data)
                    }
                })
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
</style>