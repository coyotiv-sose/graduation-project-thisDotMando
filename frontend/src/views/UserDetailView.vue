<script>
import axios from 'axios'
export default {
  name: 'UserDetailView',
  components: {},
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    this.users = await this.getUsers()
  },

  methods: {
    async getUsers() {
      return (await axios.get('http://localhost:3000/users')).data
    }
  }
}
</script>

<template>
  <h1>Userdatail Page</h1>
  <div v-for="user in users" :key="user._id">
    <div v-if="user._id === $route.params.id">
      <h2>{{ user.name }}</h2>
      <h3>{{ user.email }}</h3>
    </div>
  </div>
</template>
