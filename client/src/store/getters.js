export default {
    getAddFormStatus(state){
        return state.showAddForm
    },
    getEditStatus(state){
        return state.editDonor
    },
    getDonorToBeUpdated(state){
        return state.donorToBeUpdated
    },

    getBloodCount(state){
        return [state.A_Count, state.AN_Count, state.B_Count, state.BN_Count, state.AB_Count, state.ABN_Count, state.O_Count, state.ON_Count];
    },

}