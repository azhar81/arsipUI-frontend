<template>
    <div class="login-page-view">
      <div class="aesthetic-background">
      </div>
      <div class="login-div">
        <form @submit.prevent="onLogin" class="login-form">
          <label for="username">Username:</label>
          <input type="text" v-model="username" required class="login-input">
          
          <label for="password">Password:</label>
          <input type="password" v-model="password" required class="login-input">
          
          <button type="submit">Login</button>
          <div v-if="error" class="error-message">
          {{ this.error }}
          </div>
        </form>
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
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/')
      } catch (error) {
        // Handle login error
        this.error = "Wrong credentials, try again";
      }
    },
    ...mapActions('auth', ['logout']),
    async onLogout() {
      try {
        await this.logout();
      } catch (error) {
        // Handle logout error (display error message, etc.)
        console.error('Logout error:', error.message);
      }
    },
  },
};
</script>

<style>
@import "../assets/loginpage.css";
</style>
