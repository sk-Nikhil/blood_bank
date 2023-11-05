<template>
    <v-container class="d-flex justify-center">
        <v-card class="d-flex justify-center py-5" style="width:70%">
        <transition name="fade" mode="out-in">
            <div class="preview" v-if="showPreview">
                <h5>Name : {{ donor.name }}</h5>
                <h5>Address : {{ donor.address }}</h5>
                <h5>Contact : {{ donor.contact }}</h5>
                <h5>BloodGroup : {{ donor.bloodGroup }}</h5>
            </div>
        </transition>
        <v-form class="myForm" @submit.prevent="submitForm()" style="width:70%; height:30%;" ref="form">
            <h1 class="text-center">Add Donor Form</h1>

            <v-text-field v-model="donor.name" :counter="15" label="Name" :rules="nameRules" @input="v$.name.$touch()"
                required></v-text-field>
            <v-text-field v-model="donor.address" label="Address" :rules="addressRules" required></v-text-field>
            <v-text-field v-model="donor.contact" label="Contact" :rules="contactRules" required></v-text-field>
            <v-select v-model="donor.bloodGroup" :items="bloodGroups" label="blood group" :rules="bloodGroupRules"
                required></v-select>
            <v-checkbox v-model="checkbox" label="show preview" disabled></v-checkbox>

            <div class="float-right">
                <v-btn @click="resetForm()" color="secondary" size="large">
                    clear
                </v-btn>
                <v-btn class="ml-3" type="submit" color="success" size="large" variant="elevated">
                    submit
                </v-btn>
            </div>

        </v-form>
    </v-card>
    </v-container>
</template>
  
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from '@vuelidate/validators'
import { mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            donor: {
                name: '',
                address: '',
                contact: '',
                bloodGroup: '',
            },
            showPreview: false,
            checkbox: '',

            bloodGroups: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length >= 3) || "Name must be at least 3 characters",
            ],
            addressRules: [
                v => !!v || "Address is required",
            ],
            contactRules: [
                v => !!v || "Contact is required",
                v => (v && v.length === 10) || "Contact must be 10 digits",
            ],
            bloodGroupRules: [(v) => !!v || 'Blood Group is required'],
        };
    },

    validations() {
        return {
            name: [required],
            address: [required],
            contact: [required],
            bloodGroup: [required]
        }

    },
    computed: {
        isValidForm() {
            return this.$refs.form.validate();
        }
    },
    watch: {
        checkbox() {
            this.showPreview = !this.showPreview;
            console.log(this.showPreview)
        }
    },
    methods: {
        ...mapActions(['changeAddformStatus']),
        ...mapActions('donor', ['addDonor']),
        ...mapActions(['countGroups']),

        async addDonorData() {
            const response = await this.addDonor(this.donor);
            this.notify(response);
            this.countGroups();
            this.resetForm();
            this.$router.replace('/donors')
        },

        resetForm() {
            this.donor.name = '';
            this.donor.address = '';
            this.donor.contact = '';
            this.donor.bloodGroup = '';
            this.$refs.form.resetValidation(); // Reset form validation
        },
        async submitForm() {
            const isValid = await this.isValidForm
            console.log(isValid)
            if (isValid.valid) {
                this.addDonorData()
            }
        },

    },
    setup() {
        const notify = (msg) => {
            toast(msg, {
                autoClose: 1000,
            }); // ToastOptions
        }
        return { notify, v$: useVuelidate() };
    },
};
</script>

<style>
v-card-actions {
    float: right
}

.myForm {
    box-shadow: black;
}

.preview {
    width: 30%;
    height: 30%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>