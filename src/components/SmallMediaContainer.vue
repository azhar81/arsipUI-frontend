<template>
  <router-link :to="'/detail/' + item.id" class="item-container">
      <img :src="item.file_paths[0].file" />
      <div class="title">
          <h1>{{ item.title }}</h1>
      </div>
      <div class="information">
          <div class="date">
          <p>{{ item.upload_date.slice(0,10) }}</p>
          </div>
          <div class="reader-count">
          <p>{{ item.reader_count }} pembaca</p>
          </div>
      </div>
  </router-link>
</template>

<script>
export default {
  props: {
      item: Object
  },

};
</script>

<style>
@import "../assets/smallmediacontainer.css";
</style>