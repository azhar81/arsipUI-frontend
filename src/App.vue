<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inika:wght@400;700&display=swap"
  />
  <div id="app">
    <Navbar />
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    LandingPage,
    Navbar,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
