const { all } = require('axios')
const app = require('../src/app')
const request = require('supertest')

describe('meTube', () => {
  it('should create a new user', async () => {
    const name = 'mitch'
    const email = 'mitch@web.de'
    const age = 36
    const expectedOutput = {
      name: 'mitch',
      email,
      age,
      channels: [],
      mySubscribtions: [],
      videos: [],
      videoLists: [],
    }
    const actualOutput = await request(app).post('/users').send({ name, email, age })
    expect(actualOutput.body.name).toEqual(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })
  it('should create a new user', async () => {
    const name = 'john'
    const email = 'john@web.de'
    const age = 19
    const expectedOutput = {
      name: 'john',
      email,
      age,
      channels: [],
      mySubscribtions: [],
      videos: [],
      videoLists: [],
    }
    const actualOutput = await request(app).post('/users').send({ name, email, age })
    expect(actualOutput.body.name).toEqual(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })
})

it('should create a new user', async () => {
  const name = 'peter'
  const email = 'peter@web.de'
  const age = 19
  const expectedOutput = {
    name: 'peter',
    email,
    age,
    channels: [],
    mySubscribtions: [],
    videos: [],
    videoLists: [],
  }
  const actualOutput = await request(app).post('/users').send({ name, email, age })
  expect(actualOutput.body.name).toEqual(expectedOutput.name)
  expect(actualOutput.body).toMatchObject(expectedOutput)
})

it('should create a new video', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = {
    title,
    description,
    creator: {
      name,
      email,
      age,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/videos').send({ title, description, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})

it('should create a new videoList', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const expectedOutput = {
    name,
    creator: {
      name,
    },
  }
  const user = await request(app).post('/users').send({ name, email })
  const actualOutput = await request(app).post('/videoLists').send({ name, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
  expect(actualOutput.body.creator.name).toEqual(expectedOutput.creator.name)
  expect(actualOutput.body.creator.name).toEqual(name)
})
it('should add a video to a videoList', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = {
    title,
    description,
    creator: {
      name,
      email,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/videos').send({ title, description, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('should like a video', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = {
    title,
    description,
    creator: {
      name,
      email,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/videos').send({ title, description, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('should dislike a video', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = {
    title,
    description,
    creator: {
      name,
      email,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/videos').send({ title, description, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('create a new channel', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const expectedOutput = {
    name,
    creator: {
      name,
      email,
      age,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/channels').send({ name, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('add subscriber to a channel', async () => {
  const name = 'john'
  const email = 'john@web.de'
  const age = 17
  const expectedOutput = {
    name,
    creator: {
      name,
      email,
      age,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/channels').send({ name, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('unsubscribe from a channel', async () => {
  const name = 'john'
  const email = 'john@web.de'
  const age = 17
  const expectedOutput = {
    name,
    creator: {
      name,
      email,
      age,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/channels').send({ name, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
it('should add a video to a videoList', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = {
    title,
    description,
    creator: {
      name,
      email,
    },
  }
  const user = await request(app).post('/users').send({ name, email, age })
  const actualOutput = await request(app).post('/videos').send({ title, description, user: user.body._id })
  expect(actualOutput.body).toMatchObject(expectedOutput)
})
/* it('should throw an error if a video is already liked', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = { message: 'You already liked this video' }

  const user = await request(app).post('/users').send({ name, email, age })
  const video = await request(app).post('/videos').send({ title, description, user: user.body._id })
  await request(app).post(`/videos/${video.body._id}/likes`).send({ user: user.body._id })
  const actualOutput = await request(app).post(`/videos/${video.body._id}/likes`).send({ user: user.body._id })

  expect(actualOutput.body).toMatchObject(expectedOutput)
}) */

it('should throw an error if a video is already liked', async () => {
  const name = 'mitch'
  const email = 'mitch@web.de'
  const age = 36
  const title = 'ICEage'
  const description = 'animation'
  const expectedOutput = { message: 'You already liked this video' }

  const user = await request(app).post('/users').send({ name, email, age })
  const video = await request(app).post('/videos').send({ title, description, user: user.body._id })
  await request(app).post(`/videos/${video.body._id}/likes`).send({ user: user.body._id })
  const actualOutput = await request(app).post(`/videos/${video.body._id}/likes`).send({ user: user.body._id })

  expect(actualOutput.body).toMatchObject(expectedOutput)
})
