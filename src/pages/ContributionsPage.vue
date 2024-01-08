<template>
    <Navbar />
    <div class="search-page-view">
        <div class="search-container">
            <h1>Unggahan Sejarah</h1>
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
            filtered_items: [],
            shown_items: [],
            searchTerm: "",
            selectedStatus: 'waitlist',
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
                { value: 'FMIPA', label: 'Fakultas Matematika dan Ilmu Pengetahuan Alam' },
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
    methods: {
        fetchData() {
            axios
                .get(import.meta.env.VITE_API_URL + "user?search=" + this.searchTerm)
                .then((response) => {
                    this.items = response.data;
                    this.filtered_items = JSON.parse(JSON.stringify(this.items));
                    this.shown_items = this.filtered_items.waitlist;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    this.$router.go();
                });
        },
        handleSearch() {
            this.fetchData()
        },
        selectStatus(status) {
            this.selectedStatus = status;
            this.shown_items = this.filtered_items[status];
        },
        filterByFakultas() {
            if (this.selectedFakultas !== '') {
                this.filtered_items['waitlist'] = this.items['waitlist'].filter(item => item.fakultas === this.selectedFakultas);
                this.filtered_items['approved'] = this.items['approved'].filter(item => item.fakultas === this.selectedFakultas);
                this.filtered_items['rejected'] = this.items['rejected'].filter(item => item.fakultas === this.selectedFakultas);
                
                this.selectStatus(this.selectedStatus);
            }
            else {
                this.filtered_items = JSON.parse(JSON.stringify(this.items));
                this.selectStatus(this.selectedStatus);
            }
        },
    }
};
</script>

<style>
@import "../assets/contributions.css";
</style>
