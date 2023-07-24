module.exports = class Video {
  constructor(title, description) {
    this.title = title
    this.description = description
    this.likedBy = []
    this.likes = 0
    this.views = 0
  }
}
