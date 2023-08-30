<script>
import axios from 'axios'
export default {
  name: 'VideoDetailView',
  components: {},
  data() {
    return {
      videos: []
    }
  },
  async mounted() {
    this.videos = await this.getVideos()
  },

  methods: {
    async getVideos() {
      return (await axios.get('http://localhost:3000/videos')).data
    }
  }
}
</script>

<template>
  <h1>Video Detail Page</h1>
  <div v-for="video in videos" :key="video._id">
    <div v-if="video._id === $route.params.id">
      <h2>{{ video.title }}</h2>
      <h3>{{ video.description }}</h3>
      <p>{{ video.creator }}</p>
      <p>{{ video.likedBy }}</p>
      <h4>{{ video.likes }}</h4>
    </div>
  </div>
</template>
