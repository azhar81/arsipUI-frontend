<template>
    <Navbar />
    <div class="search-page-view">
        <div class="search-container-1">
            <h1>Temu Balik</h1>
            <input v-model="searchTerm" @keydown.enter="handleSearch" placeholder="🔎︎ Cari sejarah di sini">
            <button @click="handleSearch">Search</button>
        </div>
        <div class="filter-div">
            <h2 class="filter-word">Filter</h2>
            
            <div class="filter-option">
                <label for="fakultas">Fakultas</label>
                <select v-model="selectedFakultas" id="fakultas" @change="filterByFakultas">
                    <option v-for="option in fakultasOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
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
        SmallMediaContainer,
    },
    data() {
        return {
            items: [],
            searchTerm: "",
            filteredItems: [],
            selectedYear: null,
            uniqueYears: [],
            selectedFakultas: "",
            fakultasOptions: [
                { value: '', label: 'Semua' },
                { value: 'FK', label: 'Fakultas Kedokteran' },
                { value: 'FF', label: 'Fakultas Farmasi' },
                { value: 'FIPB', label: 'Fakultas Ilmu Pengetahuan Budaya' },
                { value: 'FH', label: 'Fakultas Hukum' },
                { value: 'FT', label: 'Fakultas Teknik' },
                { value: 'FEB', label: 'Fakultas Ekonomi dan Bisnis' },
                { value: 'FISIP', label: 'Fakultas Ilmu Sosial dan Ilmu Politik' },
                { value: 'FPsi', label: 'Fakultas Psikologi' },
                { value: 'Fasilkom', label: 'Fakultas Ilmu Komputer' },
                { value: 'FMIPA', label: 'Fakultas Matematika Dan Ilmu Pengetahuan Alam' },
                { value: 'FIB', label: 'Fakultas Ilmu Budaya' },
                { value: 'FKM', label: 'Fakultas Kesehatan Masyarakat' },
                { value: 'FKG', label: 'Fakultas Kedokteran Gigi' },
                { value: 'FIK', label: 'Fakultas Ilmu Keperawatan' },
                { value: 'FIA', label: 'Fakultas Ilmu Administrasi' },
                { value: 'PPV', label: 'Program Pendidikan Vokasi' },
                { value: 'SIL', label: 'Sekolah Ilmu Pengetahuan' },
                { value: 'SKSG', label: 'Sekolah Kajian Stratejik dan Global' },
            ],
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
        },
        filterByFakultas() {
            if (this.selectedFakultas != '') {
                this.filteredItems = this.items.filter(
                    (item) => item.fakultas === this.selectedFakultas
                );
            }
            else {
                this.filteredItems = this.items;
            }
        },
    }
};
</script>

<style>
@import "../assets/searchpage.css";
</style>
