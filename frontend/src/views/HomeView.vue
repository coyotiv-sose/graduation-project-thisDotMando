<template>
  <h1>Welcome to meTube {{ user?.name }}</h1>
  <main></main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useAccountStore } from '../stores/account'
import { useUserStore } from '../stores/user'

export default {
  name: 'WelcomeView',
  components: { RouterLink, RouterView },

  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>
