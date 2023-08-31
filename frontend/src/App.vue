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
  <div style="width: 100%">
    <img src="@/assets/movie_play.jpg" alt="Dein Bild" style="width: 100%; height: auto" />
  </div>
</template>
