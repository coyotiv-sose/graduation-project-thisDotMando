import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export const useChannelStore = defineStore('channelStore', {
  actions: {
    async createChannel(name) {
      return (await axios.post('/channels', { name: name })).data
    }
  }
})
