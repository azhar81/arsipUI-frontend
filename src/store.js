import { createStore } from 'vuex';
import axios from 'axios';
import auth from './store/auth';

const store = createStore({
    modules: {
        auth,
    },
    actions: {
        // Action to initialize Axios with authentication details
        initAxios({ dispatch }) {
          // Set the base URL of your DRF backend
          axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    
          // Dispatch the initAxios action from the 'auth' module
          dispatch('auth/initAxios');
        },
      },
});

export default store;