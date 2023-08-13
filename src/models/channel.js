const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const channelSchema = new mongoose.Schema({
  name: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
  subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
})

class Channel {}
channelSchema.plugin(autopopulate)
channelSchema.loadClass(Channel)
module.exports = mongoose.model('Channel', channelSchema)
