import { createWebHistory, createRouter } from "vue-router";
import AdminDashboard from './views/AdminDashboard.vue';
import DonorsRecords from "./views/DonorsRecords.vue";
import LoginComponent from "./views/LoginPage.vue";
import PieChart from "./components/BloodGroupChart.vue";
import PageNotFound from "./views/PageNotFound.vue";
import SignupPage from "./views/SignupPage.vue";
import UserHomePage from "./views/userHomePage.vue";
import EnquiriesPage from './views/EnquiredUserPage.vue';
import AddDonor from './components/AddDonor.vue'
import store from "./store";
const routes = [
  {
    path: "/",
    name: "login",
    component: LoginComponent,
  },

  {
    path: "/login",
    component: LoginComponent,
  },

  {
    path:"/signup",             //signup page by default for user only
    component:SignupPage
  },
  {
    path:'/dashboard',
    component:AdminDashboard,
    meta:{requiredAuth:true, role:'admin'}
  },
  {
    path: "/donors",
    name: "donors",
    component: DonorsRecords,   //admin's home page
    meta: { requiresAuth: true, role:'admin' },
  },

  {
    path: "/homepage",
    name: "homepage",
    component: UserHomePage,   //user;s home page
    meta:{requiresAuth:true, role:'user'}
  },

  {
    path: "/piechart",
    name: "piechart",
    component: PieChart,      //piechart shows available blood groups and their numbers
    meta: { requiresAuth: true },
  },

  {
    path:"/addDonor",
    name:"addDonor",
    component: AddDonor,
    meta:{requiresAuth:true, role:'admin'}
  },

  {
    path: "/signup",
    component: SignupPage,    //contains signup page
  },

  {
    path:"/enquiries",
    component:EnquiriesPage,    //contains enquiries of all users whether it is pending or approved
    meta: { requiresAuth: true, role:'admin' },
  },

  { path: "/:catchAll(.*)", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  const storedRoute = localStorage.getItem("storedRoute");
  if (storedRoute === to.path) {
    // Allow the page refresh, no route change
    next();
  } else {
    if(!token){
      // if token is get expired and user tries to send a request
      next('/login')
    }
    // Set the stored route in local storage
    localStorage.setItem("storedRoute", to.path);
    if (to.meta.requiresAuth && !store.getters["admin/getLoginStatus"]) {
      next("/");
    }
    // if user logged in and tries to access admin routes he will be redirected to pagenotfound page
    else if(store.getters["admin/getRole"] === 'user' && to.meta.role === 'admin'){
      next('/pagenotfound')
    }
    // if admin logged in and tries to access user routes he will be redirected to pagenotfound page 
    else if(store.getters["admin/getRole"] === 'admin' && to.meta.role === 'user'){
      next('/pagenotfound')
    }
    // if user or admin is logged in and visits the login page he will be redirected to their respective home page
    else if ((to.path === "/" || to.path==='/login' || to.path==='/signup') && store.getters["admin/getLoginStatus"]) {
      if(store.getters["admin/getRole"] === 'admin')
        next({name:"donors"});
      else
        next({name:"homepage"});
    }
    else {
      next(true);
    }
  }
});

export default router;
