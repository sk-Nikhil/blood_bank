<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
        <h1>{{ $t('donorsRecords') }}</h1>
        <!-- Search Bar -->

        <v-text-field v-model="searchTerm" label="Search" class="float-right" style="width:300px"
            @input="initializeDonors('1', itemsPerPage, '')" />

        <!-- Vuetify Table -->
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalDonors"
            :items="getDonors" :loading="loading" :search="searchTerm" item-value="name" class="elevation-1"
            @update:options="initializeDonors">
            <template v-slot:item.actions="{ item }">
                <td>
                    <v-btn @click="changeEditStatus(item)">Edit</v-btn>
                    <v-btn @click="deleteDonor(item._id)">Delete</v-btn>
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
            searchTerm: '',
            itemsPerPage: 5,
            totalDonors: 0,
            currentPage: 1,
            loading: false,
            headers: [
                { title: 'ID', key: '_id', sortable:false },
                { title: 'Name', key: 'name', sortable:false },
                { title: 'Blood Group', key: 'bloodGroup', sortable:false },
                { title: 'Address', key: 'address', sortable:false },
                { title: 'Contact', key: 'contact', sortable:false },
                { title: 'Last Donated', key: 'lastDonated', sortable:false },
                { title: 'Actions', key: 'actions', sortable:false }
            ],
        };
    },
    watch: {
        itemsPerPage(value) {
            this.initializeDonors(value)
        }
    },
    computed: {
        ...mapGetters('donor', ['getCurrPage', 'getTotalPages', 'filteredDonors', 'getDonors']),
        ...mapGetters(['getEditStatus']),
        ...mapGetters('admin', ['getLoginStatus'])
    },
    methods: {
        ...mapActions('donor', ['setDonors', 'removeDonor', 'setSearchTerm', 'sortDonors']),
        ...mapActions(['changeEditStatus']),
        ...mapActions(['countGroups']),
        ...mapActions('admin', ['setTotalPendingEnquiries']),

        handlePageChange(newPage) {
            console.log(newPage)
        },

        async deleteDonor(id) {
            const response = await this.removeDonor(id);
            console.log(this.currentPage)
            this.initializeDonors({ page: this.currentPage, itemsPerPage: this.itemsPerPage, sortBy: '' })
            this.notify(response)
            this.countGroups()
        },

        async initializeDonors({ page, itemsPerPage, sortBy }) {
            this.currentPage = page
            console.log(page, itemsPerPage)
            this.loading = true
            const response = await this.setDonors({ page, itemsPerPage, sortBy, searchTerm: this.searchTerm })
            if (!response.error) {
                this.totalDonors = response.data.totalDonors
                this.loading = false
                return
            }
            this.notify("unexpected error occured")
        }
    },

    created() {
        this.setTotalPendingEnquiries();
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

<style> .v-data-table {
     background-color: red;
     color: black;
 }

 .hover-table .hover-row:hover {
     background-color: #f5f5f5;
     cursor: pointer;
 }
</style>
  