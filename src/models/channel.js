const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
  name: String,
  subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

class Channel {
  constructor(name, creator) {
    this.name = name
    this.subscribedBy = []
    this.videos = []
    this.creator = creator
  }

  static create({ name, creator }) {
    const newChannel = new Channel(name, creator)
    Channel.list.push(newChannel)
    return newChannel
  }

  static list = []
}
module.exports = mongoose.model('Channel', channelSchema)
