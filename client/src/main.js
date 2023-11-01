import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css';
import 'vuetify/dist/vuetify.css';
import routes from './routes.js'  

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
app.use(vuetify)
app.use(store)
app.use(routes)
app.mount('#app')
