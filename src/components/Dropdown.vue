<template>
  <div class="dropdown">
    <button @click="toggleDropdown">
      {{ title }}
      <span v-if="withArrow" class="arrow-icon">{{ isOpen ? '⮝ ' : '⮟' }}</span>
    </button>
    <ul v-if="isOpen" class="options">
      <li v-for="option in options" :key="option" @click="selectOption()" :style="cssProps">
        <router-link :to="option.url" class="text-link">
          <button v-if="option.isButton" :style="option.style" class="centered-button">
            {{ option.text }}
          </button>
          <span v-else-if="option.isProfile" :style="option.style">
            {{ option.username }}
            <b>{{ option.userType == 'contributor' ? 'Kontributor' : 'Verifikator' }}</b>
          </span>
          <span v-else-if="option.isLogout" @click="onLogout">{{option.text}}</span>
          <span v-else>{{ option.text }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption() {
      this.isOpen = false;
    },
    ...mapActions('auth', ['logout']),
    async onLogout() {
      try {
        await this.logout();
        this.$router.go();
        this.$router.push('/');
      } catch (error) {
        // Handle logout error (display error message, etc.)
        console.error('Logout error:', error.message);
      }
    },
  },
  props: {
    title: String,
    options: [Object],
    withArrow: Boolean,
    position: {
      type: String,
      default: '50%'
    }
  },
  computed: {
    cssProps() {
      return {
        '--position': this.position,
      }
    }
  },
};
</script>

<style scoped>
.centered-button {
  display: block;
  margin: 0 auto; /* Center the button horizontally */
}
.dropdown {
  position: relative;
  display: inline-block; /* Keeps the dropdown in line with the button */
}

button {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;

  color: #ffffff;
}
.options {
  top: calc(100% + 5px);
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  left: v-bind(position);

  width: 189px;
  height: auto;

  display: inline-block;

  background: #ffffff;
  border-radius: 18px;

  font-weight: 400;
  font-size: 16px;
  text-align: left;

  color: #000000;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
}

li {
  padding: 8px;
  cursor: pointer;
  width: 100%;
}

li:hover {
  background-color: #f5f5f5;
  border-radius: 18px;
}
</style>
