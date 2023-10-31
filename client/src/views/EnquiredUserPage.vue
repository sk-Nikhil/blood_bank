<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th @click="sortBy('name')">Name</th>
                    <th @click="sortBy('contact_email')">Contact Email</th>
                    <th @click="sortBy('blood_requirement')">Blood Requirement</th>
                    <th @click="sortBy('message')">Message</th>
                    <th @click="sortBy('location')">Location</th>
                    <th @click="sortBy('status')">Status</th>
                    <th>Action</th>
                    <th @click="sortBy('action_date')">Action Date</th>
                    <th @click="sortBy('action_by')">Action By</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in sortedEntries" :key="entry.id">
                    <td>{{ entry.name }}</td>
                    <td>{{ entry.user_id }}</td>
                    <td>{{ entry.blood_group }}</td>
                    <td>{{ entry.message }}</td>
                    <td>{{ entry.location }}</td>
                    <td>{{ entry.status }}</td>
                    <td>
                        <button @click="approveEntry(entry.id)">Approve</button>
                        <button @click="rejectEntry(entry.id)">Reject</button>
                    </td>
                    <td>{{ entry.action_date }}</td>
                    <td>{{ entry.action_by }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            enquiries: [], // Your data goes here
            sortKey: '', // For sorting
            sortOrders: {
                name: 1,
                contact_email: 1,
                blood_requirement: 1,
                message: 1,
                location: 1,
                status: 1,
                action_date: 1,
                action_by: 1,
            },
        };
    },
    computed: {
        ...mapGetters('user', ['getEnquiries']),

        sortedEntries() {
            const key = this.sortKey;
            const order = this.sortOrders[key] || 1;
            return this.enquiries.slice().sort((a, b) => {
                a = a[key];
                b = b[key];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
        },
    },
    methods: {
        ...mapActions('user', ['setEnquiries']),
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        },
        approveEntry(id) {
            // Handle approval logic here
            console.log(id)
        },
        rejectEntry(id) {
            console.log(id)
            // Handle rejection logic here
        },
    },
    created() {
        const response = this.setEnquiries()
        if (response.status == 204) {
            this.notify("no enquiries are present")
        }
        this.$watch(() => this.getEnquiries, (newValue) => {
            if (newValue) {
                this.enquiries = newValue
            }
            else {
                this.enquiries = []
            }
        });
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
/* Add your custom styling here or use Bootstrap classes */
</style>
  