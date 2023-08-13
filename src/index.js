//Goal creating a website with video streming content
//XXXX User can create an account and login to the website
//XXXX User can create an own channel and subscribe to other channels//
//User can create a list with uploadede videos
//User can upload a video and it will be streamed to the website
//User can donate to the website creator
//User can comment and like a video
//User can search for a video
//User can see the most popular videos
const axios = require('axios')
const user = require('./models/user')

axios.defaults.baseURL = 'http://localhost:3000'
//fetch users with axios

/*axios.get('http://localhost:3000/users').then(res => {
  console.log(res.data)
})*/

//create a user with axios
async function main() {
  const mitch = await axios.post('/users', {
    name: 'Mitch',
    email: 'mitch@web.de',
    age: 36,
  })

  const john = await axios.post('/users', {
    name: 'John',
    email: 'john@web.de',
    age: 17,
  })

  //create a video with axios
  const mitchsVideo = await axios.post('/videos', {
    title: 'ICEage',
    description: 'animation',
    user: mitch.data._id,
  })

  //get all users
  const allUsers = await axios.get('/users')
  console.log('List of all Users:\n ', allUsers.data)

  //john likes mitchs video
  const like = await axios.post(`/videos/${mitchsVideo.data._id}/likes`, {
    user: john.data._id,
  })

  //User 'mitch' creates a channel
  const mitchsChannel = await axios.post('/channels', {
    name: 'mitchsChannel',
    user: mitch.data._id,
  })

  //john subscribe mitchsChannel
  const subscribe = await axios.post(`/channels/${mitchsChannel.data._id}/subscribedBy`, {
    user: john.data._id,
  })
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})

/* create a function to create a new user
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
*/
