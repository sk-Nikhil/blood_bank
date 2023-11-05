import axios from 'axios';
const url = "http://localhost:3000";
const router = require('../../routes');

export default{
    async login(context, payload){
        try{
            const response = await axios.post(`${url}/login`, payload);
            if(response.data.success){
                const token = response.data.success.token;
                sessionStorage.setItem('token', token)
                // localStorage.setItem('token', token);
                context.dispatch('updateLoginStatus', true);
    
                context.dispatch('updateRole',response.data.success.role)
                if(response.data.success.role === 'admin')
                    router.default.replace('/dashboard');
                else{
                    router.default.replace({name:'homepage'});
                }
            }
            else{
                router.default.replace('/login');
                return response.data.failure;
            }
        }
        catch(error){
            console.log(error)
            if(error.response.data.error){
                return error.response.data.error
            }
        }
    },

    async signup(context, payload){
        try{
            const response = await axios.post(`${url}/signup`, payload);
            console.log(response)
            if(response.data){

                return response.data;
            }
        }
        catch(error){
            console.log(error)
            return error.response.data.error[0].message
        }
    },

    logout(context){
        sessionStorage.clear()
        context.dispatch('updateLoginStatus', false);
        router.default.replace('/');
    },

    updateLoginStatus(context, payload){
        context.commit('updateLoginStatus', payload);
    },

    updateRole(context, payload){
        context.commit('updateRole', payload)
    },

    async countTotalPendingEnquiries(context){
        try{
            const response = await axios.get('http://localhost:3000/getTotalPendingEnquiries');
            context.commit('countTotalPendingEnquiries', response.data.data);
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