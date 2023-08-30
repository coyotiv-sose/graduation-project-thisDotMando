<script>
import axios from 'axios'
export default {
  name: 'VideoDetailView',
  components: {},
  data() {
    return {
      video: {}
    }
  },
  async mounted() {
    this.video = await this.getVideo()
  },

  methods: {
    async getVideo() {
      return (await axios.get(`http://localhost:3000/videos/${this.$route.params.id}`)).data
    }
  }
}
</script>

<template>
  <h1>Video Detail Page</h1>
  <h2>{{ video.title }}</h2>
  <h3>{{ video.description }}</h3>
  <p>{{ video.creator.name }}</p>
  <h4>{{ video.likes }}</h4>
</template>
