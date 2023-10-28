import { createStore } from "vuex";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";

import donorModule from "./donors/index";
import adminModule from './admin/index'
import userModule from './user/index'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';


const store = createStore({
    
    modules:{
        donor:donorModule,
        admin:adminModule,
        user:userModule
    },
    state(){
        return{
            donorToBeUpdated:{},
            showAddForm:false,
            editDonor:false,
            group_count:[],
        }
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters,
    plugins: [
        createPersistedState({
          key: 'your-app-key', // Change to a unique key for your app
          paths: [
            'admin.role', 
            'admin.loggedIn',
          ],
          storage: {
            getItem: (key) => Cookies.get(key), // Use secure cookies
            setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: true }),
            removeItem: (key) => Cookies.remove(key),
          },
        }),
      ],
})

export default store;