<template>
  <div class="navbar">
    <img src="../assets/static/logo_UI.png" alt="Icon" class="icon" />
    <div class="nav-links">
      <Dropdown
        title="Tentang UI"
        :options="['Visi & Misi', 'Etika & Norma', 'Peraturan & Budaya']"
      />
      <router-link to="/">Home</router-link>
      <router-link to="/detail/1">About</router-link>
      <HamburgerIcon></HamburgerIcon>
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";
import HamburgerIcon from "./icons/IconHamburger.vue";

export default {
  name: "Navbar",
  components: {
    Dropdown,
    HamburgerIcon,
  },
};
</script>

<style scoped>
@import "../assets/navbar.css";
</style>
