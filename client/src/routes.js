import { createWebHistory, createRouter } from 'vue-router';
import HomeComponent from './views/TheHome.vue';
// import LoginComponent from './views/LoginPage.vue';

const routes = [
    // {path:'/', component:LoginComponent},
    {path:'/home', component:HomeComponent}
];

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;