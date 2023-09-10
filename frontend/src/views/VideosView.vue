<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
import { useVideoStore } from '../stores/video'
import { useAccountStore } from '../stores/account'

export default {
  name: 'VideosView',
  components: {},
  data() {
    return {
      videos: [],
      selectedVideo: null,
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
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.$refs.fileInput.files[0])

      formData.append('title', this.title)
      formData.append('description', this.description)

      const response = await axios.post('http://localhost:3000/videos', formData)

      console.log(response)
    },
    ...mapActions(useVideoStore, ['fetchVideos'])
  }
}
</script>

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

      <input type="submit" value="Upload" />
    </form>

    <div v-if="selectedVideo">
      <h2>Mp4 played:</h2>
      <video controls>
        <source :src="selectedVideo" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<!-- <template>
  <main>
    <h1>Here are all properties of the created videos</h1>
    <div v-for="video in videos">
      <RouterLink :to="`/videos/${video._id}`">{{ video.title }}</RouterLink>
    </div>
  </main>
</template> -->

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
