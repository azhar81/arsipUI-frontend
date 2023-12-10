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
.other-year {
    width: 107px;
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

.picked-year {
    background-color: #424242;
    width: 107px;
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

.result-viewer {
    display: flex;
    flex-direction: row;
}

.year-picker-div {
    width: 200px;
    height: auto;
    margin-top: 20px;

    button {
        border: none;
        /* padding: 20px; */
        margin: 10px auto;
        cursor: pointer;
        color: white;
    }
}

.result-grid {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
