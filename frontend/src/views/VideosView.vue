<template>
  <div>
    <form @submit.prevent="uploadFile">
      <label for="mp4File">Choose an Mp4 file:</label>
      <input
        type="file"
        id="mp4File"
        ref="fileInput"
        accept="video/mp4"
        @change="handleFileUpload"
      />
      <br />

      <!-- Benutzer kann Titel und Beschreibung eingeben -->
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" />

      <label for="description">Description:</label>
      <input id="description" v-model="description" />
      <br />

      <button type="submit">Upload</button>
    </form>

    <div v-for="video in videos" :key="video._id">
      <h2>{{ video.title }}</h2>
      <p>{{ video.description }}</p>
      <video controls @click="playVideo(video)">
        <source :src="video.url" type="video/mp4" />
      </video>
      <!-- Hier wird der Link zur Video-Detailseite generiert -->
      <router-link :to="`/videos/${video._id}`">Video ansehen</router-link>
      <button @click="streamVideo(video)">Stream</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useVideoStore } from '../stores/video'
import { RouterLink } from 'vue-router'

export default {
  name: 'VideosView',
  data() {
    return {
      videos: [],
      title: '',
      description: ''
    }
  },
  async mounted() {
    this.videos = await this.fetchVideos()
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
    getVideoUrl(video) {
      return video.url // Hier könnte die Logik zur Zusammenstellung der URL sein, falls erforderlich.
    },
    playVideo(video) {
      const videoUrl = this.getVideoUrl(video)
      if (videoUrl) {
        window.open(videoUrl, '_window')
      }
    },
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.$refs.fileInput.files[0])
      formData.append('title', this.title)
      formData.append('description', this.description)
      const response = await axios.post('http://localhost:3000/videos', formData)
      console.log(response)
    },
    async fetchVideos() {
      try {
        const response = await axios.get('http://localhost:3000/videos', { withCredentials: true })
        return response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Videos:', error)
        return []
      }
    },
    async streamVideo(video) {
      const response = await axios.get(`http://localhost:3000/videos/${video._id}/stream`, {
        responseType: 'blob'
      })
      const videoBlob = new Blob([response.data], { type: 'video/mp4' })
      const url = window.URL.createObjectURL(videoBlob)
      window.open(url)
    },
    getVideoUrl(video) {
      return video.url // Hier könnte die Logik zur Zusammenstellung der URL sein, falls erforderlich.
    },
    ...mapActions(useVideoStore, ['fetchVideos'], ['streamVideo'])
  },
  components: { RouterLink }
}
</script>
