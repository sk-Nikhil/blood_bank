import axios from 'axios'
export default {
    changeAddformStatus(context){
        context.commit('changeAddformStatus')
    },
    changeEditStatus(context, payload){
        context.commit('changeEditStatus', payload)
    },
    disableEdit(context){
        context.commit('disableEdit')
    },

    async countGroups(context){
        const blood_groups = await axios.get('http:/localhost:3000/getCounter')
        console.log(blood_groups)
        context.commit('countGroups')
    }
}