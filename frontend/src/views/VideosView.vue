<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
  name: 'VideosView',
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
  <main>
    <h1>Here are all properties of the created videos</h1>
    <div v-for="video in videos">
      <h2>Title: {{ video.title }}</h2>
      <h3>Description: {{ video.description }}</h3>
      <p>{{ video.creator }}</p>
      <p>{{ video.likedBy }}</p>
      <h4>{{ video.likes }}</h4>
    </div>
  </main>
</template>

<style scoped>
p {
  color: red;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
h3 {
  color: blue;
  font-style: italic;
  font-size: x-large;
}
h2 {
  color: rgb(178, 245, 178);
  font-style: oblique;
  font-size: xx-large;
}
h4 {
  color: rgb(124, 56, 119);
  font-style: oblique;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
</style>
