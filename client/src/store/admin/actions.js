import axios from 'axios';
const url = "http://localhost:3000";
const router = require('../../routes')

export default{
    async login(context, payload){
        const response = await axios.post(`${url}/login`, payload);
        console.log(response)
        if(response.data.success){
            context.dispatch('updateLoginStatus', true)
            router.default.replace('/home')
        }
        else{
            return response.data.failure
        }

    },

    logout(context){
        context.dispatch('updateLoginStatus', false)
        router.default.replace('/')
    },

    updateLoginStatus(context, payload){
        context.commit('updateLoginStatus', payload)
    }
}