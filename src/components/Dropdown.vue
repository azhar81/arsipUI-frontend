<template>
  <div class="dropdown">
    <button @click="toggleDropdown">{{ title }}</button>
    <ul v-if="isOpen" class="options">
      <li v-for="option in options" :key="option" @click="selectOption()">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
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
  },
  props: {
    title: String,
    options: Array,
  },
};
</script>

<style scoped>
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
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;

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
