
import axiosInstance from '../../service/axios.service.js';

export default {
    async setDonors(context, page){
        try{
            const response = await axiosInstance.get(`/donors?page=${page}&searchTerm=${context.state.searchTerm}`);
            context.commit('setDonors', response.data);
        }
        catch(err){
            return {error:err.message}
        }
    },

    async addDonor(context, payload){
        try{
            const response = await axiosInstance.post('/donor', payload);
            if(response.data){
                context.dispatch('setDonors',context.getters.getCurrPage);
                context.commit('addDonor', payload);
                return response.data.data;
            }
        }
        catch(err){
            if(!err.response){
                return err.message;
            }
            else{   
                return err.response.data.error[0].message;
            }
        }
    },
    
    async removeDonor(context, payload){
        console.log(payload)
        try{
            const response = await axiosInstance.delete(`/donor/${payload}`);
            context.commit('removeDonor', payload);
            context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage});
            return response.data.data

        }
        catch(err){
            if(err.response){
                console.log(err.response.data.error[0].message)
                return "something went wrong, unable to delete";
            }
        }
    },

    async updateDonor(context, payload){
        context.rootState.editDonor = false;
        const d = new Date();
        const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        const donor = {...payload, last_donated};
        var updateResponse = null;
        try{
            await axiosInstance.put('/donor', {_id:payload._id, address:payload.address, contact:payload.contact})
            .then(response=>{
                context.commit('updateDonor', donor);
                updateResponse = response.data;
            })
            
            return updateResponse;
        }
        catch(err){
            return {error:err.response.data.error[0].message}
        }

    },

    setSearchTerm(context, payload){
        context.commit('setSearchTerm', payload);
    },

    sortDonors(context, payload){
        context.commit('sortDonors', payload);
    }
}