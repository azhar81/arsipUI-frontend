<template>
    <FullImagePopup v-if="showModal" :imageUrl="modalImageUrl" @close="closeModal" />
    <Navbar />
    <div class="item-page-div">
    <div v-if="loading">Loading...</div>
    <div v-else>
        <div class="main-block">
            <div class="images-block">
                <div class="main-image-block">
                    <img :src="main_image.file" @click="openModal(main_image.file)" class="main-image">
                </div>
                <div class="small-images-block" v-if="images.length > 0">
                    <div class="scroll-buttons">
                        <button @click="scrollLeft" v-if="showScrollLeftButton" class="scroll-button-left">←</button>
                        <div class="image-list" ref="imageList">
                            <ul>
                                <li v-for="(image, index) in images" :key="index">
                                    <img :src="image.file" @click="openModal(image.file)" alt="Small Image" />
                                </li>
                            </ul>
                        </div>
                        <button @click="scrollRight" v-if="showScrollRightButton" class="scroll-button-right">→</button>
                    </div>
                </div>
            </div>
            <div class="content-block">
                <div class="information-block">
                    <div class="navigation">
                        <router-link to="/" class="text-link">Beranda</router-link>
                        <p>➤</p>
                        <p><b> {{ item.title }}</b></p>
                    </div>
                    <h1>{{ item.title }}</h1>
                    <div class="information">
                        <div class="date-and-contributor">
                            <div class="date">
                                <p>{{ item.event.date.slice(0,10) }}</p>
                            </div>
                            <div class="contributor">
                                <p>Oleh <b>{{ item.contributor.username }}</b>
                                    <div v-if="item.status !== 'waitlist'"> | {{ item.reader_count }} pembaca</div></p>
                            </div>
                        </div>
                    </div>
                    <div v-html="item.formatted_content" class="description">
                    </div>
                </div>
                <div v-if="userType == 'verificator' && item.status == 'waitlist'" class="verifikasi-sejarah-div">
                    <div v-if="approved">
                        <div class="verifikasi-text-div">
                            <h2 class="checkmark-on-approved">🗹</h2>
                            <h2 class="verifikasi-sejarah-text">Verifikasi Disetujui</h2>
                            <p class="extra-text">Sejarah akan segera diunggah secara publik.</p>
                        </div>
                    </div>
                    <div v-else-if="item.status == 'rejected' || rejected ">
                        <div class="verifikasi-text-div">
                            <h2 class="x-on-rejected">🗷</h2>
                            <h2 class="verifikasi-sejarah-text">Verifikasi Ditolak</h2>
                        </div>
                    </div>
                    <div v-else-if="rejecting">
                        <div class="verifikasi-text-div">
                            <h2 class="verifikasi-sejarah-text">Verifikasi Sejarah?</h2>
                        </div>
                        <div class="verification-buttons">
                            <button @click="tolakCancel" class="tolak-cancel">
                                Tolak
                            </button>
                            <form id="updateForm" class="tolak-form">
                                <textarea type="text" id="reject_reason" v-model="reject_reason" class="textarea-tolak" placeholder="Tulis masukan di sini" required></textarea>

                                <button type="button" @click="submitForm" class="submit-button">Kirim</button>
                            </form>
                        </div>
                    </div>
                    <div v-else>
                        <div class="verifikasi-text-div">
                            <h2 class="verifikasi-sejarah-text">Verifikasi Sejarah?</h2>
                        </div>
                        <div class="verification-buttons">
                            <button @click="tolak" class="tolak-button">
                                Tolak
                            </button>
                            <button @click="setuju" class="setuju-button">
                                Setuju
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </template>
  
<script>
import axios from "axios";
import { mapGetters }  from "vuex"
import Navbar from "../components/Navbar.vue";

import FullImagePopup from '../components/FullImagePopup.vue';

export default {
  components: {
    Navbar,
    FullImagePopup
  },
  data() {
    return {
        item: {},
        main_image: "",
        images: [],
        currentIndex: 0,
        scrollAmount: 150,
        imageListWidth: 0,
        showScrollLeftButton: false,
        showScrollRightButton: false,
        loading: true,
        showModal: false,
        modalImageUrl: '',
        approved: false,
        rejecting: false,
        rejected: false,
        reject_reason: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
    userType() {
        return this.isAuthenticated ? this.getUser.user_type : null
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const itemId = this.$route.params.itemId;
      axios
        .get(import.meta.env.VITE_API_URL + itemId)
        .then((response) => {
                this.item = response.data;
                this.images = this.item.file_paths;
                this.main_image = this.images.shift();
                if (this.images.length > 2) {
                    this.showScrollRightButton = true
                }
                this.loading = false;
            })
        .catch((error) => {
            this.router.go()
        });
    },
    submitForm() {
      // Assuming you have the API endpoint URL
      const url = import.meta.env.VITE_API_URL + this.item.id + '/reject';

      // Data to be sent in the PATCH request
      const dataToUpdate = {
        reject_reason: this.reject_reason,
        // Add other fields if needed
      };

      // Make the PATCH request
      axios
        .patch(url, dataToUpdate)
        .then(response => {
          // Handle success
          console.log('PATCH request successful:', response.data);
          
          this.rejected = true
        })
        .catch(error => {
          // Handle error
          console.error('Error making PATCH request:', error.response.data);
          // Optionally, display an error message to the user
        });
    },
    scrollLeft() {
      if (this.$refs.imageList) {
        this.$refs.imageList.scrollLeft -= this.scrollAmount;
        this.updateScrollButtonVisibility();
      }
    },
    scrollRight() {
        if (this.$refs.imageList) {
            this.$refs.imageList.scrollLeft += this.scrollAmount;
            this.updateScrollButtonVisibility();
        }
    },
    updateScrollButtonVisibility() {
        this.$nextTick(() => {
            this.showScrollLeftButton = this.$refs.imageList.scrollLeft > 0;
            this.showScrollRightButton = this.$refs.imageList.scrollLeft < (this.$refs.imageList.scrollWidth - this.$refs.imageList.clientWidth);
        });
    },
    openModal(imageUrl) {
        this.modalImageUrl = imageUrl;
        this.showModal = true;
    },
    closeModal() {
        this.showModal = false;
    },
    setuju() {
        this.approved = true;
        axios
        .get(import.meta.env.VITE_API_URL + this.item.id + '/approve')
        .then((response) => {
                this.approved = true;
            })
        .catch((error) => {
            this.router.go()
        });
    },
    tolak() {
        this.rejecting = true;
    },
    tolakCancel() {
        this.rejecting = false;
    }
  }
};
</script>
  
<style>
@import "../assets/itempage.css";
</style>