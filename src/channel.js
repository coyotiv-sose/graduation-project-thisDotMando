module.exports = class Channel {
  subscribers = []
  uploads = 0
  constructor(name, channelName) {
    this.name = name
    this.channelName = channelName
  }
  subscribe = name => {
    //Users can subscribe to other channels
    return this.subscribers.push(name)
  }
  videoUploads = videos => {
    //channel can create a counter with uploaded videos !!!!! *****Later I will add a list with uploaded videos
    this.uploads++
    return this.uploadlist
  }
  deleteUploads = () => {
    //channel can delete a counter with uploaded videos
    this.uploads--
    return this.uploadlist
  }
}
