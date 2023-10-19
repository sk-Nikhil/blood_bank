import axios from 'axios';

export default {

    async setDonors(context, page){
        if(!context.state.searchTerm){
            await axios.get(`http://localhost:3000/getDonors?page=${page}`).then(response=>{
                context.commit('setDonors', response.data);
            })
        }
        else{
            await axios.get(`http://localhost:3000/filterSearch/${context.state.searchTerm}?page=${page}`)
            .then(response=>{
                context.commit('setDonors', response.data);
            })
        }
    },

    async addDonor(context, payload){
        let addResponse
        await axios.post('http://localhost:3000/addDonor', payload)
        .then((response)=>{
            addResponse = response.data
            context.dispatch('setDonors',context.getters.getCurrPage)
            context.commit('addDonor', payload)
        })
        return addResponse
    },
    
    async removeDonor(context, payload){
        let removeReponse
        await axios.delete(`http://localhost:3000/removeDonor/${payload}`)
        .then((response)=>{
            removeReponse = response.data
            context.commit('removeDonor', payload)
            context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage})
        })
        return removeReponse
    },

    async updateDonor(context, payload){
        context.rootState.editDonor = false
        const d = new Date()
        const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        const donor = {...payload, last_donated}
        var updateResponse

        await axios.patch('http://localhost:3000/updateDonor', donor)
        .then(response=>{
            context.commit('updateDonor', donor)
            updateResponse = response.data
        })
        return updateResponse

    },

    setSearchTerm(context, payload){
        context.commit('setSearchTerm', payload)
    },

    sortDonors(context, payload){
        context.commit('sortDonors', payload)
    }
}