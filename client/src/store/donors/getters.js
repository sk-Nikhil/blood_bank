

export default {
    getDonors(state){
        return state.donors.slice(0,5);
    },
    getCurrPage(state){
        return state.currentPage
    },
    getTotalPages(state){
        return state.totalPages
    },

    // filteredDonors(state){
    //     const query = state.searchTerm.toLowerCase().trim();
    //     if (!query) {
    //         return state.donors;
    //     }
    //     return state.donors.filter((donor) => {
    //         for (const field in donor) {
    //             if (typeof donor[field] === 'string' && donor[field].toLowerCase().includes(query)) {
    //                 return true;
    //             }
    //         }
    //         return false; 
    //     });
    // }


      

}