<script>
import { ref } from 'vue'
import { useAccountStore } from '../stores/account'
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async doSignup() {
      await this.signup(this.email, this.username, this.password)
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div>
    <h1>Registry</h1>
    <form @submit.prevent="doSignup">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>
