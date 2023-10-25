<template>
    <button id="addButton" @click="changeAddformStatus">Add Donor</button>
    
    <BloodGroupChart></BloodGroupChart>
    <div id="container">
        <div class="search-container">
            <input type="text" class="search-input" id="searchInput" placeholder="Search for donors..." v-model="searchTerm"
                @input="handleInput()">
        </div>
        <table>
            <thead>
                <tr>
                    <th @click="sortDonors('id')">donor_id</th>
                    <th @click="sortDonors('name')">Name</th>
                    <th @click="sortDonors('blood_group')">Blood Group</th>
                    <th @click="sortDonors('address')">Address</th>
                    <th @click="sortDonors('contact')">Contact</th>
                    <th @click="sortDonors('last_donated')">Last Donated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(donor) in getDonors" :key="donor.id">
                    <td>{{ donor.id }}</td>
                    <td>{{ donor.name }}</td>
                    <td>{{ donor.blood_group }}</td>
                    <td>{{ donor.address }}</td>
                    <td>{{ donor.contact }}</td>
                    <td>{{ donor.last_donated }}</td>
                    <td>
                        <button class="action" style="background-color: green;" @click="changeEditStatus(donor)">Edit</button>
                        <button class="action" style="background-color: red;" @click="handleRemovedDonor(donor.id)">Delete</button>
                    </td>
                </tr>
                <!-- Add more rows as needed -->
            </tbody>
        </table>
        <div class="pagination">
            <button @click="setDonors(getCurrPage - 1)" :disabled="getCurrPage <= 1">Previous</button>
            <span>Page {{ getCurrPage }} of {{ getTotalPages }}</span>
            <button @click="setDonors(getCurrPage + 1)" :disabled="getCurrPage === getTotalPages">Next</button>
        </div>
    </div>


    <add-donor v-if="getAddFormStatus"></add-donor>
    <edit-donor v-if="getEditStatus"></edit-donor>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddDonor from '../components/AddDonor.vue';
import EditDonor from '../components/updateDonor.vue';
import BloodGroupChart from '../components/BloodGroupChart.vue';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        AddDonor,
        EditDonor,
        BloodGroupChart
    },
    data() {
        return {
            donors: [],
            searchTerm: '',
        }
    },
    computed: {
        ...mapGetters('donor', ['getCurrPage', 'getTotalPages', 'filteredDonors', 'getDonors']),
        ...mapGetters(['getEditStatus', 'getAddFormStatus' ]),
    },
    methods: {
        ...mapActions('donor', ['setDonors', 'removeDonor', 'setSearchTerm', 'sortDonors']),
        ...mapActions(['changeEditStatus', 'changeAddformStatus']),
        ...mapActions(['countGroups']),

        handleInput() {
            this.setSearchTerm(this.searchTerm)
            this.setDonors(this.getCurrPage)
        },
        handleRemovedDonor(id){
            this.removeDonor(id)
            .then(response=>{
                this.countGroups()
                this.notify(response)
            })
        }

    },

    created() {
        this.setDonors(this.getCurrPage)
    },
    beforeCreate(){
        // this.countGroups()
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

#container{
    width:70%;
    margin: 6% auto 15%;
}
table {
    padding: 0;
    width:100%;
    border-collapse: collapse;
    margin: 2px auto;
}

th {
    background-color: #333;
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 10px;
}

th:hover{
    cursor:pointer
}
tr:nth-child(even) {
    background-color: #f2f2f2;
}

td {
    padding: 10px;
    border: 1px solid #ddd;
}


/* search */
.search-container {
    float:right;
    margin-bottom: 1%;
}

/* Style the search input */
.search-input {
    padding: 15px 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 32rem;
    font-size: 1rem;
    font-weight: 500;
}

#addButton{
    float:right;
    clear: both;
    margin:1%;
    padding:8px 15px;
    border-radius:10px;
    background-color: rgb(97, 130, 228);
    font-weight: 700;
}

.pagination{
    float:right;
    margin-top: 10px;
}

.pagination span{
    margin:0 10px;
}

.pagination button{
    padding:8px 15px;
    border-radius:10px;
    background-color: #ccc;
}

.action{
    padding:5px 10px;
    margin:0 2px;
    border-radius: 8px;
}
</style>