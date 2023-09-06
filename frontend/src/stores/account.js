import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'
export const useAccountStore = defineStore('Account', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (
        await axios.get('http://localhost:3000/accounts/session', {
          withCredentials: true
        })
      ).data
    },
    async login(email, password) {
      this.user = (
        await axios.post(
          'http://localhost:3000/accounts/session',
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
        'http://localhost:3000/accounts/session',
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
      await axios.delete('http://localhost:3000/accounts/session', {
        withCredentials: true
      })
      this.user = null
    }
  }
})
