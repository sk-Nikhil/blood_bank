import axios from 'axios';
const url = "http://localhost:3000";
const router = require('../../routes');

export default{
    async login(context, payload){
        try{
            const response = await axios.post(`${url}/login`, payload);
            if(response.data.success){
                const token = response.data.success.token;
                localStorage.setItem('token', token);
                context.dispatch('updateLoginStatus', true);
    
                context.dispatch('updateRole',response.data.success.role)
                if(response.data.success.role === 'admin')
                    router.default.replace({name:"admin_home"});
                else{
                    router.default.replace({name:'user_home'});
                }
            }
            else{
                router.default.replace('/login');
                return response.data.failure;
            }
        }
        catch(err){
            if(err.response.data.error){
                return err.response.data.error
            }
        }
    },

    logout(context){
        localStorage.removeItem('token');
        context.dispatch('updateLoginStatus', false);
        router.default.replace('/');
    },

    updateLoginStatus(context, payload){
        context.commit('updateLoginStatus', payload);
    },

    updateRole(context, payload){
        context.commit('updateRole', payload)
    },

    async setTotalPendingEnquiries(context){
        try{
            const response = await axios.get('http://localhost:3000/getTotalPendingEnquiries');
            context.commit('setTotalPendingEnquiries', response.data.data);
        }
        catch(err){
            console.log(err)
        }
    },

    // set enquiries in store
    async setAllEnquiries(context, payload){
        try{
            const enquiries = await axios.get(`${url}/getAllEnquiries?page=${payload.page}&itemsPerPage=${payload.itemsPerPage}`)
            context.commit('setEnquiries', enquiries.data.enquiries)
            return enquiries.data.totalEnquiries;
        }
        catch(err){
            return err
        }
    },

    async setAllPendingEnquiries(context){
        const enquiries = await axios.get(`${url}/getPendingEnquiries`)
        console.log(enquiries)
        context.commit('setEnquiries', enquiries.data)
    }
}