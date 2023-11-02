<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
        <h1>{{ $t('donorsRecords') }}</h1>

        <!-- Vuetify Table -->
        <v-data-table-server 
            v-model:items-per-page="itemsPerPage" 
            :headers="headers" 
            :items-length="totalEnquiries"
            :items="getAllEnquiries" 
            :loading="loading" 
            item-value="name" 
            class="elevation-1"
            @update:options="initializeEnquiries">
            <template v-slot:item.actions>
                <td>
                    <v-btn>Approve</v-btn>
                    <v-btn>Reject</v-btn>
                </td>
            </template>
        </v-data-table-server>
        <edit-donor v-if="getEditStatus"></edit-donor>
    </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import EditDonor from '../components/updateDonor.vue'
export default {
    components: {
        EditDonor
    },
    data() {
        return {
            enquiries: [],
            totalEnquiries:10,
            itemsPerPage:5,
            loading:false,
            
            headers: [
                { title: 'ID', key: '_id', sortable: false,  },
                { title: 'email', key: 'user_id', sortable: false },
                { title: 'Blood Group', key: 'blood_group', sortable: false },
                { title: 'Message', key: 'message', sortable: false },
                { title: 'Status', key: 'status', sortable: false },
                { title: 'Enquiry Date', key: 'enquiry_date', sortable: false },
                { title: 'Actions', key: 'actions', sortable: false }
            ],
        };
    },

    computed: {
        ...mapGetters('admin', ['getAllEnquiries']),
    },
    methods: {
        ...mapActions('admin',['setAllEnquiries']),
        approveEntry(id) {
            // Handle approval logic here
            console.log(id)
        },
        rejectEntry(id) {
            console.log(id)
            // Handle rejection logic here
        },

        async initializeEnquiries({page, itemsPerPage}){
            this.loading = true
            console.log(page, itemsPerPage)
            const totalEnquiries = await this.setAllEnquiries({page, itemsPerPage})
            this.loading=false
            this.totalEnquiries = totalEnquiries
            if(typeof this.totalEnquiries !== 'number'){
                this.notify("unable to fetch enquiries")
            }
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
};
</script>

<style>

</style>
  