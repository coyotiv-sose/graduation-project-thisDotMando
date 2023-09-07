<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
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
    this.users = await this.fetchUsers()
  },

  methods: {
    ...mapActions(useUserStore, ['fetchUsers'])
  }
}
</script>

<template>
  <main>
    <h1>Here are all users</h1>
    <div v-for="user in users" :key="user._id">
      <RouterLink :to="`/users/${user._id}`">{{ user.name }}</RouterLink>
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
