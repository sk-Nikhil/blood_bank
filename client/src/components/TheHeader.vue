<template>
    <v-container class="my-app-margin">

        <v-navigation-drawer v-model="drawer" app location="left" permanent  v-if="getLoginStatus">
            <v-list>
                <v-list-item to="/addDonor" prepend-icon="mdi-plus" :title="$t('addDonor')" ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" right>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <div v-if="getLoginStatus">
                <v-tabs v-model="activeTab">
                    <v-tab v-if="getRole === 'admin'" to="/dashboard">{{ $t('dashboard') }}</v-tab>
                    <v-tab v-if="getRole === 'user'" to="/homepage">{{ $t('home') }}</v-tab>
                    <v-tab v-if="getRole === 'admin'" :to="getRole === 'admin' ? '/donors' : '/user_home'">{{$t('donorsRecords')}}</v-tab>
                    <v-tab to="/Piechart">{{$t('piechart')}}</v-tab>
                    <v-tab v-if="getRole === 'admin'" to="/enquiries">{{$t('enquiries')}}</v-tab>
                </v-tabs>
            </div>

            <v-spacer></v-spacer>
            <v-tab>
                <v-select class="v-select" prepend-icon="mdi-translate" v-model="locale" :items="locales" label="Select Language"
                    required></v-select>
            </v-tab>

            <div v-if="getLoginStatus && getRole === 'admin'">
                <v-btn icon @click="showNotifications">
                    <v-icon>mdi-bell</v-icon>
                </v-btn>
            </div>
        </v-app-bar>

        <v-navigation-drawer app location="right" expand-on-hover rail value="false" v-if="getLoginStatus">
            <v-list>
                <v-list-item prepend-icon="mdi-account" :title="getRole.toUpperCase()">
                </v-list-item>
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home" title="Home" value="home"
                        :to="getRole === 'admin' ? '/dashboard' : '/homepage'">
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
    </v-container>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
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
            locales: ["English", "French", "German"],
            drawer:false
        }
    },
    methods: {
        ...mapActions('admin', ['logout', 'setAllEnquiries', 'setAllPendingEnquiries']),
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
            this.$i18n.locale = value.toLowerCase()
        }
    },
    computed: {
        ...mapGetters('admin', ['getLoginStatus', 'getRole', 'countTotalPendingEnquiries']),
        ...mapGetters(['getAddFormStatus']),
    },
    created() {
        this.$watch(() => this.countTotalPendingEnquiries, (newValue) => {
            console.log(newValue)
            this.pendingQueries = newValue
        });
    },
};
</script>
  
<style scoped>
.my-app-margin {
    /* margin: -310px; */
    /* Adjust the margin size as needed */
}

.btn-no-border {
    display: block !important;
    border: none !important;
    color: red
}
.v-select{
    width:200px;
    max-height: 50px;   
    overflow: scroll;
}
</style>