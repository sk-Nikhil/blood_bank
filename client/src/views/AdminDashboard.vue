<template>
    <v-container fluid>
        <v-carousel show-arrows="hover" hide-delimiters progress="primary">
            <v-carousel-item src="https://www.eraktkosh.in/BLDAHIMS/bloodbank/transactions/assets/webp/ONE_NATION_2500_600.webp" cover></v-carousel-item>
            <v-carousel-item src="https://cmshospital.in/wp-content/uploads/2021/08/BLOOD-BANK.jpg" cover></v-carousel-item>
            <v-carousel-item src="https://rotarysiliguri.org/images/donationfact.webp" cover></v-carousel-item>
        </v-carousel>

        <v-container class="mt-5">
                <v-row class="d-flex justify-center md-5">
                    <v-card color="success" width="400" height="200" class="d-flex justify-center align-center mr-5">
                        <v-card-title class="text-white">Donos Registered</v-card-title>
                    </v-card>
                    <v-card color="success" width="400" height="200" class="d-flex justify-center align-center">
                        <v-card-title class="text-white">Blood Unit collected</v-card-title>
                    </v-card>
                </v-row>

                <v-row class="d-flex justify-center mt-5">
                    <v-card color="success" width="400" height="200" class="d-flex justify-center align-center mr-5">
                        <v-card-title class="text-white">Blood Unit Distributed</v-card-title>
                    </v-card>
                    <v-card color="success" width="400" height="200" class="d-flex justify-center align-center">
                        <v-card-title class="text-white"></v-card-title>
                    </v-card>
                </v-row>


            <!-- </v-col> -->
            <!-- </v-row> -->
            <!-- </v-container> -->
        </v-container>

    </v-container>
</template>

<script>
export default {
    data: () => ({
        cards: [
            { title: 'Donors Registered', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
            { title: 'Blood Units Collected', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Blood Units Donated', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
    }),
}
</script>