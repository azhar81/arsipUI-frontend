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
                    <quill-editor theme="snow" contentType="html" v-model:content="formData.description" id="description" required/>
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

                <div class="form-group">
                    <label for="fakultas">Fakultas</label>
                    <select v-model="formData.selectedFakultas" id="fakultas">
                    <option v-for="(fakultas, index) in fakultasOptions" :key="index" :value="fakultas.value">
                        {{ fakultas.label }}
                    </option>
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <div class="success-container" v-if="createSejarahSuccess">
        <div class="success-content">
            <h1>Berhasil Diajukan!</h1>
            <p>Pengajuan verifikasi sejarah telah terkirim.
            Silahkan menunggu hingga pemberitahuan selanjutnya.</p>

            <router-link to="/" class="dash-router">
                <button class="dash-button">Kembali ke beranda</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    Navbar,
    QuillEditor
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
        selectedFakultas: '',
        customEventName: '',
        customEventCategory: '',
        customEventDate: new Date(),
        selectedCategory: ''
      },
      eventOption: 'existing',
      categoryOption: 'existing',
      existingEvents: [],
      existingCategory: [],
      createSejarahSuccess: false,
      fakultasOptions: [
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
  methods: {
        submitForm() {
        // Handle form submission logic
            if (this.validateForm()) {
                const itemData = new FormData();
                
                itemData.append('title', this.formData.title);
                itemData.append('description', this.formData.description);
                itemData.append('fakultas', this.formData.selectedFakultas);
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
                        itemData.append('event_category', this.formData.customEventCategory);
                    }
                }

                axios.post(import.meta.env.VITE_API_URL + "create", itemData)
                    .then(response => {
                        console.log('Item posted successfully:', response.data);
                        this.createSejarahSuccess = true;
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
        },
    },
};
</script>

<style>
@import "../assets/createpage.css";
</style>
