const mongoose = require('mongoose')
const { strict } = require('once')

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: { type: Number, default: 0 },
  views: Number,
  creator: String,
})
class Video {}

videoSchema.loadClass(Video)
module.exports = mongoose.model('Video', videoSchema)
