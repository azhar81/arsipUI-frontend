<template>
    <Navbar />
    <div class="landing-page-view">
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
#app {
  padding: 0;
}

.landing-page-view {
  background-image: url("../assets/static/Background_Rektorat.png");
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  background-position: center;
  background-attachment: fixed;
  overflow-y: hidden;
}
</style>
