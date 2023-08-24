const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const videoListSchema = new mongoose.Schema({
  name: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }, { autopopulate: true }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
})

class VideoList {}
videoListSchema.plugin(autopopulate)
videoListSchema.loadClass(VideoList)
module.exports = mongoose.model('VideoList', videoListSchema)
