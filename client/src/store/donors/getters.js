
export default {
    getDonors(state){
        return state.donors.slice(0,5);
    },
    getCurrPage(state){
        return state.currentPage;
    },
    getTotalPages(state){
        return state.totalPages;
    },      
}