<template>
    <v-app class="my-app-margin">
        <v-navigation-drawer app location="right" expand-on-hover rail value="false" v-if="getLoginStatus">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Admin">
                </v-list-item>
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home" title="Home" value="home"
                        :to="getRole === 'admin' ? '/admin_home' : '/user_home'">
                    </v-list-item>
                    <div v-if="getRole === 'admin'">
                        <v-list-item prepend-icon="mdi-account-multiple" title="Show All Enquiries" value="show_all_enquiries"
                            to="/enquiries" @click="showAllEnquiries()">
                        </v-list-item>
                        <!-- <v-list-item prepend-icon="mdi-account" title="Show Pending Enquiries" value="show_pending_enquiries"
                            to="/admin_home" @click="showPendingEnquiries()">
                        </v-list-item> -->
                    </div>

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
            <div class="v-select">
                <v-select class="v-select" prepend-icon="mdi-translate" v-model="locale" :items="locales" label="Select Language"
                    required></v-select>
            </div>

            <div v-if="getLoginStatus && getRole === 'admin'">
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
            locales: ["english", "french"]
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
    },
    watch: {
        locale(value) {
            this.$i18n.locale = value
        }
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
.v-select{
    width:200px
}
</style>