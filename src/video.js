module.exports = class Video {
  constructor(title, description, uploader, views, likes, dislikes) {
    this.title = title
    this.description = description
    this.uploader = uploader
    this.views = views
    this.likes = likes
    this.dislikes = dislikes
  }
  title = () => {
    return this.title
  }
  description = () => {
    return this.description
  }
  uploader = () => {
    return this.uploader
  }
  views = () => {
    return this.views
  }
  likes = () => {
    return this.likes
  }
  dislikes = () => {
    return this.dislikes
  }
}
