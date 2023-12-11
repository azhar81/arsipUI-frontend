<template>
    <Navbar />
    <div class="search-page-view">
        <div class="search-container">
            <h1>Temu Balik</h1>
            <input v-model="searchTerm" @keydown.enter="handleSearch" placeholder="🔎︎ Cari sejarah di sini">
            <button @click="handleSearch">Search</button>
        </div>
        <hr>
        <div class="result-viewer">
            <div class="year-picker-div">
                <button v-for="year in uniqueYears" :key="year" @click="filterByYear(year)" 
                :class="{ 'other-year': selectedYear !== year, 'picked-year': selectedYear === year }">
                    {{ year }}
                </button>
            </div>
            <div v-if="items.length > 0" class="result-grid">
                <div v-for="item in filteredItems" :key="item.id" class="grid-item">
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
            searchTerm: "",
            filteredItems: [],
            selectedYear: null,
            uniqueYears: [],
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
                .get(import.meta.env.VITE_API_URL + "?status=approved&search=" + this.searchTerm)
                .then((response) => {
                    this.items = response.data;
                    this.filteredItems = response.data;
                    this.uniqueYears = this.getUniqueYears(this.items);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        handleSearch() {
            this.fetchData()
        },
        filterByYear(year) {
            // Update selectedYear and trigger item filtering
            if (this.selectedYear == year) {
                this.selectedYear = null;
                this.filteredItems = this.items;
            }
            else {
                this.selectedYear = year;
                this.filteredItems = this.items.filter(
                    (item) => new Date(item.event.date).getFullYear() === year
                );
            }
        },
        getUniqueYears(items) {
            const uniqueYears = [...new Set(items.map(item => new Date(item.event.date).getFullYear()))];
            return uniqueYears;
        }
    }
};
</script>

<style>
@import "../assets/searchpage.css";
</style>
