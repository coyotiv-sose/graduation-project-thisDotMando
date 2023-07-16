//Goal creating a website with video streming content

//User can create an account and login to the website
//User can create an own channel and subscribe to other channels
//User can upload a video and it will be streamed to the website
//User can donate to the website creator
//User can comment and like a video
//User can search for a video
//User can see the most popular videos
class Users {
  constructor(name, email, age, newUser) {
    this.name = name
    this.email = email
    this.age = age
    this.newUser = newUser
  }
  checkNewUser(name) {
    if (this.newUser) {
      console.log(`You still have an account, ${this.name} please
    login to your account`)
    } else {
      console.log(`Welcome You have created a new account, ${this.name}`)
    }
  }
}
const user0 = new Users('Mitch', 'mitch@web.de', 36, false)
user0.checkNewUser(this.name)

const user1 = new Users('John', 'john@web.de', 17, true)
user1.checkNewUser(this.name)

const user2 = new Users('Peter', 'pete@web.de', 19, false)
user2.checkNewUser(this.name)
