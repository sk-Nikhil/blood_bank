import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.js';
import 'vuetify/dist/vuetify.css';
import routes from './routes.js'  
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts()

const i18n = createI18n({
  locale: 'english', // Set the default locale
  messages: {
    english: require('./locales/en.json'), // Load English translations
    french: require('./locales/fr.json'), // Load French translations
    german: require('./locales/german.json') // Load German translation
  },
});

const app = createApp(App)
app.use(i18n)
app.use(vuetify)
app.use(store)
app.use(routes)
app.mount('#app')
