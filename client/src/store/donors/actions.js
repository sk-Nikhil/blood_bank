
import axiosInstance from '../../service/axios.service.js';

export default {
    async setDonors(context, payload) {
        try {
            const response = await axiosInstance.get(`/donors?numberOfRecords=${payload.numberOfRecords}&searchTerm=${payload.searchTerm}`);
            context.commit('setDonors', response.data);
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
            if (response.data) {
                // context.dispatch('setDonors',context.getters.getCurrPage);
                context.commit('addDonor', { ...donor, _id: response.data.id});
                return response.data.data;
            }
        }
        catch (err) {
            if (!err.response) {
                return err.message;
            }
            else {
                return err.response.data.error[0].message;
            }
        }
    },

    async removeDonor(context, payload) {
        console.log(payload)
        try {
            const response = await axiosInstance.delete(`/donor/${payload}`);
            context.commit('removeDonor', payload);
            // context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage});
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
            return response.data;
        }
        catch (err) {
            return { error: err.response.data.error[0].message }
        }

    },

    setSearchTerm(context, payload) {
        context.commit('setSearchTerm', payload);
    },

    sortDonors(context, payload) {
        context.commit('sortDonors', payload);
    }
}