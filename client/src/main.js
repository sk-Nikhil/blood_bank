import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
// import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import routes from './routes.js';

loadFonts();

const app = createApp(App);
app.use(routes);
app.use(store);
// app.use(vuetify);
app.mount('#app');
