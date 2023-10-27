export default {
    getAddFormStatus(state){
        return state.showAddForm;
    },
    getEditStatus(state){
        return state.editDonor;
    },
    getDonorToBeUpdated(state){
        return state.donorToBeUpdated;
    },

    getBloodCount(state){
        const chartData = {
            labels:[],
            datasets: [
                {
                    data: [30, 50, 20],
                    backgroundColor: ['#FF5733', '#33FF57', '#5733FF', 'red', 'yellow', 'pink'],
                },
            ],
        };
        let labels = [];
        let data = [];
        for(var i = 0; i < state.group_count.length; i++) {
            labels.push(state.group_count[i]._id)
            data.push(state.group_count[i].count)
        }
        chartData.labels = labels;
        chartData.datasets[0].data = data;
        return chartData;
    },

    getRole(state){
        return state.role;
    }

}