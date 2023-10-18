import axios from 'axios'
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
        await axios.post('http://localhost:3000/addDonor', payload)
        .then(()=>{
            context.dispatch('setDonors',context.getters.getCurrPage)
            context.commit('addDonor', payload)
        })
    },
    
    async removeDonor(context, payload){
        console.log(context)
        await axios.delete(`http://localhost:3000/removeDonor/${payload}`)
        .then(()=>{
            context.commit('removeDonor', payload)
            context.dispatch('setDonors',{source:'remove', page:context.getters.getCurrPage})
        })
    },

    async updateDonor(context, payload){
        context.rootState.editDonor = false
        const d = new Date()
        const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        const donor = {...payload, last_donated}

        await axios.patch('http://localhost:3000/updateDonor', donor)
        .then(response=>{
            console.log(response.data)
            context.commit('updateDonor', donor)
        })

    },

    setSearchTerm(context, payload){
        context.commit('setSearchTerm', payload)
    },

    sortDonors(context, payload){
        context.commit('sortDonors', payload)
    }
}