import axiosInstance from '@/service/axios.service';
import axios from 'axios';
const url = "http://localhost:3000";
const router = require('../../routes');

export default{
    async login(context, payload){
        try{
            const response = await axios.post(`${url}/login`, payload);
            if(!response.data.validationError){
                const token = response.data.success.token;
                sessionStorage.setItem('token', token);
                context.dispatch('updateLoginStatus', true);
    
                context.dispatch('updateRole',response.data.success.role)
                if(response.data.success.role === 'admin')
                    router.default.replace('/dashboard');
                else{
                    router.default.replace({name:'homepage'});
                }
                return {"validationSuccess":""};
            }
            else{
                return {"validationError":response.data.validationError};
            }
        }
        catch(error){
            if(error.response.data.validationError){
                return {"validationError":error.response.data.validationError};
            }
            else{
                console.log(error);
                return {"validationError":"we got some error please try after sometime"};
            }
        }
    },

    async signup(context, payload){
        try{
            const response = await axios.post(`${url}/signup`, payload);
            if(response.data.duplicacyError){
                return {"duplicacyError":response.data.duplicacyError};
            }
            return {"signupSuccess":""};
        }
        catch(error){
            return {error:error.response.data.error[0].message}
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

    // fetch all pending enquiries and add it to store variable
    async setAllPendingEnquiries(context){
        const enquiries = await axios.get(`${url}/getPendingEnquiries`)
        console.log(enquiries)
        context.commit('setEnquiries', enquiries.data)
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



    // when admin approve or reject the request of any user
    async updateEnquiry(content, payload){
        const {id, action} = payload;
        const response = await axiosInstance.put(`/enquiry?_id=${id}&action=${action}`);
        console.log(response);
    },
    // donor record page
    approveUserRequest(context, payload){
        context.dispatch('updateEnquiry',{id:payload, action:"approve"});
        context.commit('approveUserRequest', payload);
    },

    rejectUserRequest(context, payload){
        context.dispatch('updateEnquiry', {id:payload,action:"reject"});
        context.commit('rejectUserRequest', payload);
    }
}