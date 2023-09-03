<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      axios.post('http://localhost:3000/accounts/session', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<template>
  <h1>Login to meTube</h1>
  <form @submit.prevent="login">
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="Password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>
