const Video = require('./video')

module.exports = class User {
  constructor(name, email, age) {
    this.name = name
    this.email = email
    this.age = age
    this.channels = []
    this.mySubscribtions = []
    this.videos = []
    this.videoList = []
    this.subscribedBy = []
    this.videoList = []
  }
  addVideo(video) {
    this.videos.push(video)
  }
  addChannel(channel) {
    this.channels.push(channel)
  }
  subscribe(channel) {
    channel.subscribedBy.push(this)
    this.mySubscribtions.push(channel)
  }
  addVideoList(videoList) {
    this.videoList.push(videoList)
  }
  likeVideo(video) {
    video.likes++
    video.likedBy.push(this.name, this.email, this.age)
  }
}
