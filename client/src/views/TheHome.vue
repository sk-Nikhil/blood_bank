<template>
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
                        <div id="action">
                            <button class="action" style="background-color: green;" @click="changeEditStatus(donor)">Edit</button>
                            <button class="action" style="background-color: red;" @click="handleRemovedDonor(donor.id)">Delete</button>
                        </div>
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
        this.setDonors(this.getCurrPage);
        this.setTotalPendingEnquiries()
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
</style>