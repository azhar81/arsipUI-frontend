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
.login-page-view {
  color: black;
  display: flex;
  flex-direction: row;
    .aesthetic-background {
      width: 50vw;
      height: 100vh;
      background-image: url("../assets/static/music.png");
      background-size: 50vw;
      background-position: left;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }

    .login-div {
      display: flex;
      flex-direction: column;
      width: 50vw;
      height: 100vh;
      background-color: white;
      
      align-items: center;
    }

    .login-form {
      margin: auto;
      font-size: 20px;
      font-weight: 700;

      width: 60%;
      display: flex;
      flex-direction: column;
      padding: 10%;

      .login-input {
        width: 100%;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid;
        margin-bottom: 20px;
      }
    }
}

.error-message {
  position: relative;
}

</style>
