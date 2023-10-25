import donorMutations from "./mutations";
import donorActions from "./actions";
import donorGetters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            donors:[],
            currentPage:0,
            totalPages:0,
            searchTerm:'',
            sortBy:null
        }
    },
    mutations:donorMutations,
    actions:donorActions,
    getters:donorGetters
}
