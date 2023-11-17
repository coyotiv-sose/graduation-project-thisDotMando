<template>
  <div class="custom-loader" v-if="loading">
    <div class="loader-bar" :style="{ width: `${progress}%` }"></div>
    <div class="loading-text">LOADING</div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.custom-loader {
  width: 100%;
  height: 10px;
  background-color: transparent;
  position: relative; /* Positioniere die Komponente absolut */
  top: 0; /* Setze sie oben am Bildschirm */
  left: 0;
  z-index: 1000; /* Stelle sicher, dass der Ladebalken oben angezeigt wird */
}

.loader-bar {
  width: 50%; /* Ändere die Breite des Ladebalkens nach deinen Wünschen */
  height: 15px;
  background-color: #aa35d8;
  position: relative;
}

.loading-text {
  text-align: right; /* Zentriere den Text */
  color: #9f189f; /* Ändere die Textfarbe nach deinen Wünschen */
  position: absolute;
  top: -20px; /* Positioniere den Text über dem Ladebalken */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.custom-loader::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #ffcc00 10px,
    #ffcc00 20px
  );
  background-size: 200% 200%;
  animation: progressAnimation 0.5s linear infinite;
}

@keyframes progressAnimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
}
</style>
