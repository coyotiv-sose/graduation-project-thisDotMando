<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
  name: 'UsersView',
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
  <main>
    <h1>Here are all users</h1>
    <div v-for="user in users">
      <h2>
        {{ user.name }}
      </h2>
      <p>{{ user.email }}</p>
      <p>{{ user.password }}</p>
    </div>
  </main>
</template>

<style scoped>
h1 {
  color: rgb(255, 0, 0);
  font-style: italic;
  font-size: xx-large;
}
h2 {
  color: rgb(169, 47, 47);
  font-style: oblique;
  font-size: xx-large;
}
p {
  color: rgb(49, 218, 7);
  font-style: oblique;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
</style>
