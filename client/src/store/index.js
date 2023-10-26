import { createStore } from "vuex";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";
import donorModule from "./donors/index";
import adminModule from './admin/index'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';


const store = createStore({
    
    modules:{
        donor:donorModule,
        admin:adminModule
    },
    state(){
        return{
            donorToBeUpdated:{},
            showAddForm:false,
            editDonor:false,
            group_count:[]
        }
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters,
    plugins: [
        createPersistedState({
          key: 'your-app-key', // Change to a unique key for your app
          paths: [
            // Define the state properties you want to persist
            'admin.loggedIn', // Example: 'user' is the state property you want to persist
          ],
          storage: {
            getItem: (key) => Cookies.get(key), // Use secure cookies
            setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: true }),
            removeItem: (key) => Cookies.remove(key),
          },
        }),
      ],
})

export default store;