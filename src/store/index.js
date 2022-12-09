import { createStore } from 'vuex';
import { auth } from '@/api/auth.js';
import { getUser } from "@/api/user.js";

const store = createStore({
    state: {
        userAuth:{},
        userInfo:{},
        isAdmin:false,
    },
    getters: {
    },
    mutations: {
        SET_AUTH(state, obj){
            state.userAuth = obj.data;
        },
        SET_USER(state, obj){
            state.userInfo = obj.userInfo;
            state.isAdmin = obj.userInfo.is_superuser;
        }
    },
    actions: {
        FETCH_AUTH(context, params){
            auth(params)
                .then( response => {
                    context.commit('SET_AUTH', response.data);
                 })
                .catch(error =>{
                    console.log(error);
                })
        },
        FETCH_USER(context, params){
            getUser(params.user_id)
                .then( response => {
                    context.commit('SET_USER', response.data);
                })
                .catch(error =>{
                    console.log(error);
                })
        },
    },
});

export default store;