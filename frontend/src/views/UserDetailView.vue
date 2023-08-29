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
      return (await axios.get('http://localhost:3000/users/')).data
    }
  }
}
</script>

<template>
  <h1>Userdatail Page</h1>
  <div v-if="users">
    <p>Email: {{ users.email }}</p>
    <p>Age: {{ users.age }}</p>
  </div>

  <div v-else>
    <p>Loading user details...</p>
  </div>
  <p>{{ this.users.email }}</p>
  <p>{{ this.users.age }}</p>
</template>
