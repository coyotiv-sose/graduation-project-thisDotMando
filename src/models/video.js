const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: Number,
  views: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

class Video {
  constructor(title, description, creator) {
    this.title = title
    this.description = description
    this.likedBy = []
    this.likes = 0
    this.views = 0
    this.creator = creator.name
  }

  /* static create({ title, description, creator }) {
    const newVideo = new Video(title, description, creator)

    Video.list.push(newVideo)
    return newVideo
  }

  static list = [] */
}
module.exports = mongoose.model('Video', videoSchema)
