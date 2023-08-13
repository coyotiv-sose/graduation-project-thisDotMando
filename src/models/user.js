const Video = require('./video')
const Channel = require('./channel')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  mySubscribtions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  videoLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoList' }],
})

class User {
  //create video method
  async createVideo(title, description) {
    const newVideo = await Video.create({ title, description, creator: this.name })
    this.videos.push(newVideo)
    await this.save()
    return newVideo
  }

  async addVideoToVideoLists(videos) {
    if (this.videosLists.includes(videos) === false) {
      this.videosLists.push(videos)
      await this.save()
    } else {
      return 'Video already exists'
    }
  }

  async createVideoLists(videoLists) {
    this.videoLists.push(videoLists)
    await this.save()
    return videoLists
  }

  async likeVideo(video) {
    video.likes += 1
    video.likedBy.push(this)
    await video.save()
    return video
  }

  //create channel method
  async createChannel(name) {
    if (this.channels.includes(name) === true) {
      return 'Channel already exists'
    } else {
      const newChannel = await Channel.create({ name, creator: this })
      this.channels.push(newChannel)
      await this.save()
      return newChannel
    }
  }
  async subscribe(channel) {
    if (this.mySubscribtions.includes(channel) === true) {
      return 'You are already subscribed'
    } else {
      this.mySubscribtions.push(channel)
      await this.save()
      return channel
    }
  }
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
