export default {
    getAddFormStatus(state){
        return state.showAddForm
    },
    getEditStatus(state){
        return state.editDonor
    },
    getDonorToBeUpdated(state){
        return state.donorToBeUpdated
    }
}