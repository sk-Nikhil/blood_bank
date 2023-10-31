import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.js';
import routes from './routes.js'
import VeeValidate from 'vee-validate';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.use(vuetify)
app.use(VeeValidate)
app.use(store)
app.use(routes)
app.mount('#app')
