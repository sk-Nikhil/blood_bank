export default {
    setDonors(state, donors) {
        state.donors = donors;
    },

    addDonor(state, data) {
        state.donors.unshift(data);
    },

    removeDonor(state, id) {
        const index = state.donors.findIndex((donor) => donor._id === id);
        state.donors.splice(index, 1);
    },

    updateDonor(state, payload) {
        const donorIndex = state.donors.findIndex(
            (donor) => donor._id === payload._id
        );
        state.donors.splice(donorIndex, 1, payload);
    },

    setItemsPerPage(state, payload){
        state.itemsPerPage = payload
    }

};
