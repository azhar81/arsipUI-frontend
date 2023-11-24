<template>
  <div>
    <div class="center-block">
      <p class="tahun-berdiri">1849</p>
      <p class="judul-berdiri">Sejarah Berdirinya Universitas Indonesia</p>
      <p class="isi-berdiri">
        Awalnya, UI merupakan sekolah kedokteran bernama School of Medicine for
        Indigenous Doctors atau yang dikenal sebagai STOVIA pada era kolonial
        Belanda pada tahun 1849. Setelah kemerdekaan, STOVIA beberapa kali
        berganti nama, salah satunya menjadi Universiteit Indonesia pada tahun
        1950 dan memiliki 5 fakultas.
      </p>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="items-container" v-if="items.length > 0">
        <div v-for="item in items" :key="item.id" class="item-container">
          <img :src="item.file_path" />
          <div class="title">
            <h1>{{ item.title }}</h1>
          </div>
          <div class="information">
            <div class="date">
              <p>{{ item.event_date }}</p>
            </div>
            <div class="reader-count">
              <p>{{ item.reader_count }} pembaca</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No data available</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(import.meta.env.VITE_API_URL)
        .then((response) => {
          this.items = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error.message || "Error fetching data";
          this.loading = false;
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
@import "../assets/landing.css";
</style>
