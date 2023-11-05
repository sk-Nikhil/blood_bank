<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
        <h1>{{ $t('enquiriesRecords') }}</h1>

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
            <template v-slot:item.actions="{ item }">
                <td>
                    <v-btn color="success" @click="approveRequest(item._id)" :disabled="item.status === 'approved'" v-if="item.status !== 'rejected'">{{item.status === 'approved' ? 'Approved':'Approve'}}</v-btn>
                    <v-btn color="danger" @click="rejectRequest(item._id)" :disabled="item.status === 'rejected'" v-if="item.status!=='approved'">{{item.status === 'rejected' ? 'Rejected':'Reject'}}</v-btn>
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
                { title: 'Message', key: 'message',class:"header-cell", sortable: false },
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
        ...mapActions('admin',['setAllEnquiries', 'approveUserRequest', 'rejectUserRequest']),
        approveRequest(id) {
            this.approveUserRequest(id)
        },
        rejectRequest(id) {
            this.rejectUserRequest(id)
            // Handle rejection logic here
        },

        async initializeEnquiries({page, itemsPerPage}){
            this.loading = true
            const totalEnquiries = await this.setAllEnquiries({page, itemsPerPage})
            this.loading=false
            if(typeof this.totalEnquiries !== 'number'){
                this.notify("unable to fetch enquiries")
            }
            else
                this.totalEnquiries = totalEnquiries
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
.header-cell {
  position: relative;
}

.header-cell > div {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
  