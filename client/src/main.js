import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.js';
import routes from './routes.js'

const app = createApp(App)
app.use(store)
app.use(routes)
app.mount('#app')
