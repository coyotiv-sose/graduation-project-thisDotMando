import { defineStore } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('userStore', {
  actions: {
    async fetchUsers() {
      return (await axios.get('/users')).data
    },
    async fetchUser(id) {
      return (await axios.get(`/users/${id}`)).data
    }
  }
})
