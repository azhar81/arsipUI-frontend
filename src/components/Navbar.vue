<template>
  <div class="navbar">
    <router-link to="/">
      <img src="../assets/static/logo_UI.png" alt="Icon" class="icon" />
    </router-link>
    <div class="nav-links">
      <div v-if="isAuthenticated">
        <div v-if="getUser.user_type == 'contributor'">
          <router-link class="create-sejarah" to="/create">
            Unggah Sejarah +
          </router-link>
        </div>
      </div>
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
import { mapGetters }  from "vuex"
import Dropdown from "./Dropdown.vue";

export default {
  name: "Navbar",
  components: {
    Dropdown,
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
    hamburgerObject() {
      if (this.isAuthenticated) {
        const user = this.getUser;
        return { 
          url: "",
          isProfile: true,
          username: user.username,
          userType: user.user_type,
          style: {
            display: 'block',
            padding: '10px',
            borderBottom: '1px solid',
            borderColor: '#E0DCDC'
          }
        };
      }
      else {
        return { 
          url: "/login",
          isButton: true,
          text: "⭲ Login",
          style: {
            width: '80%',
            height: '41px',
            margin: '10px',
            background: '#fed402',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '16px',
            color: '#000000',
            borderBottom: '1px solid',
            borderColor: '#E0DCDC'
          }
        };
      }
    },
    extraDropdown() {
      if (this.isAuthenticated) {
        const userType = this.getUser.user_type;
        switch (userType) {
          case 'contributor':
            return [
              { text: "🗎 Unggahan sejarah", url: "/contributions"},
              { text: "⟲ Terakhir dilihat", url: "/" },
              { text: "✉ Kontak", url: "/" },
              { text: "↦ Keluar", url: "/" , isLogout: true }
            ];

          case 'verificator':
            return [
              { text: "🗹 Verifikasi sejarah", url: "/verifications"},
              { text: "✉ Kontak", url: "/" },
              { text: "↦ Keluar", url: "/" , isLogout: true }
            ];
        }
      } else {
        return [
              { text: "⟲ Terakhir dilihat", url: "/" },
              { text: "✉ Kontak", url: "/" }
        ];
      }
    },
    dropdownOptions() {
      return [
      this.hamburgerObject,
      ...this.extraDropdown,
    ];
    }
  },
};
</script>

<style scoped>
@import "../assets/navbar.css";
</style>
