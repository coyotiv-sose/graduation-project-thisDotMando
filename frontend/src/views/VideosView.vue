<template>
  <h1>Here are all uploaded Videos</h1>
  <div v-for="video in videos" :key="video._id">
    <h2>{{ video.title }}</h2>
    <p>{{ video.description }}</p>
    <video controls>
      <source :src="getVideoUrl(video)" type="video/mp4" />
    </video>
    <button @click="handleStreamVideo(video)">Stream</button>

    <button @click="likeVideo(video._id)">Like</button>
    <span>{{ video.likes }}</span>
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
      description: '',
      user: {}
    }
  },
  async mounted() {
    this.videos = await this.fetchVideos()
  },
  methods: {
    ...mapActions(useVideoStore, ['fetchVideos', 'streamVideo']),

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
      return video.url
    },
    playVideo(video) {
      const videoUrl = this.getVideoUrl(video)
      if (videoUrl) {
        window.open(videoUrl, '_window')
      }
    },

    async handleStreamVideo(video) {
      const response = await this.streamVideo(video._id)
      const videoBlob = new Blob([response], { type: 'video/mp4' })

      const url = window.URL.createObjectURL(videoBlob)
      window.open(url)
    },
    getVideoUrl(video) {
      return video.url
    },

    async likeVideo(videoId) {
      try {
        const response = await axios.post(`/videos/${videoId}/likes`)
        const likedVideo = response.data

        const index = this.videos.findIndex((video) => video._id === likedVideo._id)
        if (index !== -1) {
          this.videos[index].likes = likedVideo.likes
        }
        return likedVideo
      } catch (error) {
        console.error('Fehler beim Liken des Videos:', error)
        throw error
      }
    }

    /* async likeVideo(video) {
    const requestData = {
      videoId: video._id, // Stellen Sie sicher, dass dies zur erwarteten Datenstruktur passt
      userId: this.user._id
    }
    const response = await axios.post(
      `http://localhost:3000/videos/${video._id}/likes`,
      requestData,
      { withCredentials: true }
    )
    console.log(response)
  } */
  },

  components: { RouterLink }
}
</script>
