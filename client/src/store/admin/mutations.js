export default{
    updateLoginStatus(state, payload){
        state.loggedIn = payload;
    },
    updateRole(state, payload){
        state.role = payload;
    },
    countTotalPendingEnquiries(state, payload){
        state.pendingEnquiries = payload;
    },
    setEnquiries(state, payload){
        state.enquiries = payload;
    },
    approveUserRequest(state,id){
        const index = state.enquiries.findIndex((enquiry)=>enquiry._id === id);
        state.enquiries[index].status = 'approved';
    },
    rejectUserRequest(state, id){
        const index = state.enquiries.findIndex((enquiry)=>enquiry._id === id);
        state.enquiries[index].status = 'rejected';
    }
}