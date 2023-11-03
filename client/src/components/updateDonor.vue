<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title class="text-center">
                    {{ $t('updateDonorDetails') }}
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
