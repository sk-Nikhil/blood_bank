<template>
    <ul class="nav nav-tabs d-flex justify-content-between align-items-center">
        <div style="display: flex;" v-if="getLoginStatus">
            <li class="nav-item">
                <router-link to="/home" class="nav-link" active-class="active   ">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/piechart" class="nav-link" active-class="active">PieChart</router-link>
            </li>
        </div>
        <div style="display: flex; align-items: center;" v-if="getLoginStatus">
            <!-- <div class="dropdown">
                <button v-if="getLoginStatus" class="profile dropdown-toggle" type="button" data-bs-toggle="dropdown"></button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Add Donor</a></li>
                    <li><a class="dropdown-item" @click="logout()">Logout</a></li>
                </ul>
            </div> -->
            <li class="nav-item">
                <router-link to="" class="nav-link" active-class=""  @click="changeAddformStatus">Add Donor</router-link>
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
                        <router-link to="/home" @click="hideOffCampus()">Home</router-link>
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
import AddDonor from './AddDonor.vue'

export default {
    components:{
        AddDonor
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions('admin', ['logout']),
        ...mapActions(['changeAddformStatus']),
        hideOffCampus(){
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasExample'));
            offcanvas.hide();
        }
    },
    computed: {
        ...mapGetters('admin', ['getLoginStatus']),
        ...mapGetters(['getAddFormStatus' ]),
    },
    created() {
        console.log("header created")
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

</style>
