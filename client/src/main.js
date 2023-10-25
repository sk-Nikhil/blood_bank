import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import routes from './routes'


const app = createApp(App)
app.use(store)
app.use(routes)
app.mount('#app')
