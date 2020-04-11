import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.ts')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)        
    }
})

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {} 
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {}) 
        },
        
        updateProfile({ commit, state }, data) {
            let name = data.name
            let title = data.title

           
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        }
    }
})