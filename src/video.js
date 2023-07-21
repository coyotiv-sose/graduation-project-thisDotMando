module.exports = class Video {
  views = 0
  likes = []
  dislikes = []

  constructor(title, description, uploader) {
    this.title = title
    this.description = description
    this.uploader = uploader.name
  }
}
