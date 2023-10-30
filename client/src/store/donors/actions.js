import axiosInstance from '../../service/axios.service.js';

export default {
    async setDonors(context, page){
        try{
            if(!context.state.searchTerm){
                const response = await axiosInstance.get(`/getDonors?page=${page}`)
                context.commit('setDonors', response.data);
                return response
            }
            else{
                const response = await axiosInstance.get(`/filterSearch/${context.state.searchTerm}?page=${page}`)
                context.commit('setDonors', response.data);
                return response
            }
        }
        catch(err){
            return {error:err.response.data.error[0].message}
        }
    },

    async addDonor(context, payload){
        let addResponse=null;
        try{
            await axiosInstance.post('/addDonor', payload)
            .then((response)=>{
                addResponse = response.data;
                context.dispatch('setDonors',context.getters.getCurrPage);
                context.commit('addDonor', payload);
                console.log(response)
            })
            return addResponse;
        }
        catch(err){
            return {error:err.response.data.error[0].message}
        }
    },
    
    async removeDonor(context, payload){
        console.log(payload)
        let removeReponse=null;
        try{
            await axiosInstance.delete(`/removeDonor/${payload}`)
            .then((response)=>{
                removeReponse = response.data;
                context.commit('removeDonor', payload);
                context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage});
            })
            return removeReponse;
        }
        catch(err){
            return {error:err.response.data.error[0].message}
        }
    },

    async updateDonor(context, payload){
        context.rootState.editDonor = false;
        const d = new Date();
        const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        const donor = {...payload, last_donated};
        var updateResponse = null;
        try{
            await axiosInstance.patch('/updateDonor', {_id:payload._id, address:payload.address, contact:payload.contact})
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