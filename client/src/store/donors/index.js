import donorMutations from "./mutations";
import donorActions from "./actions";
import donorGetters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            donors:[],
            totalDonors:0,
            itemsPerPage:0
        }
    },
    mutations:donorMutations,
    actions:donorActions,
    getters:donorGetters
}
