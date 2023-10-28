// import axiosInstance from '../../service/axios.service.js'
import axios from 'axios'
export default{
    async addEnquiry(context, data){
        return await axios.post('http://localhost:3000/addEnquiry', data)
    }
}