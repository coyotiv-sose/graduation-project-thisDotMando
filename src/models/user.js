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
    const newVideo = await Video.create({ title, description, creator: this })
    this.videos.push(newVideo)
    await this.save()
    return newVideo
  }

  /*  async addVideo(video) {
    if (this.videos.includes(video) === false) {
      this.videos.push(video)
      await this.save()
    } else {
      return 'Video already exists'
    }
  }

  async subscribe(channel) {
    if (channel.subscribedBy.includes(this) === false) {
      channel.subscribedBy.push(this)
      this.mySubscribtions.push(channel.name)
      await this.save()
    } else {
      return
    }
  }

  async addVideoList(videoList) {
    this.videoList.push(videoList)
    await this.save()
  }

  async likeVideo(video) {
    video.likes++
    video.likedBy.push(this.name)
    await video.save()
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
  } */
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
