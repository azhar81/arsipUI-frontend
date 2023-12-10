import axios from 'axios';

const storedUser = localStorage.getItem('user')
const state = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: localStorage.getItem('token') || null,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    LOGOUT(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

const actions = {
    async login({ commit }, credentials) {
        try {
        const response = await axios.post(import.meta.env.VITE_API_AUTH_URL, credentials);
        const { user: user, access: token } = response.data;

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

    initAxios() {
        // Intercept requests to add authentication details
        axios.interceptors.request.use(
          (config) => {
            const token = localStorage.getItem('token');
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    
        // Intercept responses for additional handling if needed
        axios.interceptors.response.use(
          (response) => {
            return response;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
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