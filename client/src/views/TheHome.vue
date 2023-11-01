<template>
    <v-container>
        <h1>Home Page</h1>

        <!-- Search Bar -->
        <v-text-field v-model="search" label="Search" />

        <!-- Vuetify Table -->
        <v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
            <!-- <template v-slot:item.actions="{ item }">
                <v-btn @click="editItem(item)">Edit</v-btn>
                <v-btn @click="deleteItem(item)">Delete</v-btn>
            </template> -->
        </v-data-table>
    </v-container>
</template>
  
<script>
import { defineComponent } from 'vue';
// import { VDataTable } from '../../vuetify/lib/labs/VDataTable';
import { VDataTable } from 'vuetify/lib/labs';
export default defineComponent({
    components: {
        VDataTable,
    },
    data() {
        return {
            search: '',
            itemsPerPage: 10,
            items: [
                {
                    id: 1,
                    name: 'John Doe',
                    bloodGroup: 'A+',
                    address: '123 Main St',
                    contact: '555-123-4567',
                    lastDonated: '2023-01-15',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    bloodGroup: 'B-',
                    address: '456 Elm St',
                    contact: '555-987-6543',
                    lastDonated: '2023-02-20',
                },
                // Add more items here
            ],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Blood Group', value: 'bloodGroup' },
                { text: 'Address', value: 'address' },
                { text: 'Contact', value: 'contact' },
                { text: 'Last Donated', value: 'lastDonated' },
            ],
        };
    },
    methods: {
        editItem(item) {
            // Handle edit action
            console.log('Edit item:', item);
        },
        deleteItem(item) {
            // Handle delete action
            console.log('Delete item:', item);
        },
    },
    mounted(){
        console.log(this.items, this.headers)
    }
});
</script>
  


<!-- <template>
    <div id="container">
        <form class="search">
            <input type="text" placeholder="Search" class="searchinput" name="search" v-model="searchTerm" @input="handleInput()" />
            <button type="button" class="searchbutton">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        <table>
            <thead>
                <tr>
                    <th @click="sortDonors('id')">donor_id</th>
                    <th @click="sortDonors('name')">Name</th>
                    <th @click="sortDonors('bloodGroup')">Blood Group</th>
                    <th @click="sortDonors('address')">Address</th>
                    <th @click="sortDonors('contact')">Contact</th>
                    <th @click="sortDonors('lastDonated')">Last Donated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(donor,index) in getDonors" :key="donor.id">
                    <td>{{ (getCurrPage-1)*5+ index+1 }}</td>
                    <td>{{ donor.name }}</td>
                    <td>{{ donor.bloodGroup }}</td>
                    <td>{{ donor.address }}</td>
                    <td>{{ donor.contact }}</td>
                    <td>{{ donor.lastDonated }}</td>
                    <td>
                        <div id="action">
                            <button class="action" style="background-color: green;" @click="changeEditStatus(donor)">Edit</button>
                            <button class="action" style="background-color: red;" @click="handleRemovedDonor(donor._id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button @click="setDonors(getCurrPage - 1)" :disabled="getCurrPage <= 1">Previous</button>
            <span>Page {{ getCurrPage }} of {{ getTotalPages }}</span>
            <button @click="setDonors(getCurrPage + 1)" :disabled="getCurrPage === getTotalPages">Next</button>
        </div>


    </div>

    <edit-donor v-if="getEditStatus"></edit-donor>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import EditDonor from '../components/updateDonor.vue';

export default {
   
    components: {
        EditDonor,
    },
    data() {
        return {
            donors: [],
            searchTerm: '',
        }
    },
    computed: {
        ...mapGetters('donor', ['getCurrPage', 'getTotalPages', 'filteredDonors', 'getDonors']),
        ...mapGetters(['getEditStatus' ]),
        ...mapGetters('admin', ['getLoginStatus'])
    },
    methods: {
        ...mapActions('donor', ['setDonors', 'removeDonor', 'setSearchTerm', 'sortDonors']),
        ...mapActions(['changeEditStatus']),
        ...mapActions(['countGroups']),
        ...mapActions('admin', ['setTotalPendingEnquiries']),

        async handleInput() {
            this.setSearchTerm(this.searchTerm);
            const response = await this.setDonors(this.getCurrPage, this.searchTerm);
            if(response.error){
                this.notify("unexpected error occured")
            }
        },
        async handleRemovedDonor(id){
            const response = await this.removeDonor(id);
            this.notify(response)
            this.countGroups()
        }
    },

    async created() {
        const response = await this.setDonors(this.getCurrPage)
        console.log(response)
        
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
    display: flex;
    align-items: center;
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
    color:white;
}

#action{
    display: flex;
    align-items: center;
    justify-content: center;
}


.search{
    display: inline-flex;
    float: right;
    background-color: #501566;
    color:white;
    padding:10px;
    border-radius: 4px;
    border:1px solid black;
    margin-bottom:5px;
  }

  .search :is(input, button){
    background:transparent;
    color:inherit;
    border:none;
    outline:none;
  }

  .searchinput{
    width:0;
    transition:width 0.5s;
  }

  .searchbutton{
    display: grid;
    place-items: center;
    width:25px;
    height:25px;
    cursor:pointer;
    transition:color 0.25s;
  }

  .searchbutton:hover{
    color:#e3e3e3;
  }

  .search:focus-within input{
    width:200px;
  }

  ::placeholder{
    font:inherit;
    color:#e3e3e3;
  }

</style> -->