import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from "./views/TheHome.vue";
import LoginComponent from "./views/LoginPage.vue";
import PieChart from './components/BloodGroupChart.vue'
import PageNotFound from './views/PageNotFound.vue'
import SignupPage from './views/SignupPage.vue'
import store from "./store";

const routes = [
  { path: "/", component: LoginComponent },
  // {path:'/login', component:LoginComponent},
  { path: "/home", component: HomeComponent, meta: { requiresAuth: true } },
  {path:"/piechart", component:PieChart, meta: { requiresAuth: true }},
  {path:'/signup', component:SignupPage},
  { path: "/:catchAll(.*)", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    console.log(store.getters["admin/getLoginStatus"])

    const storedRoute = localStorage.getItem('storedRoute');
    if(storedRoute === to.path){
        // Allow the page refresh, no route change
        next();
    }
    else{
        // Set the stored route in local storage
        localStorage.setItem('storedRoute', to.path);
        if (to.meta.requiresAuth && !store.getters["admin/getLoginStatus"]) {
            next("/");
        }
        else if(to.path === '/' && store.getters["admin/getLoginStatus"]){
            console.log(to.path)
            next("/home")
        }
        else {
            next();
        }
    }
});

export default router;
