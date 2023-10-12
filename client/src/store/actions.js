export default {
    changeAddformStatus(context){
        context.commit('changeAddformStatus')
    },
    changeEditStatus(context, payload){
        context.commit('changeEditStatus', payload)
    },
    disableEdit(context){
        context.commit('disableEdit')
    }
}