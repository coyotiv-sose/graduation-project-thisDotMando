<template>
  <div>
    <form @submit.prevent="uploadFile">
      <label for="mp4File">Choose an Mp4 file:</label>
      <input type="file" id="mp4File" ref="mp4File" accept="video/mp4" @change="handleFileUpload" />
      <br />

      <!-- Benutzer kann Titel und Beschreibung eingeben -->
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" />

      <label for="description">Description:</label>
      <input id="description" v-model="description" />
      <br />

      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true
export default {
  name: 'VideoUploader',
  data() {
    return {
      videos: [],
      title: '',
      description: '',
      selectedVideo: null
    }
  },

  methods: {
    handleFileUpload(event) {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        const reader = new FileReader()
        return new Promise((resolve) => {
          reader.onload = () => {
            this.selectedVideo = reader.result
            resolve()
          }
          reader.readAsDataURL(selectedFile)
        })
      }
    },
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.$refs.mp4File.files[0])
      formData.append('title', this.title)
      formData.append('description', this.description)
      const response = await axios.post('/videos', formData)
      console.log(response)
    }
  }
}
</script>
