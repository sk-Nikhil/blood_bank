
export default {
    getDonors(state){
        return state.donors.slice(0, state.itemsPerPage);
    },
}