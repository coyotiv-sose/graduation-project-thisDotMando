<template>
  <div>
    <h1>Channel editor page</h1>
    <form v-show="isCreateChannelFormActive" @submit.prevent="doCreateChannel">
      <div>
        <label for="name">Channel Name:</label>
        <input v-model="name" type="text" required />
      </div>
      <button type="submit">Create Channel:</button>
    </form>
    <button v-show="!isCreateChannelFormActive" @click="changeCreateChannelFormActive">
      Create a new Channel
    </button>
    <div v-for="channel in channels" :key="channel._id">
      <h2>
        <li>
          Channelname:
          <span>
            <RouterLink :to="`/videos/${channel._id}`">{{ channel.name }}</RouterLink>
          </span>
        </li>
      </h2>
    </div>
    <button @click="goToVideoUploader">Go to Video Uploader</button>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import { useAccountStore } from '../stores/account'
import { useChannelStore } from '../stores/channel'
import { useVideoStore } from '../stores/video'

export default {
  name: 'UserChannelView',
  components: {},
  data() {
    return {
      channels: [],
      name: '',
      isCreateChannelFormActive: false
    }
  },
  async mounted() {
    if (this.user) {
      this.channels = await this.fetchUserChannels(this.user._id)
    }
  },

  computed: {
    ...mapState(useAccountStore, ['user'])
  },

  methods: {
    ...mapActions(useUserStore, ['fetchUserChannels']),
    ...mapActions(useChannelStore, ['createChannel']),
    ...mapActions(useVideoStore, ['fetchVideos']),
    goToVideoUploader() {
      this.$router.push('/video-uploader') // Ändern Sie '/video-uploader' entsprechend Ihrer Router-Konfiguration
    },

    async doCreateChannel() {
      await this.createChannel(this.name)
      this.channels = await this.fetchUserChannels(this.user._id)
    },
    changeCreateChannelFormActive() {
      this.isCreateChannelFormActive = !this.isCreateChannelFormActive
    }
  }
}
</script>
