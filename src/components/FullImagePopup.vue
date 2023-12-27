<template>
    <div class="modal" @click="closeModal">
      <div class="modal-content">
        <img :src="imageUrl" alt="Full Size Image" @click.stop />
      </div>
    </div>
</template>
  
<script>
export default {
    props: {
        imageUrl: String,
    },
    methods: {
        closeModal() {
        this.$emit('close');
        },
    },
};
</script>
  
<style scoped>
@import "../assets/fullimage.css";
</style>