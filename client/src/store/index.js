import { createStore } from "vuex";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";
import donorModule from "./donors/index";


const store = createStore({
    modules:{
        donor:donorModule,
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
    getters:rootGetters
})

export default store;