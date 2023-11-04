export default {
    changeEditStatus(state, payload){
        state.editDonor = state.editDonor === true ? false : true;
        state.donorToBeUpdated = payload;
    },
    disableEdit(state){
        state.editDonor = false;
    },
    countGroups(state, payload){
        state.group_count = payload;
    },
}