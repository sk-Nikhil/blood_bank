// import axiosInstance from '../../service/axios.service.js'
import axios from 'axios'
export default{
    async addEnquiry(context, data){
        try{
            const response = await axios.post('http://localhost:3000/addEnquiry', data);
            console.log(response)
            if(response.data.error)
                return response.data.error;
            return "your enquiry has been submitted, you will hear soon from us";
        }
        catch(err){
            if(err.response.data.error[0].message){
                console.log(err.response.data.error[0].message)
                return err.response.data.error[0].message
            }
            return err.response.data.error
        }
    },

    // not used
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