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
      <button @click="handleButtonClick" class="tombol-berdiri">
        Pelajari Lebih Lanjut
      </button>
    </div>
    <div class="items">
      <!-- Popular Items -->
      <div class="separate-items">
        <p class="main">Terpopuler</p>
        <div class="items-container" v-if="popular_items.length > 0">
          <div
            v-for="item in popular_items"
            :key="item.id"
            class="item-container"
          >
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
      <!-- Latest Items -->
      <div class="separate-items">
        <p class="main">Terkini</p>
        <div class="items-container" v-if="latest_items.length > 0">
          <div
            v-for="item in latest_items"
            :key="item.id"
            class="item-container"
          >
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      popular_items: [],
      latest_items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(import.meta.env.VITE_API_URL + "?sort_by_reader=true&limit=3")
        .then((response) => {
          this.popular_items = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      axios
        .get(import.meta.env.VITE_API_URL + "?limit=3")
        .then((response) => {
          this.latest_items = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    handleButtonClick() {
      // Handle button click logic here
      console.log("Button clicked!");
    },
  },
};
</script>

<style scoped>
@import "../assets/landing.css";
</style>
