const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
  name: String,
  subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

class Channel {}
/*
  static create({ name, creator }) {
    const newChannel = new Channel(name, creator)
    Channel.list.push(newChannel)
    return newChannel
  }

  static list = []
} */
channelSchema.loadClass(Channel)
module.exports = mongoose.model('Channel', channelSchema)
