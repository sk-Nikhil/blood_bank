import adminActions from './actions.js';
import adminMutations from './mutations.js';
import adminGetters from './getters.js';

export default{
    namespaced:true,
    state(){
        return{
            loggedIn:false,
            role:''
        }
    },
    mutations:adminMutations,
    actions:adminActions,
    getters:adminGetters
}
