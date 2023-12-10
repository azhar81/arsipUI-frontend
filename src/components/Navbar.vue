<template>
  <div class="navbar">
    <router-link to="/">
      <img src="../assets/static/logo_UI.png" alt="Icon" class="icon" />
    </router-link>
    <div class="nav-links">
      <Dropdown
        title="Tentang UI"
        :options="[
          {
            'text':'Visi & Misi',
            'url':'/'
          },
          {
            'text':'Etika & Norma',
            'url':'/'
          },
          {
            'text':'Peraturan & Budaya',
            'url':'/'
          }
        ]"
        :withArrow="true"
      />
      <router-link class="text-link" to="/search">🔎︎</router-link>
      <Dropdown
        title="☰"
        :options="dropdownOptions"
        :withArrow="false"
        position='-42px'
      />
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
  data() {
    return {
      dropdownOptions: [
        { 
          url: "/login",
          isButton: true,
          text: "Login",
          style: {
            width: '80%',
            height: '41px',
            margin: '10px',
            background: '#fed402',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '16px',
            color: '#000000'
          }
        },
        { text: "⟲ Terakhir dilihat", url: "/" },
        { text: "✉ Kontak", url: "/" },
      ],
    };
  },
};
</script>

<style scoped>
@import "../assets/navbar.css";
</style>
