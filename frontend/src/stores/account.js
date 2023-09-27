import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export const useAccountStore = defineStore('Account', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (
        await axios.get('/accounts/session', {
          withCredentials: true
        })
      ).data
    },
    async login(email, password) {
      this.user = (
        await axios.post(
          '/accounts/session',
          {
            email: email,
            password: password
          },
          {
            withCredentials: true
          }
        )
      ).data
    },
    async signup(email, username, password) {
      this.user = await axios.post(
        '/accounts/session',
        {
          email: email,
          username: username,
          password: password
        },
        {
          withCredentials: true
        }
      )
    },

    async logout() {
      await axios.delete('/accounts/session', {
        withCredentials: true
      })
      this.user = null
    },

    async fetchUserChannels(id) {
      await axios.get('/users/${id}/channels')
    }
  }
})
