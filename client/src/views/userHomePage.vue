<template>
    <v-container class="enquiry-form">
        <h2>Enquiry Form</h2>
        <form @submit.prevent="submitForm">
            <v-text-field v-model="formData.name" label="Name" required></v-text-field>
            <v-text-field v-model="formData.email" label="Email" required></v-text-field>
            <v-select v-model="formData.bloodGroup" :items="bloodGroups" label="select bloodgroup" required></v-select>

            <div class="form-group">
                <div id="location" style="display: inline; margin-left: 10px;" @click="getCurrentLocation">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <!-- <input type="text" id="location" v-model="formData.location" @click="openMap" readonly> -->
                <v-text-field prepend-icon="" v-model="formData.location" @click="openMap" readonly="" label="Location"></v-text-field>
            </div>

            <!-- <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message" placeholder="Add Your Message Here..." v-model="formData.message"
                    required></textarea>
            </div> -->
            <v-textarea v-model="formData.message" counter max="100" rows="2" auto-grow label="enter your message" class="custom-textarea" required></v-textarea>

            <v-btn color="primary" type="submit" class="float-right">Submit</v-btn>
        </form>
        <div id="backdrop">
            <div id="map" v-show="showMap" class="map"></div>
        </div>
    </v-container>
</template>
  
<script>
import { toast } from 'vue3-toastify';      //vue-toastify for notification
import 'vue3-toastify/dist/index.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { mapActions } from 'vuex';
import axiosInstance from '@/service/axios.service';
export default {

    data() {
        return {
            formData: {
                name: '',
                email: '',
                bloodGroup: '',
                location: '',
                message: ''
            },
            bloodGroups:['A+','A-','B+','B-','O+','O-','AB+','AB-'],
            lat: 0,
            long: 0,
            showMap: false

        };
    },
    methods: {
        ...mapActions('user', ['addEnquiry']),
        async submitForm() {
            const response = await this.addEnquiry({ ...this.formData, location: `${this.lat}, ${this.long}` })
            this.notify(response)
            this.clearForm();
        },

        clearForm() {
            this.formData.name = '';
            this.formData.email = '';
            this.formData.bloodGroup = '';
            this.formData.location = '';
            this.formData.message = '';
            this.getCurrentLocation()
        },

        openMap() {
            this.showMap = true
            // Initialize Mapbox map
            mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsMDEwNyIsImEiOiJjbGxvem9kNXMwMWxhM21uenoxOXlqdHIzIn0.eReXmdOGFGFhWAvj5-1NHA';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.long, this.lat], // Initial center coordinates
                zoom: 13, // Initial zoom level
            });

            map.on('click', (e) => {
                this.showMap = false
                const coordinates = e.lngLat;
                this.lat = coordinates.lat
                this.long = coordinates.lng
                this.formData.location = this.fetchAddress(this.lat, this.long)
                // Close the map after selecting the location
                map.remove();
            });
        },

        getCurrentLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    this.lat = position.coords.latitude;
                    this.long = position.coords.longitude;

                    // Use OpenCage Geocoding API to get location details
                    const apiKey = 'db4b7f92bf8b4e649e92b47b4273c066'; // Replace with your API key
                    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.lat}+${this.long}&key=${apiKey}`;

                    try {
                        const response = await fetch(geocodingUrl);
                        const data = await response.json();

                        if (data.results && data.results.length > 0) {
                            const locationInfo = data.results[0];
                            const placeName = locationInfo.components.city || locationInfo.components.village;
                            const pincode = locationInfo.components.postcode;
                            this.formData.location = `${placeName}, ${pincode}`;
                        } else {
                            this.formData.location = "Location data not found";
                        }
                    } catch (error) {
                        console.error(error);
                        this.formData.location = "Location data not available";
                    }
                });
            } else {
                this.formData.location = "Geolocation is not available in this browser.";
            }
        },

        fetchAddress(lat, long) {
            const accessToken = 'pk.eyJ1IjoibmlraGlsMDEwNyIsImEiOiJjbGxvem9kNXMwMWxhM21uenoxOXlqdHIzIn0.eReXmdOGFGFhWAvj5-1NHA';
            const coordinates = long + ',' + lat;

            axios
                .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates}.json`, {
                    params: {
                        access_token: accessToken,
                    },
                })
                .then((response) => {
                    const place = response.data.features[0];
                    if (place) {
                        this.formData.location = place.place_name;
                    } else {
                        this.formData.location = 'Address not found';
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.formData.location = 'Error fetching address';
                });
            return this.formData.location
        },

    },
    created(){
        axiosInstance.get('/')
    },
    mounted() {
        this.getCurrentLocation();
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
  
<style scoped>
.enquiry-form {
    float: right;
    /* clear: both; */
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
    margin: -3vw 5vw 2vw 0;
    text-align: center;
}

.form-group {
    text-align: left;
    margin: 10px 0;
}

.custom-textarea{
    /* height:50px; */
}
#backdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.map {
    width: 60vw;
    height: 400px;
}

#location {
    cursor: pointer;
}
</style>
  