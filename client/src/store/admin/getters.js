export default{
    getLoginStatus(state){
        return state.loggedIn;
    },
    getRole(state){
        return state.role;
    },
    countTotalPendingEnquiries(state){
        return state.pendingEnquiries
    },
    getAllEnquiries(state){
        return state.enquiries;
    }
}