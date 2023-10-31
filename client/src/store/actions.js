import axiosInstance from '@/service/axios.service';

export default {
    changeAddformStatus(context){
        context.commit('changeAddformStatus');
    },
    changeEditStatus(context, payload){
        context.commit('changeEditStatus', payload);
    },
    disableEdit(context){
        context.commit('disableEdit');
    },

    async countGroups(context){
        const counts = await axiosInstance.get('/countBloodGroups');
        context.commit('countGroups', counts.data);
    },
}