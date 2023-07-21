const Video = require('./video')
const Channel = require('./channel')
module.exports = class User {
  channels = []
  subscribedOtherUsers = 0
  constructor(name, email, age) {
    this.name = name
    this.email = email
    this.age = age
  }
  createChannel(channelName) {
    //User can create an own channel
    const channel = new Channel(channelName, this)
    return this.channels.push(channel)
  }
  subscribe(channel) {
    //Users can subscribe to other channels
    channel.subscribers.push(this)
    return this.subscribedOtherUsers++
  }
  createVideo(title, description) {
    //User can upload a video
    const video = new Video(title, description, this)
    return video
  }
}
