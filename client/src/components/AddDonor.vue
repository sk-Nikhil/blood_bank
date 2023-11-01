<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title>
                    Registration Form
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form">
                        <v-text-field v-model="form.name" label="Name" :rules="nameRule" required></v-text-field>
                        <v-text-field v-model="form.address" label="Address" :rules="addressRule" required></v-text-field>
                        <v-text-field v-model="form.contact" label="Contact" :rules="contactRule" required></v-text-field>
                        <v-select v-model="form.bloodGroup" :items="bloodGroups" label="Blood Group" :rules="bloodGroupRule"
                            required></v-select>
                    </v-form>
                </v-card-text>
                
                <v-card-actions>
                    <v-btn @click="closeDialog">Close</v-btn>
                    <v-btn color="primary" @click="submitForm" :disabled="isFormValid">Submit</v-btn>
                </v-card-actions>
                
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            dialog: true,
            form: {
                name: '',
                address: '',
                contact: '',
                bloodGroup: '',
            },
            bloodGroups: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
            nameRule: [(v) => !!v || 'Name is required', (v) => (v && v.length >= 3) || 'Name must be at least 3 characters'],
            addressRule: [(v) => !!v || 'Address is required', (v) => (v && v.length >= 8) || 'Address must be at least 8 characters'],
            contactRule: [(v) => !!v || 'Contact is required', (v) => /^[0-9]{10}$/.test(v) || 'Invalid contact number'],
            bloodGroupRule: [(v) => !!v || 'Blood Group is required'],
        };
    },
    computed: {
        isFormValid() {
            return this.$refs.form;
        },
    },
    methods: {
        ...mapActions(['changeAddformStatus']),
        ...mapActions('donor', ['addDonor']),
        ...mapActions(['countGroups']),

        async addDonorData() {
            this.changeAddformStatus()
            const response = await this.addDonor({ ...this.form });
            this.notify(response)
            this.countGroups()
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.changeAddformStatus()
            this.dialog = false;
            this.resetForm();
        },
        resetForm() {
            this.form.name = '';
            this.form.address = '';
            this.form.contact = '';
            this.form.bloodGroup = '';
            this.$refs.form.resetValidation(); // Reset form validation
        },
        async submitForm() {
            const isValid = await this.$refs.form.validate()
            console.log(isValid)
            if (isValid.valid) {
                this.addDonorData()
                this.closeDialog()
            }
        },

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