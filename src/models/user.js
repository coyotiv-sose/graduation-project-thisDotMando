const Video = require('./video')
const Channel = require('./channel')
const mongoose = require('mongoose')
const VideoList = require('./videoList')
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel', autopopulate: true }],
  mySubscribtions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video', autopopulate: true }],
  videoLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoList', autopopulate: true }],
})

class User {
  //create video method
  async createVideo(title, description) {
    const newVideo = await Video.create({ title, description, creator: this })
    this.videos.push(newVideo)
    await this.save()
    return newVideo
  }

  async addVideoToVideoList(video, videoList) {
    if (videoList.videos.includes(video)) {
      throw new Error('Video already in videoList')
    }
    videoList.videos.push(video)
    await videoList.save()
    return videoList
  }

  async createVideoList(name) {
    const newVideoList = await VideoList.create({ name, creator: this })
    this.videoLists.push(newVideoList)
    await this.save()
    return newVideoList
  }

  async likeVideo(video) {
    // if (video.likedBy.some(person => person.id === this.id)) {
    //   return 'You already liked this video'
    // } else {
    video.likes += 1
    video.likedBy.push(this)
    await video.save()
    return video
    // }
  }
  //peter dislike mitchs video

  async dislikeVideo(video) {
    if (video.likedBy.some(person => person.id === this.id)) {
      video.likedBy.pull(this)
      video.likes -= 1
      await video.save()
      return video
    } else {
      return 'You already disliked this video'
    }
  }

  //unsubscribe from channel
  async unsubscribe(channel) {
    this.mySubscribtions.pull(channel)
    channel.subscribedBy.pull(this)
    await channel.save()
    await this.save()
    return channel
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
      channel.subscribedBy.push(this)
      await channel.save()
      await this.save()
      return channel
    }
  }
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
