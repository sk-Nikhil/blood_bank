<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
        <h1>Donors Records</h1>

        <!-- Search Bar -->
        <v-text-field v-model="searchTerm" label="Search" class="float-right" style="width:300px"
            @input="initializeDonors()" />

        <!-- Vuetify Table -->
        <v-data-table :headers="headers" :items="getDonors" v-model:items-per-page="itemsPerPage" class="hover-table">
            <template v-slot:header>
                <thead>
                    <tr>
                        <th v-for="header in headers" :key="header.value">
                            {{ header.text }}
                        </th>
                    </tr>
                </thead>
            </template>
            <template v-slot:item.actions="{ item }">
                <td>
                    <v-btn @click="changeEditStatus(item)">Edit</v-btn>
                    <v-btn @click="deleteDonor(item._id)">Delete</v-btn>
                    <!-- Add more buttons or customize as needed -->
                </td>
            </template>
        </v-data-table>

        <!-- <v-pagination v-model="currentPage" :length="totalPages">
        </v-pagination> -->
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
            items: [],
            headers: [
                { text: 'ID', value: '_id' },
                { text: 'Name', value: 'name' },
                { text: 'Blood Group', value: 'bloodGroup' },
                { text: 'Address', value: 'address' },
                { text: 'Contact', value: 'contact' },
                { text: 'Last Donated', value: 'lastDonated' },
                { text: 'Actions', value: 'actions' }
            ],

            currentPage: 1,
            totalPages: 0,
            hoverClass: 'hover-row'
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
            this.notify(response)
            this.countGroups()
        },

        async initializeDonors() {
            const response = await this.setDonors({ numberOfRecords: this.itemsPerPage, searchTerm: this.searchTerm })
            if (!response.error) {
                this.currentPage = response.data.currentPage
                this.totalPages = response.data.totalPages
                return
            }
            this.notify("unexpected error occured")
        }
    },

    created() {
        this.initializeDonors()
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

<style> 
.v-data-table {
     background-color: red;
     color: black;
}
.hover-table .hover-row:hover {
  background-color: #f5f5f5; /* Define the background color when hovered */
  cursor: pointer; /* Add a pointer cursor on hover */
}
</style>
  


<!-- <template>
    <div id="container">
        <form class="search">
            <input type="text" placeholder="Search" class="searchinput" name="search" v-model="searchTerm" @input="handleInput()" />
            <button type="button" class="searchbutton">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    </div>

</template>

<style scoped>
#container{
    width:70%;
    margin: 6% auto 15%;
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