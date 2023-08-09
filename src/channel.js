const User = require('./user.js')
const Video = require('./video.js')

module.exports = class Channel {
  constructor(name, creator) {
    this.name = name
    this.subscribedBy = []
    //this.videos = []
    this.creator = creator
  }

  static create({ name, creator }) {
    const newChannel = new Channel(name, creator)
    Channel.list.push(newChannel)
    return newChannel
  }

  static list = []
}
