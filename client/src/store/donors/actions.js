
import axiosInstance from '../../service/axios.service.js';

export default {
    async setDonors(context, payload) {
        try {
            const response = await axiosInstance.get(`/donors?page=${payload.page}&itemsPerPage=${payload.itemsPerPage}&searchTerm=${payload.searchTerm}&sortBy=${payload.sortBy}`);
            context.commit('setDonors', response.data.donorsFound.slice(0, payload.itemsPerPage));
            context.dispatch('setItemsPerPage', payload.itemsPerPage)
            return response;
        }
        catch (err) {
            return { error: err.message }
        }
    },

    async addDonor(context, payload) {
        const d = new Date()
        const lastDonated = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        const donor = {...payload, lastDonated}
        try {
            const response = await axiosInstance.post('/donor', donor);
            if(response.data.validationError)
                return {validationError:response.data.validationError}
            if (response.data) {
                context.commit('addDonor', { ...donor, _id: response.data.id});
                return {success:response.data.data};
            }
        }
        catch (err) {
            if (!err.response) {
                return err.message;
            }
            else {
                return {validationError:err.response.data.error[0].message};
            }
        }
    },

    async removeDonor(context, payload) {
        try {
            const response = await axiosInstance.delete(`/donor/${payload}`);
            context.commit('removeDonor', payload);
            return response.data.data
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data.error[0].message)
                return "something went wrong, unable to delete";
            }
        }
    },

    async updateDonor(context, payload) {
        context.rootState.editDonor = false;
        const d = new Date();
        const lastDonated = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        const donor = { ...payload, lastDonated };
        try {
            const response = await axiosInstance.put(`/donor/${payload._id}`, { address: payload.address, contact: payload.contact })
            context.commit('updateDonor', donor);
            return response.data.data;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response.data.error[0].message
        }
    },

    setItemsPerPage(context, payload){
        context.commit('setItemsPerPage', payload)
    }

}