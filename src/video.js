const User = require('./user')

module.exports = class Video {
  constructor(title, description) {
    this.title = title
    this.description = description
    this.likedBy = []
    this.likes = 0
    this.views = 0
  }

  static create({ title, description }) {
    const newVideo = new Video(title, description)

    Video.list.push(newVideo)
    return newVideo
  }

  static list = []
}
