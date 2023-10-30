<template>
    <div class="enquiry-form">
        <h2>Enquiry Form</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" required>
            </div>

            <div class="form-group">
                <label for="bloodGroup">Blood Group</label>
                <select id="bloodGroup" v-model="formData.bloodGroup" required>
                    <option value="" disabled>Select a blood group</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="O-">O-</option>
                </select>
            </div>

            <div class="form-group">
                <label for="location">Location</label>
                <div id="location" style="display: inline; margin-left: 10px;" @click="getCurrentLocation">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <input type="text" id="location" v-model="formData.location" @click="openMap" readonly>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message" placeholder="Add Your Message Here..." v-model="formData.message"
                    required></textarea>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
    <div id="backdrop">
        <div id="map" v-show="showMap" class="map"></div>
    </div>
</template>
  
<script>
import { toast } from 'vue3-toastify';      //vue-toastify for notification
import 'vue3-toastify/dist/index.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { mapActions } from 'vuex';
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
            lat: 0,
            long: 0,
            showMap: false

        };
    },
    methods: {
        ...mapActions('user', ['addEnquiry']),
        async submitForm() {
            await this.addEnquiry({ ...this.formData, location: `${this.lat}, ${this.long}` })
            .then((response)=>{
                console.log(response)
                if(response.error){
                    this.notify(response.error)
                }
                else{
                    this.notify("your enquiry has been submitted, you will hear soon from us.")
                }
            })
            this.clearForm();
        },

        clearForm() {
            this.formData.name = '';
            this.formData.email = '';
            this.formData.bloodGroup = '';
            this.formData.location = '';
            this.formData.message = '';
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
    margin: 2vw 5vw 0 0;
    text-align: center;
}

.form-group {
    text-align: left;
    margin: 10px 0;
}

label {
    font-weight: bold;
}

input,
textarea,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    /* margin-top: px; */
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
  