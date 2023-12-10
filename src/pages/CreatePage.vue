<template>
    <Navbar />
    <div class="create-page-view">
        <div class="create-form-div">
            <h1>Unggah Sejarah</h1>

            <form @submit.prevent="submitForm" class="form-container" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="title">Judul</label>
                    <input v-model="formData.title" type="text" id="title" required />
                </div>

                <div class="form-group">
                    <label for="description">Isi Konten</label>
                    <textarea v-model="formData.description" id="description" required></textarea>
                </div>

                <div class="form-group">
                    <label for="media">Unggah Media</label>
                    <input type="file" @change="handleFileChange" name="media" id="media" multiple required />
                </div>

                <div class="form-group">
                    <label>Kejadian</label>
                    <div>
                        <input
                            type="radio"
                            id="selectExisting"
                            v-model="eventOption"
                            value="existing"
                        />
                        <label for="selectExisting" class="radio">Pilih kejadian</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="enterCustom"
                            v-model="eventOption"
                            value="custom"
                        />
                        <label for="enterCustom" class="radio">Masukkan kejadian baru:</label>
                    </div>
                </div>

            <div v-if="eventOption === 'existing'" class="form-group">
                <label for="eventSelection">Pilih Kejadian:</label>
                <select v-model="formData.selectedEvent" id="eventSelection">
                <option value="">Pilih kejadian</option>
                <option v-for="event in existingEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
                </select>
            </div>

            <div v-else class="form-group">
                <label for="customEventName">Nama Kejadian</label>
                <input v-model="formData.customEventName" type="text" id="customEventName" />

                <div class="form-group">
                    <label>Kategori Kejadian</label>
                    <div>
                        <input
                            type="radio"
                            id="selectExistingCategory"
                            v-model="categoryOption"
                            value="existing"
                        />
                        <label for="selectExistingCategory" class="radio">Pilih kategori</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="enterCustomCategory"
                            v-model="categoryOption"
                            value="custom"
                        />
                        <label for="enterCustomCategory" class="radio">Masukkan kategori baru:</label>
                    </div>
                </div>

                <div v-if="categoryOption === 'existing'" class="form-group">
                    <label for="categorySelection">Pilih kategori</label>
                    <select v-model="formData.selectedCategory" id="categorySelection">
                    <option value="">Pilih kejadian</option>
                    <option v-for="category in existingCategory" :key="category.id" :value="category.name">{{ category.name }}</option>
                    </select>
                </div>

                <div v-else>
                    <label for="customEventCategory">Kategori Kejadian</label>
                    <input v-model="formData.customEventCategory" type="text" id="customEventCategory" />
                </div>

                <label for="customEventDate">Tanggal Kejadian</label>
                <input v-model="formData.customEventDate" type="date" id="customEventDate" />
            </div>

                <button type="submit">Submit</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        media: [],
        selectedEvent: '',
        customEventName: '',
        customEventCategory: '',
        customEventDate: new Date(),
        selectedCategory: ''
      },
      eventOption: 'existing',
      categoryOption: 'existing',
      existingEvents: [],
      existingCategory: [],
    };
  },
  methods: {
        submitForm() {
        // Handle form submission logic
            if (this.validateForm()) {
                const itemData = new FormData();
                const formData = this.formData;
                
                itemData.append('title', this.formData.title);
                itemData.append('description', this.formData.description);
                // Append each file to FormData
                for (let i = 0; i < this.formData.media.length; i++) {
                    itemData.append(`file_paths[${i}]`, this.formData.media[i]);
                }
                if (this.eventOption === "existing") {
                    itemData.append('event', this.formData.selectedEvent);
                }
                else {
                    itemData.append('event_name', this.formData.customEventName);
                    itemData.append('event_date', this.formData.customEventDate);
                    if (this.categoryOption === 'existing') {
                        itemData.append('event_category', this.formData.selectedCategory);
                    }
                    else {
                        itemData.append('event_category', this.formData.selectedCategory);
                    }
                }
                        
                
                console.log(itemData);

                axios.post(import.meta.env.VITE_API_URL + "create", itemData)
                    .then(response => {
                        console.log('Item posted successfully:', response.data);
                        // Handle success, such as navigating to another page
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.error('Error posting item:', error.response.data);
                    });
            }
        },
        validateForm() {
        // Basic form validation, customize as needed
        if (this.eventOption === 'existing' && !this.formData.selectedEvent) {
            alert('Please select an existing event.');
            return false;
        } else if (this.eventOption === 'custom' && !this.formData.customEventName) {
            alert('Please enter your own event.');
            return false;
        }
        // Add additional validation for other fields if necessary
        return true;
        },
        resetForm() {
            // Reset the form fields after submission
            this.formData.selectedEvent = '';
            this.formData.customEvent = '';
            this.eventOption = 'existing'; // Reset the event option
            this.formData.selectedCategory = '';
            this.formData.customCategory = '';
            this.categoryOption = 'existing'; // Reset the category option
        },
        fetchData() {
            axios
                .get(import.meta.env.VITE_API_URL + "categories")
                .then((response) => {
                    this.existingCategory = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
            axios
                .get(import.meta.env.VITE_API_URL + "events")
                .then((response) => {
                    this.existingEvents = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    }
                );
        },
        handleFileChange(event) {
            this.formData.media = event.target.files;
            console.log(this.formData.media)
        }
    },
};
</script>

<style>
#app {
  padding: 0;
}

input[type=text] {
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid;
    border-color: #8A8A8A;
}

label.radio {
    margin: 5px;
    font-size: 16px;
}

textarea {
    width: 100%;
    resize: vertical; 
    max-height: 200px;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid;
    border-color: #8A8A8A;
}

button[type=submit] {
    width: 225px;
    height: 41px;
    border-radius: 12px;
    background: #FED402;
    color: black;
    font-size: 16px;
    font-weight: 700;
    margin: 0 auto;
}

.form-container {
    font-size: 24px;
    font-weight: 700;
    color: black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form-group {
    display: flex;
    margin: 10px;
    flex-direction: column;
}

h1 {
    font-size: 40px;
    margin: 0 auto;
    font-weight: 700;
    line-height: 52px;
    text-align: center;
    color: black;
}

.create-form-div {
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 180px auto;
    padding: 30px;
    width: 60%;
    border-radius: 20px;
    /* gap: 80px */
}

.create-page-view {
  /* min-height: 100vh;
  min-width: 100vw; */
}
</style>
