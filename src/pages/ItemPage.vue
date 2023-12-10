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
                                <p>Oleh <b>{{ item.contributor.username }}</b> | 
                                    {{ item.reader_count }} pembaca</p>
                            </div>
                        </div>
                    </div>
                    <div v-html="item.formatted_content" class="description">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </template>
  
<script>
import axios from "axios";
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
    };
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
          console.error("Error fetching data:", error);
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
  }
};
</script>
  
<style>
.item-page-view{
    background-color: #282828;
}

.navigation {
    display: flex;
    flex-direction: row;

    * {
        padding-right: 10px;
    }
}

b {
    font-size: 16px;
    font-weight: 700;
}

.main-block {
  box-sizing: border-box;
  padding: 20px;
  margin: 8% auto 0 0;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: auto;

  .images-block {
    height: 732px;
    width: 706px;
    margin: 0 auto;
    position: relative;

    /* Center content vertically using Flexbox */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 12px;
      display: block;
      margin: auto;
    }

    .main-image-block {
      .main-image {
        width: 706px;
        max-height: 530px;
      }
    }

    .small-images-block {
        width: 706px;
        position: relative;
    }

    .scroll-buttons {
        display: flex;
        align-items: center;
    }

    .scroll-buttons button {
        padding: 5px 10px;
        cursor: pointer;
        margin: 10px;
        background: #fed402;
        border-radius: 12px;
        font-weight: 1000;
        font-size: 20px;
        color: #000000;
    }

    .scroll-button-left {
        position: absolute;
        z-index: 1;
        left: 0;
    }
    .scroll-button-right {
        position: absolute;
        z-index: 1;
        right: 0;
    }

    .image-list {
        height: auto;
        width: 100%;
        overflow-x: hidden; /* Hide the standard scrollbar */
        white-space: nowrap;
        position: relative;
        z-index: 0;
        margin-top: 20px;
    }

    .image-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }

    .image-list li {
        margin-right: 20px;
    }

    .image-list img {
        height: 185px;
        width: auto;
        border-radius: 6px;
    }
  }

  .content-block {
    width: 706px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    display: flex;

    .information-block {
        margin: auto 0;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 40px;
        font-weight: 700;
        color: #FFFFFF;

    }

    .information {
        display: flex;

        font-weight: 400;
        font-size: 12px;

        color: #ffffff;
        margin-bottom: 20px; 

        display: flex;
        flex-direction: column;
        justify-content: left;

        .date-and-contributor {
            display: flex;
            justify-content: left;
            align-items: center;
        }

        .date,
        .contributor {
            margin-right: 10px; /* Add some spacing between date and contributor */
        }

        .reader-count {
            margin-top: 10px; /* Add spacing between date-and-contributor and reader-count */
        }

        .date {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            width: 95px;
            height: 41px;
            padding: 10px;
            border-radius: 8px;
            gap: 10px;

            background: #fed402;
            border-radius: 4px;

            /* Inside auto layout */
            flex: none;
            order: 0;
            flex-grow: 0;

            font-size: 16px;
            font-weight: 400;
            line-height: 21px;
            color: #000000;

            .extra {
                font-size: 16px;
                font-weight: 400;
            }
        }
    }
        
    .description {
        text-align: justify;
        overflow: auto;
        max-height: 400px;
        padding-right: 10px;
        color: #ffffff;
    }
  }

  .text-link {
    color: white;
    text-decoration: underline; /* Add underline to mimic a link */
    cursor: pointer; /* Change cursor on hover for better user experience */
    }
}
</style>