export default {
    changeAddformStatus(state){
        state.showAddForm = state.showAddForm === true ? false : true
    },
    changeEditStatus(state, payload){
        state.editDonor = state.editDonor === true ? false : true,
        state.donorToBeUpdated = payload
    },
    disableEdit(state){
        state.editDonor = false
    }
}