import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useVideoStore = defineStore('videoStore', {
  actions: {
    async fetchVideos() {
      return (await axios.get('/videos')).data
    },
    async fetchVideo(id) {
      return (await axios.get(`/videos/${id}`)).data
    }
  }
})
