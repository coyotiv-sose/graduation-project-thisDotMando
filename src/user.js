module.exports = class User {
  constructor(name, email, age, newUser) {
    this.name = name
    this.email = email
    this.age = age
    this.newUser = newUser
  }
  checkNewUser = () => {
    if (this.newUser === true) {
      console.log('A new User on MeTube: ' + this.name)
      return (this.newUser = false)
    } else {
      console.log('Welcome back ' + this.name)
    }
  }
}
