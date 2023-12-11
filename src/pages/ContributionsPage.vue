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
@import "../assets/contributions.css";
</style>
