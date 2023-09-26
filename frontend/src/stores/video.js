import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useVideoStore = defineStore('videoStore', {
  actions: {
    async fetchVideos() {
      try {
        const response = await axios.get('/videos')
        return response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Videos:', error)
        throw error
      }
    },
    async fetchVideo(id) {
      try {
        const response = await axios.get(`/videos/${id}`)
        return response.data
      } catch (error) {
        console.error('Fehler beim Abrufen des Videos:', error)
        throw error
      }
    },
    async streamVideo(id) {
      try {
        const response = await axios.get(`/videos/${id}/stream`)
        return response.data
      } catch (error) {
        console.error('Fehler beim Streamen des Videos:', error)
        throw error
      }
    }
  },

  //User can like a video
  async likeVideo(videoId, userId) {
    try {
      const response = await axios.post(`/videos/${videoId}/likes`, { user: userId })
      return response.data
    } catch (error) {
      console.error('Fehler beim Liken des Videos:', error)
      throw error
    }
  }
})
