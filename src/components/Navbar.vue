<template>
  <div class="navbar">
    <img src="../assets/static/logo_UI.png" alt="Icon" class="icon" />
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
@import "../assets/navbar.css";
</style>
