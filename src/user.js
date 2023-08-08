const Video = require('./video')

module.exports = class User {
  constructor(name, email, age) {
    this.name = name
    this.email = email
    this.age = age
    this.channels = []
    this.mySubscribtions = []
    this.videos = []
    this.videoLists = []
    this.subscribedBy = []
  }

  addVideo(video) {
    if (this.videos.includes(video) === false) {
      this.videos.push(video)
    } else {
      return 'Video already exists'
    }
  }
  addChannel(channel) {
    if (this.channels.includes(channel) === false) {
      this.channels.push(channel)
    } else {
      return
    }
  }
  subscribe(channel) {
    if (channel.subscribedBy.includes(this) === false) {
      channel.subscribedBy.push(this)
      this.mySubscribtions.push(channel)
    } else {
      return
    }
  }
  addVideoList(videoList) {
    this.videoList.push(videoList)
  }
  likeVideo(video) {
    video.likes++
    video.likedBy.push(this.name, this.email, this.age)
  }
//create video method
  createVideo(title, description) {
    const newVideo = Video.create({title, description})
    this.videos.push(newVideo)
    return newVideo
  }

  //create new Video

  static create({ name, email, age }) {
    const newUser = new User(name, email, age)

    User.list.push(newUser)
    return newUser
  }
  static list = []
}
