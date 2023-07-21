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
const Channel = require('./channel')
const Video = require('./video')

const user0 = new User('Mitch', 'mitch@web.de', 36) // Instances user with name, email, age, newUser(boolean)

const user1 = new User('John', 'john@web.de', 17)

const user2 = new User('Peter', 'pete@web.de', 19)

console.log(user0)

console.log('-----------Test subscribers---------------')

// Instances userChannels with name and channelName
const channel0 = new Channel(user0.name, 'Mitchs Channel')
const channel1 = new Channel(user1.name, 'Johns Channel')
const channel2 = new Channel(user2.name, 'Peters Channel')

//Users can subscribe to other channels
console.log(channel0) //    0 subscribers
user1.subscribe(channel0)
user2.subscribe(channel0)
console.log(channel0) //   2 subscribers
/*console.log('--------------------------')
console.log(channel0.subscribers.length) // 2
console.log('--------------------------')
*/
console.log('--------Test videoUploads + Deleting-----------------')

//channel can create a counter with uploaded videos
channel0.uploadVideo(user0.createVideo('John Wick 6', 'Bad Ass Action Movie'))
console.log(channel0) //   1 video uploaded
//channel0.deleteVideo('Video2', 'Description2')
//console.log(channel0) //  1 video uploaded
