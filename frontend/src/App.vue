<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { useAccountStore } from './stores/account'

export default {
  name: 'App',
  components: { RouterLink, RouterView /* TheHeader */ },

  async mounted() {
    await this.fetchUser()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout'])
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <!-- <TheHeader /> -->

  <header>
    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
        <RouterLink to="/videos">Videos</RouterLink>
        <RouterLink v-if="!user" to="/login">Login</RouterLink>
        <RouterLink v-if="!user" to="/signup">Signup</RouterLink>
        <a v-if="user" @click="logout">Logout</a>
      </nav>
    </div>
  </header>
  <h1>Welcome to meTube {{ user?.name }}</h1>

  <RouterView />
  <div style="width: 100%">
    <img src="@/assets/WTJ.jpg" alt="Dein Bild" style="width: 100%; height: auto" />
  </div>
</template>
<style scoped>
h1 {
  color: rgb(124, 56, 119);
  font-style: oblique;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
header {
  background-color: var(--color-primary);
  color: var(--color-text);
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
}
.navbar {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1rem;
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
}
h1 {
  color: rgb(124, 56, 119);
  font-style: oblique;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: var(--color-primary);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
