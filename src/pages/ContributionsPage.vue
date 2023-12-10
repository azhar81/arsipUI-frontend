<template>
    <Navbar />
    <div class="search-page-view">
        <div class="search-container">
            <h1>Unggahan Sejarah</h1>
            <input v-model="searchTerm" @keydown.enter="handleSearch" placeholder="🔎︎ Cari sejarah di sini">
            <button @click="handleSearch">Search</button>
        </div>
        <hr>
        <div class="result-viewer">
            <div class="status-picker-div">
                <button @click="selectStatus('waitlist')" 
                :class="{ 'selected-status' : selectedStatus === 'waitlist', 'other-status' : selectedStatus !== 'waitlist' }">
                    Pengajuan
                </button>
                <button @click="selectStatus('approved')"
                :class="{ 'selected-status' : selectedStatus === 'approved', 'other-status' : selectedStatus !== 'approved' }">
                    Terunggah
                </button>
                <button @click="selectStatus('rejected')"
                :class="{ 'selected-status' : selectedStatus === 'rejected', 'other-status' : selectedStatus !== 'rejected' }">
                    Ditolak
                </button>
            </div>
            <div v-if="shown_items.length > 0" class="result-grid">
                <div v-for="item in shown_items" :key="item.id" class="grid-item">
                    <SmallMediaContainer :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import SmallMediaContainer from "../components/SmallMediaContainer.vue";

export default {
    components: {
        Navbar,
        SmallMediaContainer
    },
    data() {
        return {
            items: [],
            shown_items: [],
            searchTerm: "",
            selectedStatus: 'waitlist',
        };
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        selectedYearClass() {
            return {
                'other-year': this.selectedYear !== year,
                'picked-year': this.selectedYear === year,
            };
        },
    },
    methods: {
        fetchData() {
            axios
                .get(import.meta.env.VITE_API_URL + "user?search=" + this.searchTerm)
                .then((response) => {
                    this.items = response.data;
                    this.shown_items = response.data.waitlist;
                    console.log(this.shown_items)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        handleSearch() {
            this.fetchData()
        },
        selectStatus(status) {
            this.selectedStatus = status;
            this.shown_items = this.items[status];
        }
    }
};
</script>

<style>
.other-status {
    width: 100%;
    height: 21px;
    padding: 0px, 30px, 0px, 30px;
    gap: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    background: none;
}

.selected-status {
    background-color: #424242;
    width: 100%;
    height: 41px;
    padding: 5px, 30px, 5px, 30px;
    border-radius: 5px;
    gap: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: center;

}

.status-picker-div {
    width: 15%;
    height: auto;
    margin-top: 20px;

    button {
        border: none;
        margin: 10px auto;
        cursor: pointer;
        color: white;
    }
}

.result-grid {
    width: 85%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    padding: 20px;
}

.grid-item {
  padding: 10px;
}

.search-page-view {
    width: 80%;
    margin: auto;
}

.search-container {
    margin: 180px auto 50px auto;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;

    h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 52px;
        color: #FED402;
    }

    input {
        position: relative;
        width: 50vw;
        height: 44px;
        padding: 20px;
        border-radius: 12px;
        gap: 18px;
        margin: 0 3dvw;

        font-size: 16px;
        font-weight: 400;
        color: #8A8A8A;
    }

    button {
        width: 100px;
        height: 41px;
        background: #fed402;
        border-radius: 12px;
        font-weight: 700;
        font-size: 16px;
        color: #000000;
    }
}
</style>
