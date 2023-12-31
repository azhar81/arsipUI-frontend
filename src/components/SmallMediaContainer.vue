<template>
  <router-link :to="'/detail/' + item.id" class="item-container">
      <img v-if="item.file_paths[0].file_type=='img'" :src="item.file_paths[0].file" />
      <video v-if="item.file_paths[0].file_type=='vid'">
        <source :src="item.file_paths[0].file" :type="getVideoType(item.file_paths[0].file)">
      </video>
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
  methods: {
    getVideoType(filePath) {
      // Extract the file extension from the file path
      const fileExtension = filePath.split('.').pop().toLowerCase();

      // Map file extensions to corresponding video MIME types
      const extensionToTypeMap = {
        mp4: 'video/mp4',
        webm: 'video/webm',
        // Add more mappings as needed
      };

      // Use the mapped MIME type or a default type
      return extensionToTypeMap[fileExtension] || 'video/mp4';
    },
  }

};
</script>

<style>
@import "../assets/smallmediacontainer.css";
</style>