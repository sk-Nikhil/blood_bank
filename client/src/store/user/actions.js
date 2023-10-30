// import axiosInstance from '../../service/axios.service.js'
import axios from 'axios'
export default{
    async addEnquiry(context, data){
        try{
            const response = await axios.post('http://localhost:3000/addEnquiry', data)
            return response;
        }
        catch(err){
            return {error:err.response.data.error[0].message}
        }
    },

    async setEnquiries(context){
        try{
            const response = await axios.get('http://localhost:3000/getEnquiries');
            context.commit('setEnquiries',response.data);
            return response;
        }
        catch(err){
            console.log("err",err.response.data)
            return {error:err.response.data};
        }
    }
}