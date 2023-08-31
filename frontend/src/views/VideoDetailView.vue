<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useVideoStore } from '../stores/video'

export default {
  name: 'VideoDetailView',
  components: {},
  data() {
    return {
      video: {}
    }
  },
  async created() {
    this.video = await this.fetchVideo(this.$route.params.id)
  },
  methods: {
    ...mapActions(useVideoStore, ['fetchVideo'])
  }
}
</script>

<template>
  <h1>Video Detail Page</h1>
  <h2><span>Title: </span>{{ video.title }}</h2>
  <h3><span>Description: </span>{{ video.description }}</h3>
  <h4><span>Likes: </span>{{ video.likes }}</h4>
  <h5><span>Creator: </span>{{ video.creator.name }}</h5>
</template>
