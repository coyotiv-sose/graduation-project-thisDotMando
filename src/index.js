//Goal creating a website with video streming content
//XXXX User can create an account and login to the website
//XXXX User can create an own channel and subscribe to other channels//
//User can create a list with uploadede videos
//User can upload a video and it will be streamed to the website
//User can donate to the website creator
//User can comment and like a video
//User can search for a video
//User can see the most popular videos
const User = require('./user')
const Video = require('./video')

// create a function to create a new user
function createNewUser(name, email, age) {
  return new User(name, email, age)
}

//creating new  User instances
const mitch = createNewUser('Mitch', 'mitch@web.de', 36) // Instances user with name, email, age, newUser(boolean)
const john = createNewUser('John', 'john@web.de', 17)
const peter = createNewUser('Peter', 'pete@web.de', 19)

//creating new Video instances
const video1 = new Video('ICEage', 'animation')

//testing addVideoList method
mitch.addVideoList(video1)

//testing add-/like Video method
console.log('*********Testing Add/Like -Video**************')
mitch.addVideo(video1)
mitch.addVideo(video1)
mitch.likeVideo(video1)
john.likeVideo(video1)

//testing add Channel method
mitch.addChannel('mitchsChannel')

//testing subscribe method
john.subscribe(mitch)
console.log('*********Testing Subscribe -Channel**************')
console.log(mitch)
