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
/* Styles for the modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    max-width: 80%;
    max-height: 80%;
    overflow: hidden;
}

img {
    width: 100%;
    height: auto;
}
</style>