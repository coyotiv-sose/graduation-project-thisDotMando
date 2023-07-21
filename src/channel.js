module.exports = class Channel {
  subscribers = []
  videos = []
  constructor(name, owner) {
    this.name = name
    this.owner = owner
  }
  uploadVideo(video) {
    //channel can create an Array with uploaded videos
    this.videos.push(video)
  }
  deleteVideo(video) {
    //channel can delete a counter with uploaded videos
    this.videos.splice(this.videos.indexOf(video), 1)
  }
}
