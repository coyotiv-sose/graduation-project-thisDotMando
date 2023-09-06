<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'UserDetailView',
  components: {},
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    this.user = await this.fetchUser(this.$route.params.id)
  },

  methods: {
    ...mapActions(useUserStore, ['fetchUser'])
  }
}
</script>

<template>
  <h1>Userdatail Page</h1>
  <h2></h2>
  <h3><span>Username: </span> {{ user.name }}</h3>
</template>
