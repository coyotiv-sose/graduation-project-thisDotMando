const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
  likes: { type: Number, default: 0 },
  views: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
})
class Video {}
videoSchema.plugin(autopopulate)
videoSchema.loadClass(Video)
module.exports = mongoose.model('Video', videoSchema)
