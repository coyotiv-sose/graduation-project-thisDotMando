<script>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: { RouterLink, RouterView, TheHeader }
}
</script>

<template>
  <TheHeader />
  <RouterView />
</template>
