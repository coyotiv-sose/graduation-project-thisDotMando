<script>
import { mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'
import axios from 'axios'

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <h1>Please Log in</h1>
  <form @submit.prevent="doLogin">
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>
