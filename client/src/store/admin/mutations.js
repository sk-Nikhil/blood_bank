export default{
    updateLoginStatus(state, payload){
        state.loggedIn = payload;
    },
    updateRole(state, payload){
        state.role = payload
    }
}