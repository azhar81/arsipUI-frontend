import axios from 'axios';

const state = {
    user: null,
    token: localStorage.getItem('token') || null,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    LOGOUT(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
    },
};

const actions = {
    async login({ commit }, credentials) {
        try {
        const response = await axios.post(import.meta.env.VITE_API_AUTH_URL, credentials);
        console.log(response.data)
        const { user, access: token } = response.data;

        commit('SET_USER', user);
        commit('SET_TOKEN', token);

        return Promise.resolve();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with an error
                console.error('Server Error:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response from server');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error during request setup:', error.message);
              }
        
              // Optionally, you can rethrow the error to allow the component to handle it
              throw error;
        }
    },

    logout({ commit }) {
        commit('LOGOUT');
    },
};

const getters = {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};