import { defineStore } from 'pinia'
import axios from 'axios'

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
      axios.post(
        'http://localhost:3000/accounts/session',
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      ).data
    },
    async logout() {
      axios.delete('http://localhost:3000/accounts/session', {
        withCredentials: true
      })
      this.user = null
    }
  }
})
