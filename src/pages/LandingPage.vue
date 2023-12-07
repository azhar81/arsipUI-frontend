<template>
  <div>
    <Navbar />
    <LandingComponent />
  </div>
</template>

<script>
import LandingComponent from "../components/LandingComponent.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    LandingComponent,
    Navbar,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
