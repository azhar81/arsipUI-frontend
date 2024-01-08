import axios from 'axios';

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
};

const mutations = {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', JSON.stringify(token));
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
    const { user, refresh, access } = response.data;

    const token = {
      'access': access,
      'refresh': refresh
    };

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

    async logout({ commit }) {
      commit('LOGOUT');
      return Promise.resolve();
    },

    async refreshAccessToken({ commit, state }) {
      try {
        const response = await axios.post(import.meta.env.VITE_API_AUTH_URL + 'refresh/', {
            refresh: state.token.refresh, // Assuming the refresh token is stored in the token field
        });

        const newAccessToken = response.data.access;

        commit('SET_TOKEN', {
            access: newAccessToken,
            refresh: state.token.refresh,
        });

        return Promise.resolve(newAccessToken);
      } catch (error) {
        // Handle refresh error
        return Promise.reject(error);
      }
    },
    
      async initAxios({ dispatch, state }) {
        if (!state.token) {
          // If the user is not authenticated, there's no token to attach to the requests
          return;
        }
      
        // Intercept requests to add authentication details
        axios.interceptors.request.use(
          (config) => {
            var token = null;
            try {
              token = state.token.access;
            }
            catch (error) {
              // token stay null
            }

            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            console.log("request error")
            return Promise.reject(error);
          }
        );
      
        // Intercept responses for additional handling if needed
        axios.interceptors.response.use(
          (response) => {
            return response;
          },
          async (error) => {
            const originalRequest = error.config;
      
            // Check if the error is due to an expired token
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
      
              try {
                // Refresh the token using the refreshAccessToken action
                const newAccessToken = await dispatch('refreshAccessToken');
      
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
              } catch (refreshError) {
                // Handle refresh error, e.g., redirect to login
                console.error('Token refresh failed:', refreshError);
                dispatch('logout'); // Logout the user or handle as needed
                return Promise.reject(refreshError);
              }
            }
      
            return Promise.reject(error);
          }
        );
      },
};

const getters = {
  isAuthenticated: state => !!state.token,
  getUser: state => state.user,
  getRefreshToken: state => state.token,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};