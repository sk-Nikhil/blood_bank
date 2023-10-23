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
            A_Count: 1,     //A+ count
            AN_Count:2,     //A- count
            B_Count:3,      //B+ count
            BN_Count:4,     //B- count
            AB_Count:5,     //AB+ count
            ABN_Count:6,    //AB- count
            O_Count:7,      //O+ count
            ON_Count:8        //O- count
        }
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters
})

export default store