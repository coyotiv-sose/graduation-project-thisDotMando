<script>
import axios from 'axios'
export default {
  name: 'UserDetailView',
  components: {},
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    this.user = await this.getUser()
  },

  methods: {
    async getUser() {
      return (await axios.get(`http://localhost:3000/users/${this.$route.params.id}`)).data
    }
  }
}
</script>

<template>
  <h1>Userdatail Page</h1>
  <h2><span>Username: </span> {{ user.name }}</h2>
  <h3><span>Email: </span> {{ user.email }}</h3>
  <h4><span>Age: </span> {{ user.age }}</h4>
</template>
