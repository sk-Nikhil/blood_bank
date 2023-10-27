import axiosInstance from '../../service/axios.service.js';

export default {
    async setDonors(context, page){
        if(!context.state.searchTerm){
            const response = await axiosInstance.get(`/getDonors?page=${page}`)
            if(response.status == 200)
                context.commit('setDonors', response.data);
        }
        else{
            const response = await axiosInstance.get(`/filterSearch/${context.state.searchTerm}?page=${page}`)
            if(response.status == 200)
                context.commit('setDonors', response.data);
        }
    },

    async addDonor(context, payload){
        let addResponse=null;
        await axiosInstance.post('/addDonor', payload)
        .then((response)=>{
            addResponse = response.data;
            context.dispatch('setDonors',context.getters.getCurrPage);
            context.commit('addDonor', payload);
        })
        return addResponse;
    },
    
    async removeDonor(context, payload){
        let removeReponse=null;
        await axiosInstance.delete(`/removeDonor/${payload}`)
        .then((response)=>{
            removeReponse = response.data;
            context.commit('removeDonor', payload);
            context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage});
        })
        return removeReponse;
    },

    async updateDonor(context, payload){
        context.rootState.editDonor = false;
        const d = new Date();
        const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        const donor = {...payload, last_donated};
        var updateResponse = null;

        await axiosInstance.patch('/updateDonor', donor)
        .then(response=>{
            context.commit('updateDonor', donor);
            updateResponse = response.data;
        })
        return updateResponse;

    },

    setSearchTerm(context, payload){
        context.commit('setSearchTerm', payload);
    },

    sortDonors(context, payload){
        context.commit('sortDonors', payload);
    }
}