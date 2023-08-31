<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
import { useVideoStore } from '../stores/video'

export default {
  name: 'VideosView',
  components: {},
  data() {
    return {
      videos: []
    }
  },
  async mounted() {
    this.videos = await this.fetchVideos()
  },

  methods: {
    ...mapActions(useVideoStore, ['fetchVideos'])
  }
}
</script>

<template>
  <main>
    <h1>Here are all properties of the created videos</h1>
    <div v-for="video in videos">
      <RouterLink :to="`/videos/${video._id}`">{{ video.title }}</RouterLink>
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
