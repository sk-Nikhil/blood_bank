<template>
    <ul class="nav nav-tabs d-flex justify-content-between align-items-center">
        <div style="display: flex;" v-if="getLoginStatus">
            <!-- redirect to default home page of user or admin -->
            <li class="nav-item">
                <router-link :to="getRole === 'admin'?'/admin_home':'/user_home'" class="nav-link" active-class="active">Home</router-link>
            </li>
            <!-- piechart contains data of units of blood packages with that blood group present -->
            <li class="nav-item">
                <router-link to="/piechart" class="nav-link" active-class="active">PieChart</router-link>
            </li>

            <li class="nav-item" v-if="getRole==='admin'">
                <router-link to="/enquiries" class="nav-link" active-class="active">Enquiries</router-link>
            </li>
        </div>
        <div style="display: flex; align-items: center;" v-if="getLoginStatus">
            <!-- notification bell -->
            <!-- if any user send blood enquiry -->
            <div v-if="getTotalPendingEnquiries>0" v-tooltip="{content: 'This tooltip is on the top', placement: 'top'}">
                <router-link to="/enquiries" v-if="getRole==='admin'">
                    <i class="fa-solid fa-bell">
                        <div id="notification">{{ getTotalPendingEnquiries }}</div>
                    </i>
                </router-link>
            </div>
            <!-- button to add donor -->
            <li class="nav-item">
                <router-link to="" v-if="getRole==='admin'" class="nav-link" active-class="" @click="changeAddformStatus">
                    Add Donor
                </router-link>
            </li>

            <!-- bars, on click opens right-side-bar which contains button line logout, profile -->
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
                        <!-- pending enquiries will only be visible to admin and all enquiries will contain enquiries of all users -->
                        <div v-if="getRole==='admin'">
                            <div>
                                <router-link to="/admin_home" @click="showAllEnquiries()">Show All Enquiries</router-link>
                            </div>
                            <div>
                                <router-link to="/admin_home" @click="showPendingEnquiries()">Show Pending Enquiries</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- logout button -->
                    <li id="logout"><a @click="logout()">Logout</a></li>
                </div>
            </div>
        </div>
    </ul>
    <!-- add donor form component -->
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
</style>
