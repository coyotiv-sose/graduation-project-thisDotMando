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
  addVideo(video) {
    if (this.videos.includes(video) === false) {
      this.videos.push(video)
    } else {
      return 'Video already exists'
    }
  }

  subscribe(channel) {
    if (channel.subscribedBy.includes(this) === false) {
      channel.subscribedBy.push(this)
      this.mySubscribtions.push(channel.name)
    } else {
      return
    }
  }
  addVideoList(videoList) {
    this.videoList.push(videoList)
  }
  likeVideo(video) {
    video.likes++
    video.likedBy.push(this.name)
  }
  //create video method
  async createVideo(title, description) {
    const newVideo = await Video.create({ title, description, creator: this })
    this.videos.push(newVideo)
    await this.save()
    return newVideo
  }

  //create channel method
  createChannel(name) {
    if (this.channels.includes(name) === true) {
      return 'Channel already exists'
    } else {
      const newChannel = Channel.create({ name, creator: this.name })
      this.channels.push(newChannel)
      return newChannel
    }
  }
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
