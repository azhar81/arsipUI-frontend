<template>
    <Navbar />
    <div class="login-page-view">
        <form @submit.prevent="onLogin">
            <label for="username">Username:</label>
            <input type="text" v-model="username" required>
            
            <label for="password">Password:</label>
            <input type="password" v-model="password" required>
            
            <button type="submit">Login</button>
        </form>
        <div v-if="error">
        {{ this.error }}
        </div>
        <div v-if="isAuthenticated">
            <!-- Content for authenticated users -->
            <h1>AUTHENTICATED</h1>
            <h2>{{ user }}</h2>
            
            <button @click="onLogout">Logout</button>
        </div>
        <div v-else>
            womp womp
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
    user() {
        return this.getUser;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        // Redirect or perform additional actions after successful login
      } catch (error) {
        // Handle login error
        this.error = "Wrong credentials, try again";
      }
    },
    ...mapActions('auth', ['logout']),
    async onLogout() {
      try {
        await this.logout();
        // Redirect or perform additional actions after successful logout
      } catch (error) {
        // Handle logout error (display error message, etc.)
        console.error('Logout error:', error.message);
      }
    },
  },
};
</script>

<style>
.login-page-view {
    margin-top: 170px;
}
</style>
