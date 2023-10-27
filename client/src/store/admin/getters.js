export default{
    getLoginStatus(state){
        return state.loggedIn;
    },
    getRole(state){
        return state.role;
    }
}