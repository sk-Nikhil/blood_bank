export default{
    updateLoginStatus(state, payload){
        state.loggedIn = payload;
    },
    updateRole(state, payload){
        state.role = payload
    },
    countTotalPendingEnquiries(state, payload){
        state.pendingEnquiries = payload
    },
    setEnquiries(state, payload){
        state.enquiries = payload
    }
}