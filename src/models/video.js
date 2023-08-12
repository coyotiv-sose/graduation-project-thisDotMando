const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: Number,
  views: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
class Video {}

videoSchema.loadClass(Video)
module.exports = mongoose.model('Video', videoSchema)
