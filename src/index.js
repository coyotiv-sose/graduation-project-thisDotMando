//Goal creating a website with video streming content
//User can create an account and login to the website
//User can create an own channel and subscribe to other channels
//User can upload a video and it will be streamed to the website
//User can donate to the website creator
//User can comment and like a video
//User can search for a video
//User can see the most popular videos
class User {
  constructor(name, email, age, newUser) {
    this.name = name
    this.email = email
    this.age = age
    this.newUser = newUser
  }
  checkNewUser = () => {
    if (this.newUser === true) {
      console.log('Welcome to our website ' + this.name)
      return (this.newUser = false)
    } else {
      console.log('Welcome back ' + this.name)
    }
  }
}
const user0 = new User('Mitch', 'mitch@web.de', 36, false)
user0.checkNewUser(this.name)

const user1 = new User('John', 'john@web.de', 17, true)
user1.checkNewUser(this.name)

const user2 = new User('Peter', 'pete@web.de', 19, false)
user2.checkNewUser(this.name)

console.log(user0)

console.log('-------------------------------------------------------------')

//User can create an own channel
class Channel {
  subscribers = []

  constructor(name, channelName) {
    this.name = name
    this.channelName = channelName
  }
  subscribe = name => {
    return this.subscribers.push(name)
  }
}
// user creates channel
const channel0 = new Channel(user0.name, 'Mitchs Channel')
const channel1 = new Channel(user1.name, 'Johns Channel')
const channel2 = new Channel(user2.name, 'Peters Channel')

console.log(channel0)

//function that User can subscribe to other users channels

//Users can subscribe to other channels
channel0.subscribe(user1.name)
channel0.subscribe(user2.name)
console.log(channel0)
