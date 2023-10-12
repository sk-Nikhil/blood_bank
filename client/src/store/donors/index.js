import donorMutations from "./mutations";
import donorActions from "./actions";
import donorGetters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            donors:[],
            currentPage:1,
            totalPages:1,
            searchTerm:'',
            sortBy:null
        }
    },
    mutations:donorMutations,
    actions:donorActions,
    getters:donorGetters
}
