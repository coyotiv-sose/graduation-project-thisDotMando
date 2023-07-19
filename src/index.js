//Goal creating a website with video streming content
//XXXX User can create an account and login to the website
//XXXX User can create an own channel and subscribe to other channels//
//User can create a list with uploadede videos
//User can upload a video and it will be streamed to the website
//User can donate to the website creator
//User can comment and like a video
//User can search for a video
//User can see the most popular videos
console.log('------test if new User or not--------------')
const User = require('./user')
const Channel = require('./channel')
const Video = require('./video')

const user0 = new User('Mitch', 'mitch@web.de', 36, false) // Instances user with name, email, age, newUser(boolean)
user0.checkNewUser(this.name) // test of newUser

const user1 = new User('John', 'john@web.de', 17, true)
user1.checkNewUser(this.name)

const user2 = new User('Peter', 'pete@web.de', 19, false)
user2.checkNewUser(this.name)
console.log(user0)

console.log('-----------Test subscribers---------------')

// Instances userChannels with name and channelName
const channel0 = new Channel(user0.name, 'Mitchs Channel')
const channel1 = new Channel(user1.name, 'Johns Channel', 'user1.videos')
const channel2 = new Channel(user2.name, 'Peters Channel', 'user2.videos')

//Users can subscribe to other channels
console.log(channel0) //    0 subscribers
channel0.subscribe(user1.name)
channel0.subscribe(user2.name)
console.log(channel0) //   2 subscribers

console.log('--------Test videoUploads + Deleting-----------------')

//channel can create a counter with uploaded videos
channel0.videoUploads(channel0.video)
channel0.videoUploads(channel0.video)
console.log(channel0) //    2 videos  uploaded
channel0.deleteUploads(channel0.video)
console.log(channel0) //    1 video   uploaded
