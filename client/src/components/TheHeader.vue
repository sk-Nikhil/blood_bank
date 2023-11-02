<template>
    <v-app class="my-app-margin">
        <v-navigation-drawer app location="right" expand-on-hover rail permanent v-if="getLoginStatus">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Admin">
                </v-list-item>
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home" title="Home" value="home"
                        :to="getRole === 'admin' ? '/admin_home' : '/user_home'">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Show All Enquiries" value="show_all_enquiries"
                        to="/enquiries" @click="showAllEnquiries()">
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account" title="Show Pending Enquiries" value="show_pending_enquiries"
                        to="/enquiries" @click="showPendingEnquiries()">
                    </v-list-item>

                    <v-list-item prepend-icon="mdi-translate">
                        <v-select v-model="locale" :items="langs" label="Select Language" required></v-select>
                    </v-list-item>

                </v-list>
            </v-list>
            <v-divider></v-divider>

            <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout()"></v-list-item>

        </v-navigation-drawer>

        <v-app-bar app color="primary" right>
            <div v-if="getLoginStatus">
                <v-tabs v-model="activeTab">
                    <v-tab :to="getRole === 'admin' ? '/admin_home' : '/user_home'">Home</v-tab>
                    <v-tab to="/Piechart">Piechart</v-tab>
                    <v-tab v-if="getRole === 'admin'" to="/enquiries">Enquiries</v-tab>
                </v-tabs>
            </div>

            <v-spacer></v-spacer>
            <div v-if="getLoginStatus">
                <v-btn icon @click="showNotifications">
                    <v-icon>mdi-bell</v-icon>
                </v-btn>
                <v-btn @click="changeAddformStatus()" color="white" dark>
                    Add Donor
                </v-btn>
            </div>
        </v-app-bar>

    </v-app>
    <add-donor v-if="getAddFormStatus"></add-donor>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import AddDonor from './AddDonor.vue';
export default {
    components: {
        AddDonor
    },
    data() {
        return {
            activeTab: null,
            tabs: [
                { label: "Home", routes: "admin_home" },
                { label: "PieChart", routes: "piechart" },
                { label: "Enquiries", routes: "enquiries" }
            ],
            menu: true,
            locale: '',
            langs: ["english", "french"]
        }
    },
    methods: {
        ...mapActions('admin', ['logout', 'setAllEnquiries', 'setAllPendingEnquiries']),
        ...mapActions(['changeAddformStatus']),
        showNotifications() {
            // Handle notification logic
        },
        showAllEnquiries() {
            this.setAllEnquiries()
            this.$router.push('/enquiries')
        },
        showPendingEnquiries() {
            this.setAllPendingEnquiries()
        },
        selectOption(option) {
            // Implement the action here
            this.$i18n.locale='fr'
            console.log(`Selected ${option}`);
        },
    },
    computed: {
        ...mapGetters('admin', ['getLoginStatus', 'getRole', 'getTotalPendingEnquiries']),
        ...mapGetters(['getAddFormStatus']),
    },
    created() {
        this.$watch(() => this.getTotalPendingEnquiries, (newValue) => {
            this.pendingQueries = newValue
        });
    },
    beforeUnmount() {
        this.sideBarOpen = false
    }
};
</script>
  
<style scoped>
.my-app-margin {
    margin: -310px;
    /* Adjust the margin size as needed */
}

.btn-no-border {
    display: block !important;
    border: none !important;
    color: red
}
</style>
  
  


<!-- <template>
    <ul class="nav nav-tabs d-flex justify-content-between align-items-center">
        <div style="display: flex;" v-if="getLoginStatus">
            
            <li class="nav-item">
                <router-link :to="getRole === 'admin'?'/admin_home':'/user_home'" class="nav-link" active-class="active">Home</router-link>
            </li>
            
            <li class="nav-item">
                <router-link to="/piechart" class="nav-link" active-class="active">PieChart</router-link>
            </li>

            <li class="nav-item" v-if="getRole==='admin'">
                <router-link to="/enquiries" class="nav-link" active-class="active">Enquiries</router-link>
            </li>
        </div>
        <div style="display: flex; align-items: center;" v-if="getLoginStatus">

            <div v-if="getTotalPendingEnquiries>0" v-tooltip="{content: 'This tooltip is on the top', placement: 'top'}">
                <router-link to="/enquiries" v-if="getRole==='admin'">
                    <i class="fa-solid fa-bell">
                        <div id="notification">{{ getTotalPendingEnquiries }}</div>
                    </i>
                </router-link>
            </div>
            <li class="nav-item">
                <router-link to="" v-if="getRole==='admin'" class="nav-link" active-class="" @click="changeAddformStatus">
                    Add Donor
                </router-link>
            </li>

            <div class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"><i class="fa-solid fa-bars"></i></div>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        <div>
                            <router-link :to="getRole === 'admin'?'/admin_home':'/user_home'">Home</router-link>
                        </div>
                        
                        <div v-if="getRole==='admin'">
                            <div>
                                <router-link to="/admin_home" @click="showAllEnquiries()">Show All Enquiries</router-link>
                            </div>
                            <div>
                                <router-link to="/admin_home" @click="showPendingEnquiries()">Show Pending Enquiries</router-link>
                            </div>
                        </div>
                    </div>

                    <li id="logout"><a @click="logout()">Logout</a></li>
                </div>
            </div>
        </div>
    </ul>
    <add-donor v-if="getAddFormStatus"></add-donor>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddDonor from './AddDonor.vue';
import VTooltip from 'v-tooltip';           //tooltip to hover over bell icon

export default {
    directives: {
        'tooltip': VTooltip,
    },
    components:{
        AddDonor
    },
    data() {
        return {
            pendingQueries:0
        }
    },
    methods: {
        ...mapActions('admin', ['logout','setAllEnquiries', 'setAllPendingEnquiries' ]),
        ...mapActions(['changeAddformStatus']),
        showAllEnquiries(){
            this.setAllEnquiries()
            this.$router.push('/enquiries')
        },
        showPendingEnquiries(){
            this.setAllPendingEnquiries()
        }
    },
    computed: {
        ...mapGetters('admin', ['getLoginStatus', 'getRole', 'getTotalPendingEnquiries']),
        ...mapGetters(['getAddFormStatus']),
    },
    created(){
        this.$watch(() => this.getTotalPendingEnquiries, (newValue) => {
            this.pendingQueries = newValue
        });
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

#navbar {
    position: sticky;
    top: 0;
    width: 100vw;
    background-color: white;
}

.nav {
    height: 8vh;
}
.profile {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: black;
    margin: 3px 10px 0;
}

.offcanvas-end,
.offcanvas,
#offcanvasRight {
    width: 250px;
    /* Adjust this value as needed */
}

.fa-bars,
.fa-solid {
    color: blue;
    font-size: x-large;
}

#logout:hover{
    cursor: pointer;
}

.offcanvas-body{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.fa-bell{
    position: relative;
    margin-right: 12px;
}

.fa-bell:hover{
    cursor: pointer;
}
#notification{
    position: absolute;
    left:70%;
    bottom:70%;
    display:flex;
    align-items: center;
    justify-content: center;
    width:1.2vw;
    height:1.2vw;
    border-radius: 50%;
    font-size:1rem;
    color:grey;
}
.v-tooltip {
  background-color: #333;
  color: #fff;
  border-radius: 4px;
}
</style> -->
