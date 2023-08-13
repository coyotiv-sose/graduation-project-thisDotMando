const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
  name: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

class Channel {}

channelSchema.loadClass(Channel)
module.exports = mongoose.model('Channel', channelSchema)
