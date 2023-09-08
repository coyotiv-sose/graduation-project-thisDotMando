import { defineStore } from 'pinia'
import axios from 'axios'
import { createRouter } from 'vue-router'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true
export const useUserStore = defineStore('userStore', {
  actions: {
    async fetchUsers() {
      return (await axios.get('/users')).data
    },
    async fetchUser(id) {
      return (await axios.get(`/users/${id}`)).data
    },
    async signup(email, name, password) {
      return (
        await axios.post('/users', {
          email: email,
          name: name,
          password: password
        })
      ).data
    },
    async fetchUserChannels(id) {
      return (await axios.get(`/users/${id}/channels`)).data
    }
  }
})
