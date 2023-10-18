export default {
  setDonors(state, donors) {
    state.donors = donors.donors;
    state.totalPages = donors.totalPages;
    if(donors.source) 
        state.currentPage = 1
    else
        state.currentPage = donors.currentPage;
  },

  addDonor(state, data) {
    state.donors.unshift(data);
  },

  removeDonor(state, id) {
    const index = state.donors.findIndex((donor) => donor.id === id);
    state.donors.splice(index, 1);
  },

  updateDonor(state, payload) {
    const donorIndex = state.donors.findIndex(
      (donor) => donor.id === payload.id
    );
    state.donors.splice(donorIndex, 1, payload);
  },

  setSearchTerm(state, payload) {
    state.searchTerm = payload;
  },

  sortDonors(state, payload) {
    let donors = state.donors;

    if (state.sortBy === payload && payload != "id") {
        donors.sort((a, b) => {
            if(a[state.sortBy].trim().toLowerCase() < b[state.sortBy].trim().toLowerCase())
                return -1;
            if(a[state.sortBy].trim().toLowerCase() > b[state.sortBy].trim().toLowerCase())
                return 1;
            return 0;
        });
        state.donors = donors;
        state.sortBy = null;
    }
    else if (payload != "id") {
        state.sortBy = payload;
        donors.sort((a, b) => {
            if (a[state.sortBy].trim().toLowerCase() < b[state.sortBy].trim().toLowerCase())
                return 1;
            if(a[state.sortBy].trim().toLowerCase() > b[state.sortBy].trim().toLowerCase())
                return -1;
            return 0;
        });

        state.donors = donors;
    }
    else {
        if (state.sortBy === payload) {
            donors.sort((a, b) => {
                if (a[state.sortBy] < b[state.sortBy])
                    return 1;
                if (a[state.sortBy] > b[state.sortBy])
                    return -1;
                return 0;
            });
            state.donors = donors;
            state.sortBy = null;
        }
        else {
            state.sortBy = payload;
            donors.sort((a, b) => {
                if(a[state.sortBy] < b[state.sortBy])
                    return -1;
                if(a[state.sortBy] > b[state.sortBy])
                    return 1;
                return 0;
            });
            state.donors = donors;
        }
    }

    // console.log(donors[0])
    // console.log(state.donors[0])
  },
};
